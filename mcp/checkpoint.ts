import { Database } from "bun:sqlite";

export class Checkpoint {
    readonly db: Database;

    constructor(path: string, private readonly now = Date.now) {
        this.db = new Database(path);
        this.db.exec("PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS captured(key TEXT PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS signals(key TEXT PRIMARY KEY, value TEXT NOT NULL, observed INTEGER NOT NULL)");
    }

    read<T>(key: string): T | undefined {
        const row = this.db.query<{ value: string }, [string]>("SELECT value FROM captured WHERE key = ?").get(key);
        return row ? JSON.parse(row.value) : undefined;
    }

    async remember<T>(key: string, load: () => Promise<T>): Promise<T> {
        const saved = this.read<T>(key);
        if (saved !== undefined) return saved;
        const value = await load();
        this.db.run("INSERT OR REPLACE INTO captured VALUES (?, ?)", [key, JSON.stringify(value)]);
        return value;
    }

    get<T>(key: string, maxAge: number): T | undefined {
        const row = this.db.query<{ value: string; observed: number }, [string]>("SELECT value, observed FROM signals WHERE key = ?").get(key);
        return row && this.now() - row.observed < maxAge ? JSON.parse(row.value) : undefined;
    }

    put(key: string, value: unknown): void {
        this.db.run("INSERT OR REPLACE INTO signals VALUES (?, ?, ?)", [key, JSON.stringify(value), this.now()]);
    }

    close(): void { this.db.close(); }
}
