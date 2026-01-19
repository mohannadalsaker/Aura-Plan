import { Button, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

interface MainButtonProps {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  sx?: SxProps<Theme>;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  isLoading?: boolean;
}

const MainButton = ({
  variant,
  children,
  sx,
  type,
  isLoading,
  onClick,
}: MainButtonProps) => {
  return (
    <Button
      loading={isLoading}
      type={type || "button"}
      onClick={
        onClick
          ? (e) => {
              if (onClick) onClick();
              e.preventDefault();
            }
          : undefined
      }
      variant={variant || "contained"}
      sx={{
        backgroundImage: "linear-gradient(to bottom right, #3CB371, #1E90FF)",
        color: "#fff",
        fontWeight: "500",
        height: "42px",
        textTransform: "none",
        typography: "subtitle1",
        display: "flex",
        alignItems: "center",
        textWrap: "nowrap",
        gap: 1,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default MainButton;
