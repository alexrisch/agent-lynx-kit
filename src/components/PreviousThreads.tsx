import { useCallback, useEffect } from "@lynx-js/react";
import { useThreadsQuery } from "../queries/useThreadsQuery.js";
import { ThemedText } from "./ui/ThemedText.jsx"
import { useDrawerIsOpen, useDrawerToggle } from "../atoms/drawer.js";
import "./styles/PreviousThreads.css"
import { useNavigate } from "../atoms/page.js";

export function PreviousThreads() {
  const { data: previousThreads = [], refetch } = useThreadsQuery();
  const isDrawerOpen = useDrawerIsOpen()
  const toggleDrawer = useDrawerToggle();
  const navigate = useNavigate();

  const onPress = useCallback((threadId: string) => () => {
    navigate({
      name: 'Thread',
      params: {
        threadId,
      },
    })
    toggleDrawer();
  }, [toggleDrawer, navigate])

  useEffect(() => {
    if (isDrawerOpen) {
      refetch();
    }
  }, [isDrawerOpen])

  return (
    <view className={`container`}>
      <ThemedText type="subtitle" className={`title`}>
        Previous Threads
      </ThemedText>
      {previousThreads.map(thread => {
        return (
          <view key={thread} bindtap={onPress(thread)} className={`itemContainer`}>
            <ThemedText>
              {thread}
            </ThemedText>
          </view>
        )
      })}
    </view>
  );
}
