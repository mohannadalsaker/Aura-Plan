/*
  Warnings:

  - The values [READ_ALL_USER] on the enum `Permissions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Permissions_new" AS ENUM ('CREATE_PROJECT', 'READ_ALL_PROJECTS', 'READ_PROJECT', 'UPDATE_PROJECT', 'DELETE_PROJECT', 'CHANGE_PROJECT_STATUS', 'CREATE_TASK', 'READ_ALL_TASKS', 'READ_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'RATE_TASK', 'CHANGE_TASK_STATUS', 'CREATE_USER', 'READ_ALL_USERS', 'READ_USER', 'UPDATE_USER', 'DELETE_USER', 'CREATE_ROLE', 'READ_ALL_ROLES', 'READ_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE', 'CREATE_COMMENT', 'READ_ALL_COMMENTS', 'READ_COMMENT', 'UPDATE_COMMENT', 'DELETE_COMMENT');
ALTER TABLE "public"."Role" ALTER COLUMN "permissions" DROP DEFAULT;
ALTER TABLE "public"."Role" ALTER COLUMN "permissions" TYPE "public"."Permissions_new"[] USING ("permissions"::text::"public"."Permissions_new"[]);
ALTER TYPE "public"."Permissions" RENAME TO "Permissions_old";
ALTER TYPE "public"."Permissions_new" RENAME TO "Permissions";
DROP TYPE "public"."Permissions_old";
ALTER TABLE "public"."Role" ALTER COLUMN "permissions" SET DEFAULT ARRAY[]::"public"."Permissions"[];
COMMIT;
