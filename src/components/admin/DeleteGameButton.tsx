"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteGame } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteGameButtonProps {
  id: string;
  name: string;
  redirectTo?: string;
  className?: string;
}

export function DeleteGameButton({ id, name, redirectTo, className }: DeleteGameButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis will permanently delete the game and all associated package groups and pricing rows.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteGame(id);
        if (redirectTo) {
          router.push(redirectTo);
        }
        router.refresh();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete game";
        alert(`Error: ${msg}`);
      }
    });
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className={
        className ||
        "h-8 px-2.5 text-xs font-medium bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 hover:text-rose-200 border border-rose-500/20 disabled:opacity-50"
      }
    >
      {isPending ? (
        <>
          <Loader2 className="mr-1 size-3.5 animate-spin text-rose-400" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="mr-1 size-3.5 text-rose-400" />
          Delete
        </>
      )}
    </Button>
  );
}
