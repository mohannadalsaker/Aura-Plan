/*
  Warnings:

  - Added the required column `creator_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "creator_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Task_creator_id_idx" ON "public"."Task"("creator_id");

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
