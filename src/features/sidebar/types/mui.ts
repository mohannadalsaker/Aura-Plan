import type { SxProps, Theme } from "@mui/material";

export interface MuiStyles {
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
}

export interface NavLinkStyles {
  isActive: boolean;
  isPending: boolean;
}
