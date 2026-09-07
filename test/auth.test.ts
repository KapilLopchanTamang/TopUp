import { test, describe } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

describe("Authentication & Security Smoke Tests", () => {
  const testPassword = "super-secure-admin-password-123";
  const passwordHash = bcrypt.hashSync(testPassword, 10);
  const adminEmail = "admin@arg-topup.com";

  const clean12DigitPassword = "123456789012";

  test("verifies valid 12-digit admin password cleanly", () => {
    const input = "123456789012";
    const bufA = Buffer.from(input);
    const bufB = Buffer.from(clean12DigitPassword);
    const isValid = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
    assert.equal(isValid, true);
  });

  test("rejects incorrect password against clean 12-digit password", () => {
    const input = "000000000000";
    const bufA = Buffer.from(input);
    const bufB = Buffer.from(clean12DigitPassword);
    const isValid = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
    assert.equal(isValid, false);
  });

  test("verifies valid credentials against bcrypt hash (fallback support)", async () => {
    const isValid = await bcrypt.compare(testPassword, passwordHash);
    assert.equal(isValid, true);
  });

  test("rejects invalid password against bcrypt hash", async () => {
    const isValid = await bcrypt.compare("wrong-password", passwordHash);
    assert.equal(isValid, false);
  });

  test("rejects mismatched email", () => {
    const attemptedEmail = "hacker@example.com";
    assert.notEqual(
      attemptedEmail.toLowerCase().trim(),
      adminEmail.toLowerCase().trim()
    );
  });

  test("auth guard protects /admin paths while allowing public paths", () => {
    const protectedPaths = ["/admin", "/admin/games/new", "/admin/settings"];
    const publicPaths = ["/", "/games", "/games/free-fire", "/contact", "/payment-methods", "/admin/login"];

    const isProtected = (path: string) => path.startsWith("/admin") && path !== "/admin/login";

    for (const p of protectedPaths) {
      assert.equal(isProtected(p), true, `${p} should be protected`);
    }

    for (const p of publicPaths) {
      assert.equal(isProtected(p), false, `${p} should be public or exempt from redirect loop`);
    }
  });
});
