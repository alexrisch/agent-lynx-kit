import { useEffect } from "@lynx-js/react";
import { atom, useAtom } from "jotai";

type Pages = {
  name: 'Home';
} | {
  name: 'Thread';
  params: {
    threadId: string;
  }
};

export const pageAtom = atom<Pages>({
  name: 'Home'
});

export const usePageAtom = () => {
  return useAtom(pageAtom);
};

export const useCurrentPage = () => {
  const [isDrawerOpen] = usePageAtom();
  return isDrawerOpen;
};

export const useNavigate = () => {
  const [_, navigate] = usePageAtom();
  return (newPage: Pages) => {
    navigate(newPage)
  };
};

export const useOnScreenFocus = (name: Pages['name'], callback: () => void) => {
  const { name: currentPageName } = useCurrentPage();

  useEffect(() => {
    if (name === currentPageName) {
      callback();
    }
  }, [name, callback,currentPageName])
}
