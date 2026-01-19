import { ThemeProvider } from "@mui/material";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useMode } from "./shared/hooks/useTheme";
import SnackBarContainer from "./shared/components/SnackBarContainer";

const AppRoutes = () => useRoutes(routes);

function App() {
  const [theme] = useMode();

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackBarContainer />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
