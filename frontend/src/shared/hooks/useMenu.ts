import { useState } from "react";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const newAnchorEl = event;
    setAnchorEl(newAnchorEl.currentTarget);
  };

  const handleMenuClose = () => {
    const newAnchorEl = null;
    setAnchorEl(newAnchorEl);
  };
  return {
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
  };
};
