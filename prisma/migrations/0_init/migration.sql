-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Words" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "wordSetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsSets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WordsSets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationTokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToWordsSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Accounts_userId_idx" ON "Accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_provider_providerAccountId_key" ON "Accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sessionToken_key" ON "Sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "Sessions_userId_idx" ON "Sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_stripe_customer_id_key" ON "Users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_stripe_subscription_id_key" ON "Users"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokens_token_key" ON "VerificationTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokens_identifier_token_key" ON "VerificationTokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToWordsSet_AB_unique" ON "_LanguageToWordsSet"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToWordsSet_B_index" ON "_LanguageToWordsSet"("B");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_wordSetId_fkey" FOREIGN KEY ("wordSetId") REFERENCES "WordsSets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsSets" ADD CONSTRAINT "WordsSets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToWordsSet" ADD CONSTRAINT "_LanguageToWordsSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToWordsSet" ADD CONSTRAINT "_LanguageToWordsSet_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsSets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

