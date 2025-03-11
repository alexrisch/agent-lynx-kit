import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { APP_CONFIG } from '../constants/AppConfig.js';
import { QueryKeys } from './QueryKeys.js';

type AgentInfo = {
  key: string;
  description: string;
};

export type InfoResponse = {
  /**
   * List of available agents.
   */
  agents: AgentInfo[];
  /**
   * List of available LLMs.
   */
  models: string[];
  /**
   * Default agent used when none is specified.
   * example: research-assistant
   */
  default_agent: string;
  /**
   * Default model used when none is specified.
   */
  default_model: string;
};

const apiUrl = APP_CONFIG.apiUrl;

const getInfoQueryKey = () => [QueryKeys.info];

const infoQueryFunction = async () => {
  const response = await axios.get<InfoResponse>(`${apiUrl}/api/info`);
  return response.data;
};

const infoQueryConfig = () => ({
  queryKey: getInfoQueryKey(),
  queryFn: () => infoQueryFunction(),
});

export const useInfoQuery = () => useQuery(infoQueryConfig());
