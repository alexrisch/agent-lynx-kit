import { useQuery } from '@tanstack/react-query';
import { getPersistedModel } from '../utils/persist.js';
import { QueryKeys } from './QueryKeys.js';
import { queryClient } from './queryClient.js';

const getModelQueryKey = () => [QueryKeys.model];

const modelQueryFunction = async () => {
  return getPersistedModel();
};

const modelQueryConfig = () => ({
  queryKey: getModelQueryKey(),
  queryFn: () => modelQueryFunction(),
});

export const useModelQuery = () => useQuery(modelQueryConfig());

export const setModelQueryCacheData = (model: string) => {
  const queryKey = modelQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, model);
};
