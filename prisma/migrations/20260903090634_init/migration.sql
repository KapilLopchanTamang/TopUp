-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageGroup" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "label" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PackageGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageRow" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "amountLabel" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PackageRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "whatsappNumber" TEXT NOT NULL DEFAULT '9779863912884',
    "facebookUrl" TEXT,
    "messengerUrl" TEXT,
    "paymentMethodsText" TEXT,
    "promoBannerText" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_isActive_sortOrder_idx" ON "Game"("isActive", "sortOrder");

-- AddForeignKey
ALTER TABLE "PackageGroup" ADD CONSTRAINT "PackageGroup_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageRow" ADD CONSTRAINT "PackageRow_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PackageGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
