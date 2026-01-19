declare module "@mui/material/styles" {
  interface PaletteColor {
    border?: string;
    default?: string;
    placeholder?: string;
  }
  interface SimplePaletteColorOptions {
    border?: string;
    default?: string;
    placeholder?: string;
  }
  interface Theme {
    primary: {
      border: string;
      default: string;
      placeholder: string;
    };
    secondary: {
      default: string;
    };
  }
  interface ThemeOptions {
    primary?: {
      border?: string;
      default?: string;
      placeholder?: string;
    };
    secondary?: {
      default?: string;
    };
  }
}

export const colorsSettings = () => {
  return {
    primary: {
      default: "#2a52be",
      main: "#2a52be",
      state: "#6495ED",
      error: "#FF0000",
    },
    secondary: {
      main: "#E5F2E8",
      default: "#E7EAEE",
      light: "#D0D5DD",
    },
    info: {
      main: "#1E90FF",
      light: "#F1F1F1",
    },
    success: {
      main: "#3CB371",
      state: "#6B8E23",
      contrastText: "#ADFF2F",
    },
    error: {
      main: "#FF0000",
      state: "#d61f2c40",
    },
    background: {
      default: "#F9F9F9",
      paper: "#fff",
    },
    text: {
      primary: "#353435ff",
      secondary: "#707070",
      disabled: "#a1abbbff",
    },
  };
};
