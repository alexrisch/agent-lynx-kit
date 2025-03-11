import { useMemo } from '@lynx-js/react';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries/queryClient.js';
import { useColorScheme } from './hooks/useColorScheme.js';
import { Router } from './components/Router.jsx';

export function App() {
  const colorScheme = useColorScheme();
  const themeClass = useMemo(
    () => {
      return `theme-${colorScheme}`;
    },
    [colorScheme],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <view className={themeClass}>
        <Router />
      </view>
    </QueryClientProvider>
  );
}
