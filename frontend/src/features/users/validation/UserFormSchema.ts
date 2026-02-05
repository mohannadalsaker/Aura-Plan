import { useDrawerStore } from "@/stores/form/drawer";
import z from "zod";

const errorMsg = "This field is required";
const { openAdd } = useDrawerStore.getState();

export const UserFormSchema = z.object({
  username: z.string().min(1, errorMsg),
  email: z.email(errorMsg).min(1, "Invalid Email"),
  password: openAdd ? z.string(errorMsg) : z.string().optional(),
  role_id: z.uuid(errorMsg),
});

export type UserFormFields = z.infer<typeof UserFormSchema>;
