import MainButton from "@/shared/components/MainButton";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { Stack, Typography } from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
  const { errors, submitForm, register } = useLoginForm();
  return (
    <form onSubmit={submitForm}>
      <Stack spacing={3}>
        <Typography
          sx={{ typography: "h3", textAlign: "center", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <TextFieldInput
          {...register("email")}
          label="Email"
          fullWidth
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextFieldInput
          {...register("password")}
          label="Password"
          fullWidth
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <MainButton type="submit" variant="contained">
          Submit
        </MainButton>
      </Stack>
    </form>
  );
};

export default LoginForm;
