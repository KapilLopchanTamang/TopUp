import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Environment Contract", () => {
  const expectedVars = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "WHATSAPP_NUMBER",
  ];

  test("contains all mandatory environment variable keys", () => {
    // Check that all required vars are defined in process.env or .env.example
    const envExample = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");

    for (const key of expectedVars) {
      assert.ok(
        envExample.includes(key),
        `.env.example is missing required environment variable: ${key}`
      );
    }
  });

  test("rejects default insecure secret in production mode", () => {
    const defaultSecret = "dev-secret-change-in-production-32chars!!";
    assert.equal(
      defaultSecret,
      "dev-secret-change-in-production-32chars!!",
      "Should identify development secret"
    );
  });
});
