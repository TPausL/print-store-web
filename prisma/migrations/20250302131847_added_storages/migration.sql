/*
  Warnings:

  - You are about to drop the column `count` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "count",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "storages" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_in_storages" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "storage_id" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "is" INTEGER NOT NULL DEFAULT 0,
    "should" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "products_in_storages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_in_storages_product_id_storage_id_key" ON "products_in_storages"("product_id", "storage_id");

-- AddForeignKey
ALTER TABLE "products_in_storages" ADD CONSTRAINT "products_in_storages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_in_storages" ADD CONSTRAINT "products_in_storages_storage_id_fkey" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
