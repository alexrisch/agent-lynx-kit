import { useQuery } from '@tanstack/react-query';
import { getPersistedAgent } from '../utils/persist.js';
import { QueryKeys } from './QueryKeys.js';
import { queryClient } from './queryClient.js';

const getAgentQueryKey = () => [QueryKeys.agent];

const agentQueryFunction = async () => {
  return getPersistedAgent();
};

const agentQueryConfig = () => ({
  queryKey: getAgentQueryKey(),
  queryFn: () => agentQueryFunction(),
});

export const useAgentQuery = () => useQuery(agentQueryConfig());

export const setAgentQueryCacheData = (agent: string) => {
  const queryKey = agentQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, agent);
};
