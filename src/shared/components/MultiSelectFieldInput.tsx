import {
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import {
  type Control,
  Controller,
  type UseFormRegisterReturn,
} from "react-hook-form";

interface MultiSelectFieldInputProps {
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (
    event: SelectChangeEvent<(string | number)[]>,
    child: React.ReactNode
  ) => void;
  register?: UseFormRegisterReturn<string>;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
  options?: { value: string; label: string }[];
  isRequired?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  name?: string;
  control?: Control<any>;
}

export const MultiSelectFieldInput = ({
  control,
  defaultValue,
  disabled,
  error,
  isLoading,
  isRequired,
  label,
  name,
  options,
  register,
  value,
  onChange,
}: MultiSelectFieldInputProps) => {
  const renderSelect = (
    controlledValue?: (string | number)[],
    controlledOnChange?: any
  ) => {
    return (
      <Select
        multiple
        value={controlledValue || value || ""}
        defaultValue={defaultValue}
        disabled={disabled}
        {...(register ? register : {})}
        onChange={(e, child) => {
          if (controlledOnChange) controlledOnChange(e);
          if (onChange) onChange(e, child);
        }}
        error={!!error}
        sx={{
          height: "47px",
          backgroundColor: "background.paper",
          typography: "subtitle1",
          width: "100%",
          "& .MuiSelect-select": {
            fontWeight: "600",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "secondary.light",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "secondary.default",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "text.primary",
              borderWidth: "1px",
            },
          },
          "& .MuiInputLabel-outlined": {
            transform: "translate(14px, 12px) scale(1)",
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)",
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
          },
        }}
      >
        {isLoading ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Loading...
            </Typography>
          </MenuItem>
        ) : (
          options &&
          options.length > 0 &&
          !isLoading &&
          options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: "1rem" }}
            >
              {option.label}
            </MenuItem>
          ))
        )}
      </Select>
    );
  };
  return (
    <Stack gap={1}>
      {label && (
        <FormLabel
          sx={{
            typography: "subtitle1",
            fontWeight: 500,
            color: "text.primary",
          }}
          required={isRequired}
        >
          {label}
        </FormLabel>
      )}

      {control && name ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => renderSelect(field.value, field.onChange)}
        />
      ) : (
        renderSelect()
      )}

      {typeof error === "string" && error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};
