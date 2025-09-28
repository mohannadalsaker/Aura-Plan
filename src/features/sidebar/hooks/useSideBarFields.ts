// import {
//   IconAd,
//   IconBell,
//   IconBrandCampaignmonitor,
//   IconBuildingWarehouse,
//   IconCategory,
//   IconCoins,
//   IconCreditCard,
//   IconCurrency,
//   IconDiscount,
//   IconFlame,
//   IconIcons,
//   IconLock,
//   IconMessage,
//   IconPhotoPlus,
//   IconPlug,
//   IconSection,
//   IconShirt,
//   IconShoppingBag,
//   IconSmartHome,
//   IconTicket,
//   IconTruckDelivery,
//   IconUsers,
//   IconBuildingStore,
//   IconComponents,
//   IconSettings,
//   IconShoppingCart,
//   IconClipboardText,
// } from "@/config/import/icons";
import { useCallback, useState } from "react";
// import { useTranslation } from "react-i18next";
import type { SideBarItemProps } from "../types/sideBarItemType";
// import useNotifications from "../../notifications_managment/hooks/useNotifications";
// import { usePermissionRole } from "@/shared";

export const useSideBarFields = () => {
  // const { i18n } = useTranslation();
  // const { countNotificationUnReadData } = useNotifications();
  // const { hasPermissionRole, isGetPermissionsRoleLoading } =
  //   usePermissionRole();

  // Store the opened item state
  const [openedId, setOpenedId] = useState<string>("");

  // Improved toggle function with useCallback for better performance
  const handleToggleItemOpen = useCallback(
    (id: string, hasParent?: boolean) => {
      setOpenedId((prevOpenedId) => {
        // If clicking the currently open parent item, close it
        if (id === prevOpenedId.split("-")[0]) {
          return "";
        }

        // If this is a child item
        if (hasParent) {
          const parentId = prevOpenedId.split("-")[0];

          // If clicking the currently open child, close it and keep parent open
          if (id === prevOpenedId.split("-")[1]) {
            return parentId;
          }

          // Open a different child under the same parent
          return `${parentId}-${id}`;
        }

        // Open a parent item
        return id;
      });
    },
    []
  );

  // Define sidebar data with proper typing
  const sideBarData: SideBarItemProps["item"][] = [
    {
      id: 0,
      name: "Dashboard",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 1,
      name: "Projects",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/projects",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 2,
      name: "Tasks",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/tasks",
      isNormale: true,
      hasChildren: false,
    },
    {
      id: 3,
      name: "Users",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/users",
      isNormale: true,
      hasChildren: false,
    },
     {
      id: 4,
      name: "Roles",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/roles",
      isNormale: true,
      hasChildren: false,
    },
     {
      id: 5,
      name: "Comments",
      // lightIcon: IconSmartHome,
      // darkIcon: IconSmartHome,
      route: "/comments",
      isNormale: true,
      hasChildren: false,
    },
  ];

  return {
    sideBarData,
    openedId,
    // isGetPermissionsRoleLoading,
    handleToggleItemOpen,
  };
};
