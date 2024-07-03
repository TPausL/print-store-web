/*
  Warnings:

  - A unique constraint covering the columns `[hex]` on the table `colors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "display_hex" VARCHAR(9) NOT NULL DEFAULT '#00000000';

-- CreateIndex
CREATE UNIQUE INDEX "colors_hex_key" ON "colors"("hex");
