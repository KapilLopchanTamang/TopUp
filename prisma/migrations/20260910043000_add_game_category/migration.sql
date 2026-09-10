-- AlterTable
ALTER TABLE "Game" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Gaming Top-ups';

-- CreateIndex
CREATE INDEX "Game_category_idx" ON "Game"("category");
