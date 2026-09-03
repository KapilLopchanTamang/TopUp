"use client";
import Image from "next/image";
import { useState } from "react";
import type { Game } from "@/lib/types";

type Row = { amountLabel: string; price: string; isHighlighted: boolean; sortOrder: number };
type Group = { label: string; sortOrder: number; rows: Row[] };

export function GameForm({ initial, action }: { initial?: Game; action: (fd: FormData) => Promise<void> }) {
  const [groups, setGroups] = useState<Group[]>(
    initial?.groups?.map((g) => ({
      label: g.label || "",
      sortOrder: g.sortOrder,
      rows: g.rows.map((r) => ({
        amountLabel: r.amountLabel,
        price: r.price,
        isHighlighted: r.isHighlighted,
        sortOrder: r.sortOrder,
      })),
    })) || [{ label: "Default", sortOrder: 0, rows: [{ amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }] }]
  );
  const [imageUrl, setImageUrl] = useState<string>(initial?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

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
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  function addGroup() {
    setGroups([...groups, { label: "", sortOrder: groups.length, rows: [{ amountLabel: "", price: "", isHighlighted: false, sortOrder: 0 }] }]);
  }
  function removeGroup(i: number) {
    setGroups(groups.filter((_, idx) => idx !== i));
  }
  function addRow(gi: number) {
    const c = [...groups];
    c[gi].rows.push({ amountLabel: "", price: "", isHighlighted: false, sortOrder: c[gi].rows.length });
    setGroups(c);
  }
  function removeRow(gi: number, ri: number) {
    const c = [...groups];
    c[gi].rows = c[gi].rows.filter((_, idx) => idx !== ri);
    setGroups(c);
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
          <label className="text-sm font-semibold block mb-2">
            Game Image <span className="text-red-400">*</span>
          </label>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="cursor-pointer block">
              <div className="px-4 py-3 rounded-xl bg-violet-600/15 border-2 border-dashed border-violet-500/30 hover:border-violet-500/50 transition-colors text-center">
                <div className="text-violet-300 font-semibold text-sm">
                  {uploading ? '📤 Uploading...' : '📁 Click to upload image'}
                </div>
                <div className="text-white/40 text-xs mt-1">
                  JPEG, PNG, or WebP (max 5MB)
                </div>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {uploadError && (
              <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                ❌ {uploadError}
              </div>
            )}

            {imageUrl && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/[0.06] border border-white/10 relative shrink-0">
                  <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white/80 mb-1">Current Image</div>
                  <div className="text-xs text-white/50 truncate">{imageUrl}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
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

      <input type="hidden" name="groupsJson" value={JSON.stringify(groups)} />

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
          <div key={gi} className="rounded-2xl bg-[#0E1220] border border-white/[0.06] p-4 space-y-3">
            <div className="flex gap-3 items-center">
              <span className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-300 text-xs font-bold grid place-items-center shrink-0">{gi + 1}</span>
              <input
                value={g.label}
                onChange={(e) => {
                  const c = [...groups];
                  c[gi].label = e.target.value;
                  setGroups(c);
                }}
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
                <div key={ri} className="grid grid-cols-[1fr_110px_80px_32px] gap-2 items-center">
                  <label className="sr-only" htmlFor={`amount-${gi}-${ri}`}>Amount for group {gi + 1}, row {ri + 1}</label>
                  <input
                    id={`amount-${gi}-${ri}`}
                    value={r.amountLabel}
                    onChange={(e) => {
                      const c = [...groups];
                      c[gi].rows[ri].amountLabel = e.target.value;
                      setGroups(c);
                    }}
                    placeholder="115 💎"
                    required
                    className="rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500/60 transition-colors"
                  />
                  <label className="sr-only" htmlFor={`price-${gi}-${ri}`}>Price for group {gi + 1}, row {ri + 1}</label>
                  <input
                    id={`price-${gi}-${ri}`}
                    value={r.price}
                    onChange={(e) => {
                      const c = [...groups];
                      c[gi].rows[ri].price = e.target.value;
                      setGroups(c);
                    }}
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
                      onChange={(e) => {
                        const c = [...groups];
                        c[gi].rows[ri].isHighlighted = e.target.checked;
                        setGroups(c);
                      }}
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
