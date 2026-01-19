import z from "zod";
import { ProjectStatus } from "../types";

export const ProjectFormSchema = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  status: z.enum(ProjectStatus),
  manager_id: z.uuid().min(1),
  members: z.array(z.string()),
});

export type ProjectFormFields = z.infer<typeof ProjectFormSchema>;
