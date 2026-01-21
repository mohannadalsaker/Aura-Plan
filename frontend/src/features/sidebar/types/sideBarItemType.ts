// import { IconType } from "@/shared";
import type { MuiStyles, NavLinkStyles } from "./mui";

export interface SideBarItemType {
  id: number;
  name: string;
  route?: string;
  child: {
    id: number;
    route: string;
    name: string;
    hasParent: boolean;
    hasChildren: boolean;
  };
  lightIcon?: string;
  darkIcon?: string;
  hasChildren?: boolean;
  isNormale: boolean;
  count?: number;
  children?: SideBarItemType[];
  hasParent?: boolean;
}

export interface SideBarItemProps {
  item: {
    id: number;
    name: string;
    route?: string;
    isNormale: boolean;
    hasChildren: boolean;
    hasParent?: boolean;
  };
  sx?: MuiStyles["sx"];
  openedId: string;
  toggleOpen: (id: string, hasParent?: boolean) => void;
}

export interface SideBarLinkProps {
  to: string;
  style: (props: NavLinkStyles) => React.CSSProperties;
  children: (props: NavLinkStyles) => React.ReactNode;
}

export interface SideBarCollapseProps {
  in: boolean;
  timeout: "auto" | number;
  unmountOnExit?: boolean;
  children: React.ReactNode;
}
