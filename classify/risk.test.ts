import { expect, test } from "bun:test";
import { nameWords, specEffect } from "./risk";

test("GW §4.1: a write that sends, pays, deletes or publishes is risky; read and risky never change", () => {
    for (const name of ["GMAIL_SEND_EMAIL", "AGENT_MAIL_SEND_EMAIL", "ABLY_PUBLISH_MESSAGE_TO_CHANNEL", "STRIPE_CREATE_REFUND",
        "deleteFile", "remove-member", "PAYPAL_PAY_INVOICE", "TRANSFER_FUNDS", "forwardEmail", "TRASH_THREAD"])
        expect(specEffect(name, "write")).toBe("risky");
    for (const name of ["CREATE_EMAIL_DRAFT", "UPDATE_PAYMENT_METHOD_LABEL", "ADD_LABEL", "create_issue", "editMessage"])
        expect(specEffect(name, "write")).toBe("write");
    expect(specEffect("SCRAPECREATORS_GET_TELEGRAM_POST", "write")).toBe("write");
    expect(specEffect("GETANYAPI_BLUESKY_USER_POSTS", "write")).toBe("write");
    expect(specEffect("GET_SEND_STATUS", "read")).toBe("read");
    expect(specEffect("LIST_PAYMENTS", "read")).toBe("read");
    expect(specEffect("GMAIL_DELETE_MESSAGE", "risky")).toBe("risky");
});

test("toolkit slugs never count, and noun-like verbs count only as the action's first word", () => {
    expect(specEffect("SEND_PULSE_CRM_UPDATE_CONTACT_EMAIL", "write", "send_pulse")).toBe("write");
    expect(specEffect("SEND_PULSE_SEND_EMAIL", "write", "send_pulse")).toBe("risky");
    expect(specEffect("MONEY_FORWARD_CREATE_TRANSACTIONS", "write", "money_forward")).toBe("write");
    expect(specEffect("DROP_TO_CDN_UPLOAD_FILE", "write", "drop_to_cdn")).toBe("write");
    expect(specEffect("APIFY_SCHEDULES_POST", "write", "apify")).toBe("write");
    expect(specEffect("BIGCOMMERCE_ADD_CHECKOUT_COUPON", "write", "bigcommerce")).toBe("write");
    expect(specEffect("BEXIO_UPDATE_PURCHASE_ORDER", "write", "bexio")).toBe("write");
    expect(specEffect("LARK_DOCS_SET_DROP_DOWN", "write", "lark_docs")).toBe("write");
    expect(specEffect("GEOAPIFY_CREATE_BATCH_FORWARD_GEOCODE_JOB", "write", "geoapify")).toBe("write");
    expect(specEffect("REDDIT_POST_COMMENT", "write", "reddit")).toBe("risky");
    expect(specEffect("STRIPE_CREATE_REFUND", "write", "stripe")).toBe("risky");
    expect(specEffect("GMAIL_SEND_EMAIL", "write", "gmail")).toBe("risky");
    expect(specEffect("slack_post_message", "write")).toBe("write");
    expect(specEffect("post_message", "write")).toBe("risky");
});

test("names split on every convention", () => {
    expect(nameWords("GMAIL_SEND_EMAIL")).toEqual(["gmail", "send", "email"]);
    expect(nameWords("deleteFileNow")).toEqual(["delete", "file", "now"]);
    expect(nameWords("remove-member.v2")).toEqual(["remove", "member", "v2"]);
});
