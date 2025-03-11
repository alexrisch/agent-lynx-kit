import "./styles/Drawer.css";
import { useDrawerIsOpen, useDrawerToggle } from "../atoms/drawer.js";
import menuLight from '../assets/menu_light.png';
import menuDark from '../assets/menu_dark.png';
import homeLight from '../assets/home_light.png';
import homeDark from '../assets/home_dark.png';
import { useColorScheme } from "../hooks/useColorScheme.js";
import { useInfoQuery } from "../queries/useInfoQuery.js";
import { setAgentQueryCacheData, useAgentQuery } from "../queries/usePersistedAgentQuery.js";
import { setModelQueryCacheData, useModelQuery } from "../queries/usePersistedModelQuery.js";
import { APP_CONFIG } from "../constants/AppConfig.js";
import { RadioButtonGroup } from "./RadioButtonGroup.jsx";
import { useCallback } from "@lynx-js/react";
import { PreviousThreads } from "./PreviousThreads.jsx";
import { useNavigate } from "../atoms/page.js";

export function Drawer() {
  const isDrawerOpen = useDrawerIsOpen();
  const toggleDrawer = useDrawerToggle();
  const navigate = useNavigate();
  const colorScheme = useColorScheme();
  const { data } = useInfoQuery();
  const { data: selectedAgent } = useAgentQuery();
  const { data: selectedModel } = useModelQuery();

  const onAgentSelect = useCallback((agent: string) => () => {
    setAgentQueryCacheData(agent)
  }, [])

  const onModelSelect = useCallback((model: string) => () => {
    setModelQueryCacheData(model)
  }, [])

  const onHomeTap = useCallback(() => {
    navigate({
      name: 'Home',
    });
    toggleDrawer();
  }, [toggleDrawer, navigate])

  return (
    <view className="drawer-container">
      {/* Toggle Button */}
      <view bindtap={toggleDrawer} className="toggle-button">
        <image src={colorScheme === 'light' ? menuLight : menuDark} className="Arrow" />
      </view>

      {/* Background Overlay */}
      {isDrawerOpen && (
        <view className="drawer-overlay" bindtap={toggleDrawer}></view>
      )}

      {/* Drawer */}
      <view className={`drawer ${colorScheme === 'light' ? 'drawer-light' : 'drawer-dark'} ${isDrawerOpen ? "open" : ""}`}>
        <view bindtap={onHomeTap} className="close-button">
          <image src={colorScheme === 'light' ? homeLight : homeDark} className="Arrow" />
        </view>
        {APP_CONFIG.enableAgentSelect && <RadioButtonGroup
          title='Agent'
          options={data?.agents?.map(agent => ({
            label: agent.key,
            id: agent.key,
            onPress: onAgentSelect(agent.key),
            selected: selectedAgent ? selectedAgent === agent.key : data.default_agent === agent.key
          })) ?? []}
        />}
        {APP_CONFIG.enableModelSelect && <RadioButtonGroup
          title='Model'
          options={data?.models?.map(model => ({
            label: model,
            id: model,
            onPress: onModelSelect(model),
            selected: selectedModel ? selectedModel === model : data.default_model === model
          })) ?? []}
        />}
        <PreviousThreads />
      </view>
    </view>
  );
}
