import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("This field is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
