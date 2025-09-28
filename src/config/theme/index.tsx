import { colorsSettings } from "./colors";
import { fonts } from "./fonts";
export const themeSettings = () => {
  return {
    palette: {
      ...colorsSettings(),
    },
    typography: { ...fonts },
    spacing: (factor: number) => `${factor * 8}px`,
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "none",
          },
        },
      },
      // MuiTableRow: {
      //   styleOverrides: {
      //     root: {
      //       borderBottom: "none", // Removes the bottom border from rows
      //     },
      //   },
      // },
    },
  };
};
