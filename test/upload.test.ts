import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import {
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
  sanitizeUploadFilename,
  validateImage,
} from "../src/lib/upload";
import { POST } from "../src/app/api/upload/route";

describe("Admin Photo Upload Validation & Security Tests", () => {
  test("defines correct 5MB file size limit", () => {
    assert.equal(MAX_FILE_SIZE, 5 * 1024 * 1024);
  });

  test("allows standard JPEG, PNG, and WebP MIME types", () => {
    const validMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    for (const mime of validMimes) {
      assert.equal(ALLOWED_MIME_TYPES.includes(mime), true, `${mime} should be allowed`);
    }
  });

  test("rejects disallowed MIME types such as SVG, PDF, and Executables", () => {
    const dangerousMimes = [
      "image/svg+xml",
      "application/pdf",
      "application/x-msdownload",
      "text/html",
      "text/javascript",
    ];
    for (const mime of dangerousMimes) {
      assert.equal(ALLOWED_MIME_TYPES.includes(mime), false, `${mime} should be disallowed`);
    }
  });

  test("allows safe image extensions", () => {
    const validExts = [".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of validExts) {
      assert.equal(ALLOWED_EXTENSIONS.includes(ext), true, `${ext} should be allowed`);
    }
  });

  test("rejects executable or script extensions", () => {
    const badExts = [".exe", ".sh", ".php", ".js", ".html", ".svg"];
    for (const ext of badExts) {
      assert.equal(ALLOWED_EXTENSIONS.includes(ext), false, `${ext} should be disallowed`);
    }
  });

  describe("sanitizeUploadFilename", () => {
    test("neutralizes directory traversal attempts", () => {
      const traversalInput = "../../../../../etc/passwd.png";
      const sanitized = sanitizeUploadFilename(traversalInput, "image/png");

      assert.equal(sanitized.includes(".."), false, "Filename must not contain '..'");
      assert.equal(sanitized.includes("/"), false, "Filename must not contain '/'");
      assert.equal(sanitized.includes("\\"), false, "Filename must not contain '\\'");
      assert.equal(sanitized.endsWith(".png"), true, "Filename should preserve valid .png extension");
    });

    test("removes dangerous special characters and spaces", () => {
      const noisyInput = "My Cool Game Photo (2026) #1!.jpeg";
      const sanitized = sanitizeUploadFilename(noisyInput, "image/jpeg");

      assert.equal(sanitized.includes(" "), false, "Filename must not contain spaces");
      assert.equal(sanitized.includes("!"), false, "Filename must not contain '!'");
      assert.equal(sanitized.includes("#"), false, "Filename must not contain '#'");
      assert.equal(sanitized.endsWith(".jpeg"), true, "Filename should preserve .jpeg extension");
    });

    test("falls back to MIME extension when file has no extension", () => {
      const noExtInput = "game-cover-art";
      const sanitized = sanitizeUploadFilename(noExtInput, "image/webp");

      assert.equal(sanitized.endsWith(".webp"), true, "Filename should fallback to .webp extension");
    });

    test("ensures uniqueness across multiple uploads of the same filename", () => {
      const filename = "free-fire.png";
      const sanitized1 = sanitizeUploadFilename(filename, "image/png");
      const sanitized2 = sanitizeUploadFilename(filename, "image/png");

      assert.notEqual(sanitized1, sanitized2, "Each upload must generate a unique filename");
    });

    test("handles uppercase extensions properly", () => {
      const filename = "AVATAR_IMAGE.PNG";
      const sanitized = sanitizeUploadFilename(filename, "image/png");
      assert.equal(sanitized.endsWith(".png"), true, "Should normalize to lowercase .png");
    });

    test("truncates extremely long filenames safely", () => {
      const longName = "a".repeat(100) + ".jpg";
      const sanitized = sanitizeUploadFilename(longName, "image/jpeg");
      assert.ok(sanitized.length < 80, "Sanitized filename should be kept to a safe length");
      assert.equal(sanitized.endsWith(".jpg"), true);
    });
  });

  describe("validateImage", () => {
    test("approves valid image files under 5MB", () => {
      const result = validateImage({ size: 1024 * 500, type: "image/jpeg", name: "cover.jpg" });
      assert.equal(result.valid, true);
    });

    test("rejects empty files (0 bytes)", () => {
      const result = validateImage({ size: 0, type: "image/png", name: "empty.png" });
      assert.equal(result.valid, false);
      assert.match(result.error || "", /empty/i);
    });

    test("rejects files exceeding 5MB limit", () => {
      const result = validateImage({ size: 6 * 1024 * 1024, type: "image/png", name: "giant.png" });
      assert.equal(result.valid, false);
      assert.match(result.error || "", /too large/i);
    });

    test("rejects invalid extensions like .exe or .pdf", () => {
      const result = validateImage({ size: 1000, type: "application/pdf", name: "document.pdf" });
      assert.equal(result.valid, false);
      assert.match(result.error || "", /invalid file type/i);
    });
  });

  describe("POST /api/upload route handler authentication", () => {
    test("rejects unauthenticated upload requests with 401 Unauthorized", async () => {
      const req = new NextRequest("http://localhost:3000/api/upload", {
        method: "POST",
      });

      const response = await POST(req);
      assert.equal(response.status, 401);

      const json = await response.json();
      assert.equal(json.error, "Unauthorized");
    });
  });

  describe("GET /api/images/[id] route handler", () => {
    test("returns 404 for nonexistent image id", async () => {
      const { GET } = await import("../src/app/api/images/[id]/route");
      const req = new NextRequest("http://localhost:3000/api/images/nonexistent-id-12345");
      const response = await GET(req, {
        params: Promise.resolve({ id: "nonexistent-id-12345" }),
      });
      assert.equal(response.status, 404);
    });

    test("HEAD returns 404 for nonexistent image id", async () => {
      const { HEAD } = await import("../src/app/api/images/[id]/route");
      const req = new NextRequest("http://localhost:3000/api/images/nonexistent-id-12345", {
        method: "HEAD",
      });
      const response = await HEAD(req, {
        params: Promise.resolve({ id: "nonexistent-id-12345" }),
      });
      assert.equal(response.status, 404);
    });
  });
});

