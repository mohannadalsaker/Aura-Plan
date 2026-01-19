// routes.tsx
import React, { lazy, Suspense } from "react";
import ProtectedLayout from "@/layout/ProtectedLayoyt";
import RootLayout from "@/layout/RootLayout";
import { type RouteObject } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const pages = import.meta.glob("./pages/**/index.tsx");

// Helper: Convert file path to route path
const normalizePath = (filePath: string) => {
  let routePath = filePath.replace("./pages", "").replace(/\/index\.tsx$/, "");

  if (routePath.endsWith("/view")) {
    routePath = routePath.concat("/:id");
  }
  if (routePath.endsWith("/edit")) {
    routePath = routePath.concat("/:id");
  }
  if (routePath.endsWith("/dashboard")) {
    routePath = routePath.replace("/dashboard", "/");
  }

  return routePath === "" ? "/" : routePath;
};

// Collect generated routes
const dynamicRoutes: RouteObject[] = Object.entries(pages).map(
  ([filePath, loader]) => {
    const Component = lazy(
      loader as () => Promise<{
        default: React.ComponentType<unknown>;
      }>
    );
    const path = normalizePath(filePath);

    return {
      path,
      element: (
        <Suspense
          fallback={
            <Box
              sx={{
                textAlign: "center",
                padding: 2,
                backgroundColor: "background.paper",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Component />
        </Suspense>
      ),
    };
  }
);

// Split routes by layout
const authRoutes = dynamicRoutes.filter((route) =>
  route.path?.startsWith("/auth")
);
const rootRoutes = dynamicRoutes.filter(
  (route) => !route.path?.startsWith("/auth")
);

// Final routes tree
export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <ProtectedLayout />,
    children: authRoutes,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: rootRoutes,
  },
];
