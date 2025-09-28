import z from "zod";

const errorMsg = "This field is required";

export const UserFormSchema = z.object({
  username: z.string().min(1, errorMsg),
  email: z.email("Invalid email").min(1, errorMsg),
  password: z.string().optional(),
  role_id: z.uuid().min(1),
});

export type UserFormFields = z.infer<typeof UserFormSchema>;
