"use client";
import {
  FormLabel,
  Stack,
  TextField,
  type SxProps,
  type TextFieldProps,
} from "@mui/material";
import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

type OmittedProps =
  | "variant"
  | "placeholder"
  | "value"
  | "onChange"
  | "sx"
  | "type"
  | "error"
  | "required";

interface TextFieldInputProps extends Omit<TextFieldProps, OmittedProps> {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  register?: UseFormRegisterReturn<string>;
  error?: boolean;
  type?: "text" | "number" | "date" | "password" | "email";
  isRequired?: boolean;
  height?: string;
  label?: string;
}

export const TextFieldInput = (props: TextFieldInputProps) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    sx,
    register,
    error,
    type = "text",
    isRequired = false,
    height = "52px",
    ...rest
  } = props;
  return (
    <Stack gap={1} sx={{ width: "100%" }}>
      {label && (
        <FormLabel
          sx={{
            typography: "subtitle1",
            fontWeight: 500,
            color: "text.primary",
            m: "0",
            p: "0",
          }}
          required={isRequired}
        >
          {label}
        </FormLabel>
      )}
      <TextField
        placeholder={placeholder}
        value={value}
        error={error}
        type={type}
        sx={{
          width: "100%",
          ".MuiInputBase-root": {
            typography: "subtitle1",
            height,
          },
          ...sx,
        }}
        {...(register ? register : {})}
        {...(onChange ? { onChange } : {})}
        {...rest}
      />
    </Stack>
  );
};
