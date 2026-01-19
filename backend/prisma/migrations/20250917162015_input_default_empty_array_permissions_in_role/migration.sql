-- AlterTable
ALTER TABLE "public"."Role" ALTER COLUMN "permissions" SET DEFAULT ARRAY[]::"public"."Permissions"[];
