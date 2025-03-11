import { getPersistedPreviousThreads } from '../utils/persist.js';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './QueryKeys.js';
import { queryClient } from './queryClient.js';

const getThreadsQueryKey = () => [QueryKeys.threads];

const threadsQueryFunction = async () => {
  const persisted = await getPersistedPreviousThreads();
  return persisted ?? [];
};

const threadsQueryConfig = () => ({
  queryKey: getThreadsQueryKey(),
  queryFn: () => threadsQueryFunction(),
});

export const useThreadsQuery = () => useQuery(threadsQueryConfig());

export const setThreadsQueryCacheData = (threads: string) => {
  const queryKey = threadsQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, threads);
};
