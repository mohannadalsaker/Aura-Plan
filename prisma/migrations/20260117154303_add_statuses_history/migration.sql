-- CreateTable
CREATE TABLE "public"."TaskStatusHistory" (
    "id" UUID NOT NULL,
    "task_id" UUID NOT NULL,
    "old_status" "public"."TaskStatus" NOT NULL,
    "new_status" "public"."TaskStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectStatusHistory" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "old_status" "public"."ProjectStatus" NOT NULL,
    "new_status" "public"."ProjectStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskStatusHistory_task_id_idx" ON "public"."TaskStatusHistory"("task_id");

-- CreateIndex
CREATE INDEX "TaskStatusHistory_changed_at_idx" ON "public"."TaskStatusHistory"("changed_at");

-- CreateIndex
CREATE INDEX "TaskStatusHistory_new_status_idx" ON "public"."TaskStatusHistory"("new_status");

-- AddForeignKey
ALTER TABLE "public"."TaskStatusHistory" ADD CONSTRAINT "TaskStatusHistory_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectStatusHistory" ADD CONSTRAINT "ProjectStatusHistory_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
