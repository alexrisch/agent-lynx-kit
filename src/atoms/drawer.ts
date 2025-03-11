import { atom, useAtom } from "jotai";

export const drawer = atom(false);

export const useDrawerAtom = () => {

  return useAtom(drawer);
};

export const useDrawerIsOpen = () => {
  const [isDrawerOpen] = useDrawerAtom();
  return isDrawerOpen;
};

export const useDrawerToggle = () => {
  const [_, toggleDrawer] = useDrawerAtom();
  return () => {
    toggleDrawer(prev => !prev)
  };
};
