import { useState } from "react";
interface MenuActionType<T> {
  rows: T[];
}
export const useMenuAction = <T>(props: MenuActionType<T>) => {
  const { rows } = props;
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>(
    new Array(rows?.length).fill(null)
  );
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };
  return {
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
  };
};
