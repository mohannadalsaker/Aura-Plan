-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Permissions" ADD VALUE 'READ_ALL_PROJECTS';
ALTER TYPE "public"."Permissions" ADD VALUE 'READ_ALL_TASKS';
ALTER TYPE "public"."Permissions" ADD VALUE 'RATE_TASK';
ALTER TYPE "public"."Permissions" ADD VALUE 'READ_ALL_USER';
ALTER TYPE "public"."Permissions" ADD VALUE 'READ_ALL_ROLES';
ALTER TYPE "public"."Permissions" ADD VALUE 'READ_ALL_COMMENTS';

-- AlterEnum
ALTER TYPE "public"."ProjectStatus" ADD VALUE 'REVIEW';

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
