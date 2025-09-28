import { themeSettings } from "@/config/theme";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export const useMode = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return [theme] as const;
};
