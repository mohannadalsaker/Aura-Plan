import ProtectedLayout from "@/layout/ProtectedLayoyt";
import RootLayout from "@/layout/RootLayout";
import React, { lazy, Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import Loader from "./shared/components/Loader";

const pages = import.meta.glob("./pages/**/index.tsx");

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

const dynamicRoutes: RouteObject[] = Object.entries(pages).map(
  ([filePath, loader]) => {
    const Component = lazy(
      loader as () => Promise<{
        default: React.ComponentType<unknown>;
      }>,
    );
    const path = normalizePath(filePath);

    return {
      path,
      element: (
        <Suspense fallback={<Loader />}>
          <Component />
        </Suspense>
      ),
    };
  },
);

const authRoutes = dynamicRoutes.filter((route) =>
  route.path?.startsWith("/auth"),
);
const rootRoutes = dynamicRoutes.filter(
  (route) => !route.path?.startsWith("/auth"),
);

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
