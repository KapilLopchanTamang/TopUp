import { createGame } from "@/lib/actions";
import { GameForm } from "@/components/GameForm";

export default function NewGamePage() {
  return (
    <div>
      <h1 className="text-xl font-black">Add Game</h1>
      <p className="text-sm text-white/60">Create a new game and its packages.</p>
      <div className="mt-6">
        <GameForm action={createGame} />
      </div>
    </div>
  );
}
