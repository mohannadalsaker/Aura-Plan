import z from "zod";

export const TaskFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  project_id: z.uuid().min(1),
  users: z.array(z.string()),
});

export type TaskFormFields = z.infer<typeof TaskFormSchema>;
