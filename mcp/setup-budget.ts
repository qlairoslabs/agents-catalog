// Request-scoped setup budget. Established MCP streams and capability jobs do
// not enter this context. Refresh work explicitly owns a separate context.
import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export class SetupDeadlineError extends Error {
    constructor() {
        super("The connection setup timed out. Check connection status before starting sign-in again.");
        this.name = "SetupDeadlineError";
    }
}

type Budget = { end: number; signal: AbortSignal; phase: string; id: string };
const current = new AsyncLocalStorage<Budget>();

export function setupOperationId(): string | undefined { return current.getStore()?.id; }

export function hasSetupBudget(): boolean { return current.getStore() !== undefined; }

export function setupCheckpoint(): void {
    const budget = current.getStore();
    if (budget && (performance.now() >= budget.end || budget.signal.aborted)) throw new SetupDeadlineError();
}

export function setupSignal(maxMs: number, parent?: AbortSignal | null): AbortSignal {
    setupCheckpoint();
    const budget = current.getStore();
    const remaining = Math.max(1, Math.ceil(Math.min(maxMs, budget ? budget.end - performance.now() : maxMs)));
    return AbortSignal.any([
        AbortSignal.timeout(remaining),
        ...(budget ? [budget.signal] : []),
        ...(parent ? [parent] : []),
    ]);
}

export async function setupStage<T>(phase: string, work: () => Promise<T>, maxMs = 35_000): Promise<T> {
    setupCheckpoint();
    const budget = current.getStore();
    if (budget) budget.phase = phase;
    const signal = setupSignal(maxMs);
    let rejectAbort!: () => void;
    const aborted = new Promise<never>((_, reject) => {
        rejectAbort = () => reject(new SetupDeadlineError());
        signal.addEventListener("abort", rejectAbort, { once: true });
        if (signal.aborted) rejectAbort();
    });
    try {
        const result = await Promise.race([
            Promise.resolve().then(() => { setupCheckpoint(); return work(); }), aborted,
        ]);
        setupCheckpoint();
        return result;
    } finally {
        signal.removeEventListener("abort", rejectAbort);
    }
}

export async function withSetupBudget<T>(
    work: () => Promise<T>, parent?: AbortSignal, ms = 35_000, parentId?: string | null,
): Promise<T> {
    if (current.getStore()) return work();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    const budget: Budget = {
        end: performance.now() + ms,
        signal: AbortSignal.any([controller.signal, ...(parent ? [parent] : [])]),
        phase: "start", id: randomUUID(),
    };
    const started = performance.now();
    try {
        return await current.run(budget, () => setupStage("start", work, ms));
    } catch (error) {
        console.warn(JSON.stringify({
            event: "hub_connection_setup_failed", requestId: budget.id,
            ...(parentId && /^[0-9a-f-]{36}$/.test(parentId) ? { parentOperationId: parentId } : {}),
            phase: budget.phase, durationMs: Math.round(performance.now() - started),
            outcome: error instanceof SetupDeadlineError ? "deadline" : "failed",
        }));
        throw error;
    } finally {
        clearTimeout(timer);
        controller.abort();
    }
}

/** A caller disconnect must not cancel a rotating refresh shared by others. */
export function independentRefresh<T>(work: () => Promise<T>): Promise<T> {
    return current.exit(() => withSetupBudget(work));
}
