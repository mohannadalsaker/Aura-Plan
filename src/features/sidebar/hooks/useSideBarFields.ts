import { useCallback, useState } from "react";
import type { SideBarItemProps } from "../types/sideBarItemType";
import { QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { removeLsValue } from "@/shared/utils";
import { useSideBarStore } from "../store/useSideBarStore";

export const useSideBarFields = () => {
  const navigate = useNavigate();
  const { close } = useSideBarStore();
  const queryClient = new QueryClient();
  const [openedId, setOpenedId] = useState<string>("");

  const handleToggleItemOpen = useCallback(
    (id: string, hasParent?: boolean) => {
      setOpenedId((prevOpenedId) => {
        if (id === prevOpenedId.split("-")[0]) {
          return "";
        }
        if (hasParent) {
          const parentId = prevOpenedId.split("-")[0];

          if (id === prevOpenedId.split("-")[1]) {
            return parentId;
          }

          return `${parentId}-${id}`;
        }

        return id;
      });
    },
    []
  );

  const sideBarData: SideBarItemProps["item"][] = [
    {
      id: 0,
      name: "Dashboard",
      route: "/",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 1,
      name: "Projects",
      route: "/projects",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 2,
      name: "Tasks",
      route: "/tasks",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 3,
      name: "Users",
      route: "/users",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 4,
      name: "Roles",
      route: "/roles",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 5,
      name: "Comments",
      route: "/comments",
      isNormale: true,
      hasChildren: false,
    },
  ];

  const logout = () => {
    queryClient.clear();
    close();
    removeLsValue("token");
    navigate("/auth/login");
  };

  return {
    sideBarData,
    openedId,
    handleToggleItemOpen,
    logout,
  };
};
