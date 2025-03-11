import { useMemo } from "@lynx-js/react";


export const useColorScheme = (): 'light' | 'dark' => {
  const theme: 'light' | 'dark' = useMemo(() => {
    // @ts-ignore
    if (lynx.__globalProps.theme === "Light") {
      return 'light';
    }
    return 'dark'
  },
    // @ts-ignore
    [lynx.__globalProps.theme],
  );
  return theme;
};
