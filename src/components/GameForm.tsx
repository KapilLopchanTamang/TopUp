"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import type { Game } from "@/lib/types";

type Row = { _key: string; amountLabel: string; price: string; isHighlighted: boolean; sortOrder: number };
type Group = { _key: string; label: string; sortOrder: number; rows: Row[] };

function genKey(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

const PRESET_IMAGES = [
  { label: "Free Fire", url: "/images/games/free-fire.jpeg" },
  { label: "PUBG Mobile", url: "/images/games/pubg-mobile.jpg" },
  { label: "eFootball", url: "/images/games/efootball.jpeg" },
  { label: "TikTok", url: "/images/games/tiktok.jpeg" },
  { label: "Netflix", url: "/images/games/netflix.png" },
];

import {
  ALLOWED_MIME_TYPES as ALLOWED_MIME,
  ALLOWED_EXTENSIONS as ALLOWED_EXT,
  MAX_FILE_SIZE as MAX_SIZE,
} from "@/lib/upload";

export function GameForm({ initial, action }: { initial?: Game; action: (fd: FormData) => Promise<void> }) {
  const [groups, setGroups] = useState<Group[]>(() => {
    if (initial?.groups && initial.groups.length > 0) {
      return initial.groups.map((g) => ({
        _key: g.id || genKey(),
        label: g.label || "",
        sortOrder: g.sortOrder,
        rows: g.rows.map((r) => ({
          _key: r.id || genKey(),
          amountLabel: r.amountLabel,
          price: r.price,
          isHighlighted: r.isHighlighted,
          sortOrder: r.sortOrder,
        })),
      }));
    }
    return [
      {
        _key: genKey(),
        label: "Default",
        sortOrder: 0,
        rows: [{ _key: genKey(), amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }],
      },
    ];
  });
  const [imageUrl, setImageUrl] = useState<string>(initial?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    setUploadError("");
    setUploadSuccess("");
    setImgLoadError(false);

    // Client-side validation
    if (file.size > MAX_SIZE) {
      setUploadError("File is too large. Maximum size is 5MB.");
      return;
    }

    const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : '';
    const cleanType = (file.type || '').toLowerCase().split(';')[0].trim();

    if (!ALLOWED_MIME.includes(cleanType) && !ALLOWED_EXT.includes(ext)) {
      setUploadError("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setImageUrl(data.imageUrl);
      setUploadSuccess("Photo uploaded successfully!");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      processFile(file);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function addGroup() {
    setGroups((prev) => [
      ...prev,
      {
        _key: genKey(),
        label: "",
        sortOrder: prev.length,
        rows: [{ _key: genKey(), amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }],
      },
    ]);
  }

  function removeGroup(gi: number) {
    if (groups.length <= 1) {
      setGroups([
        {
          _key: genKey(),
          label: "",
          sortOrder: 0,
          rows: [{ _key: genKey(), amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }],
        },
      ]);
      return;
    }
    setGroups((prev) => prev.filter((_, idx) => idx !== gi));
  }

  function addRow(gi: number) {
    setGroups((prev) =>
      prev.map((g, idx) => {
        if (idx !== gi) return g;
        return {
          ...g,
          rows: [
            ...g.rows,
            { _key: genKey(), amountLabel: "", price: "", isHighlighted: false, sortOrder: g.rows.length },
          ],
        };
      })
    );
  }

  function removeRow(gi: number, ri: number) {
    setGroups((prev) =>
      prev.map((g, gIdx) => {
        if (gIdx !== gi) return g;
        const newRows = g.rows.filter((_, rIdx) => rIdx !== ri);
        return {
          ...g,
          rows:
            newRows.length > 0
              ? newRows
              : [{ _key: genKey(), amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }],
        };
      })
    );
  }

  function updateGroupLabel(gi: number, label: string) {
    setGroups((prev) =>
      prev.map((g, idx) => (idx === gi ? { ...g, label } : g))
    );
  }

  function updateRowAmount(gi: number, ri: number, amountLabel: string) {
    setGroups((prev) =>
      prev.map((g, gIdx) => {
        if (gIdx !== gi) return g;
        return {
          ...g,
          rows: g.rows.map((r, rIdx) => (rIdx === ri ? { ...r, amountLabel } : r)),
        };
      })
    );
  }

  function updateRowPrice(gi: number, ri: number, price: string) {
    setGroups((prev) =>
      prev.map((g, gIdx) => {
        if (gIdx !== gi) return g;
        return {
          ...g,
          rows: g.rows.map((r, rIdx) => (rIdx === ri ? { ...r, price } : r)),
        };
      })
    );
  }

  function updateRowHighlight(gi: number, ri: number, isHighlighted: boolean) {
    setGroups((prev) =>
      prev.map((g, gIdx) => {
        if (gIdx !== gi) return g;
        return {
          ...g,
          rows: g.rows.map((r, rIdx) => (rIdx === ri ? { ...r, isHighlighted } : r)),
        };
      })
    );
  }

  const fieldCls = "mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-violet-500/60 focus:bg-white/[0.08] transition-colors placeholder:text-white/30";

  return (
    <form action={action} className="space-y-6">
      {/* Basic info */}
      <div className="rounded-2xl bg-[#0E1220] border border-white/[0.06] p-5 space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase">Game Info</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold">
            Name <span className="text-red-400">*</span>
            <input name="name" defaultValue={initial?.name || ""} required placeholder="Free Fire" className={fieldCls} />
          </label>
          <label className="text-sm font-semibold">
            Slug <span className="text-red-400">*</span>
            <input
              name="slug"
              defaultValue={initial?.slug || ""}
              required
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens allowed"
              placeholder="free-fire"
              className={fieldCls}
            />
            <p className="text-xs text-white/40 mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
          </label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Game Image
              <span className="text-white/40 text-xs font-normal ml-2">(Upload photo or provide path)</span>
            </label>
          </div>

          <div className="space-y-3">
            {/* Quick preset selector */}
            <div>
              <div className="text-xs text-white/50 mb-1.5 font-medium">Quick Presets:</div>
              <div className="flex flex-wrap gap-2">
                {PRESET_IMAGES.map((p) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => {
                      setImageUrl(p.url);
                      setUploadError("");
                      setUploadSuccess(`Selected ${p.label}`);
                      setImgLoadError(false);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      imageUrl === p.url
                        ? "bg-violet-600/30 border-violet-500 text-violet-200 font-semibold"
                        : "bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct URL input option */}
            <div>
              <label className="text-xs text-white/60 mb-1 block">Image Path or URL</label>
              <input
                type="text"
                placeholder="/images/games/free-fire.jpeg or https://..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImgLoadError(false);
                  setUploadSuccess("");
                }}
                className={fieldCls}
              />
            </div>

            {/* File Upload with Drag & Drop */}
            <div className="text-xs text-white/40 text-center uppercase tracking-wider my-1">or upload photo</div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-4 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer select-none ${
                isDragging
                  ? "bg-violet-600/25 border-violet-400 ring-2 ring-violet-400/40"
                  : "bg-violet-600/10 border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-600/15"
              }`}
            >
              <div className="text-violet-300 font-semibold text-sm">
                {uploading ? '📤 Uploading photo...' : isDragging ? '📥 Drop photo here' : '📁 Click or drop photo here to upload'}
              </div>
              <div className="text-white/40 text-xs mt-1">
                JPEG, PNG, or WebP (max 5MB)
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </div>

            {uploadError && (
              <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <span>❌</span>
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <span>✓</span>
                <span>{uploadSuccess}</span>
              </div>
            )}

            {imageUrl && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/[0.06] border border-white/10 relative shrink-0 grid place-items-center">
                  {!imgLoadError ? (
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                      onError={() => setImgLoadError(true)}
                    />
                  ) : (
                    <span className="text-[10px] text-red-400 text-center px-1">Failed to load</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white/80 mb-1">Current Image</div>
                  <div className="text-xs text-white/50 truncate font-mono">{imageUrl}</div>
                  {imgLoadError && (
                    <div className="text-[11px] text-amber-400 mt-1">
                      ⚠️ Could not preview image at this URL. Please verify the URL or upload a new photo.
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl('');
                    setUploadSuccess("");
                    setUploadError("");
                    setImgLoadError(false);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 border border-red-500/20 hover:bg-red-500/25 transition-colors shrink-0"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold">
            Sort Order
            <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={fieldCls} />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold mt-5 cursor-pointer select-none">
            <input type="checkbox" name="isActive" defaultChecked={initial?.isActive ?? true} className="w-4 h-4 rounded accent-violet-500" />
            Active (visible on storefront)
          </label>
        </div>
      </div>

      <input
        type="hidden"
        name="groupsJson"
        value={JSON.stringify(
          groups.map((g, gi) => ({
            label: g.label || null,
            sortOrder: gi,
            rows: g.rows.map((r, ri) => ({
              amountLabel: r.amountLabel,
              price: r.price,
              isHighlighted: !!r.isHighlighted,
              sortOrder: ri,
            })),
          }))
        )}
      />

      {/* Package groups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Package Groups</h3>
            <p className="text-xs text-white/50 mt-0.5">Each group is a table on the game page (e.g. &quot;Diamonds&quot;, &quot;Small Pack&quot;)</p>
          </div>
          <button
            type="button"
            onClick={addGroup}
            className="text-xs font-bold px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
          >
            + Add Group
          </button>
        </div>

        {groups.map((g, gi) => (
          <div key={g._key} className="rounded-2xl bg-[#0E1220] border border-white/[0.06] p-4 space-y-3">
            <div className="flex gap-3 items-center">
              <span className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-300 text-xs font-bold grid place-items-center shrink-0">{gi + 1}</span>
              <input
                value={g.label}
                onChange={(e) => updateGroupLabel(gi, e.target.value)}
                placeholder="Group label (e.g. Diamonds)"
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => removeGroup(gi)}
                className="text-xs px-3 py-2 rounded-xl bg-red-500/15 text-red-300 border border-red-500/20 hover:bg-red-500/25 transition-colors"
              >
                Remove
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_110px_80px_32px] gap-2 px-1">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Amount</span>
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Price (NPR)</span>
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase hidden sm:block">Best</span>
                <span />
              </div>
              {g.rows.map((r, ri) => (
                <div key={r._key} className="grid grid-cols-[1fr_110px_80px_32px] gap-2 items-center">
                  <label className="sr-only" htmlFor={`amount-${gi}-${ri}`}>Amount for group {gi + 1}, row {ri + 1}</label>
                  <input
                    id={`amount-${gi}-${ri}`}
                    value={r.amountLabel}
                    onChange={(e) => updateRowAmount(gi, ri, e.target.value)}
                    placeholder="115 💎"
                    required
                    className="rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500/60 transition-colors"
                  />
                  <label className="sr-only" htmlFor={`price-${gi}-${ri}`}>Price for group {gi + 1}, row {ri + 1}</label>
                  <input
                    id={`price-${gi}-${ri}`}
                    value={r.price}
                    onChange={(e) => updateRowPrice(gi, ri, e.target.value)}
                    placeholder="380"
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    className="rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500/60 transition-colors"
                  />
                  <label className="flex items-center justify-center gap-1 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={r.isHighlighted}
                      onChange={(e) => updateRowHighlight(gi, ri, e.target.checked)}
                      className="w-3.5 h-3.5 accent-violet-500"
                      aria-label={`Mark as best deal for group ${gi + 1}, row ${ri + 1}`}
                    />
                    <span className="text-white/60 text-[11px]">Best</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeRow(gi, ri)}
                    className="w-8 h-8 rounded-xl bg-white/[0.06] text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm grid place-items-center"
                    aria-label={`Remove row ${ri + 1} from group ${gi + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(gi)}
                className="text-xs font-semibold px-3 py-2 rounded-full bg-violet-600/15 text-violet-300 border border-violet-500/20 hover:bg-violet-600/25 transition-colors"
              >
                + Add Row
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-extrabold py-3.5 hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading Image...' : 'Save Game'}
      </button>
    </form>
  );
}
