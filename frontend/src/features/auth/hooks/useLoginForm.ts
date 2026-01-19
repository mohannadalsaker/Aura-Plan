import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  LoginFormSchema,
  type LoginFormFields,
} from "../validation/LoginFormSchema";
import { useLoginApi } from "../api/useLoginApi";
import { setLsValue } from "@/shared/utils";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginApi();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        setLsValue("token", res.data.access_token);
        navigate("/");
      },
    });
  };

  const submitForm = handleSubmit(onSubmit);

  return { register, errors, isPending, submitForm };
};
