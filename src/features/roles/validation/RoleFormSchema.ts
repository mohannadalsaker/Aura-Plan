import z from "zod";

export const RoleFormSchema = z.object({
  name: z.string().min(1, "This field is required"),
  permissions: z.array(z.string()),
});

export type RoleFormFields = z.infer<typeof RoleFormSchema>;
