import { expect, test } from "bun:test";
import { nameWords, specEffect } from "./risk";

test("GW §4.1: a write that sends, pays, deletes or publishes is risky; read and risky never change", () => {
    for (const name of ["GMAIL_SEND_EMAIL", "AGENT_MAIL_SEND_EMAIL", "ABLY_PUBLISH_MESSAGE_TO_CHANNEL", "STRIPE_CREATE_REFUND",
        "slack_post_message", "deleteFile", "remove-member", "PAYPAL_PAY_INVOICE", "TRANSFER_FUNDS", "forwardEmail", "TRASH_THREAD"])
        expect(specEffect(name, "write")).toBe("risky");
    for (const name of ["CREATE_EMAIL_DRAFT", "UPDATE_PAYMENT_METHOD_LABEL", "ADD_LABEL", "create_issue", "editMessage"])
        expect(specEffect(name, "write")).toBe("write");
    expect(specEffect("SCRAPECREATORS_GET_TELEGRAM_POST", "write")).toBe("write");
    expect(specEffect("GETANYAPI_BLUESKY_USER_POSTS", "write")).toBe("write");
    expect(specEffect("GET_SEND_STATUS", "read")).toBe("read");
    expect(specEffect("LIST_PAYMENTS", "read")).toBe("read");
    expect(specEffect("GMAIL_DELETE_MESSAGE", "risky")).toBe("risky");
});

test("names split on every convention", () => {
    expect(nameWords("GMAIL_SEND_EMAIL")).toEqual(["gmail", "send", "email"]);
    expect(nameWords("deleteFileNow")).toEqual(["delete", "file", "now"]);
    expect(nameWords("remove-member.v2")).toEqual(["remove", "member", "v2"]);
});
