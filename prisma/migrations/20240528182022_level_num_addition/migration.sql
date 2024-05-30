/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelNum` to the `levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "levels" ADD COLUMN     "levelNum" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
