import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { APP_CONFIG } from '../constants/AppConfig.js';
import type { ChatMessage } from '../types.js';
import { QueryKeys } from './QueryKeys.js';
import { queryClient } from './queryClient.js';

const apiUrl = APP_CONFIG.apiUrl;

const getThreadQueryKey = (threadId: string) => [QueryKeys.thread, threadId];

const threadQueryFunction = async (threadId: string) => {
  const response = await axios.get<{ messages: ChatMessage[] }>(
    `${apiUrl}/api/thread?threadId=${threadId}`,
  );
  return response.data;
};

const messageQueryConfig = (threadId: string) => ({
  queryKey: getThreadQueryKey(threadId),
  queryFn: () => threadQueryFunction(threadId),
});

const homeMessageQueryConfig = (
  threadId: string,
): UseQueryOptions<{ messages: ChatMessage[] }> => ({
  ...messageQueryConfig(threadId),
  enabled: false,
});

export const useThreadQuery = (threadId: string) =>
  useQuery(messageQueryConfig(threadId));

export const useHomeThreadQuery = (threadId: string) =>
  useQuery(homeMessageQueryConfig(threadId));

const setThreadQueryData = (
  threadId: string,
  newData: { messages: ChatMessage[] },
) => {
  const queryKey = messageQueryConfig(threadId).queryKey;
  return queryClient.setQueryData(queryKey, newData);
};

const getThreadQueryCacheData = (threadId: string) => {
  const queryKey = messageQueryConfig(threadId).queryKey;
  return queryClient.getQueryData<{ messages: ChatMessage[] }>(queryKey);
};

export const addMessageToThreadQuery = (
  threadId: string,
  message: ChatMessage,
) => {
  const previousData = getThreadQueryCacheData(threadId);
  if (!previousData) {
    return setThreadQueryData(threadId, { messages: [message] });
  }
  const newMessageData = [...previousData.messages, message];

  return setThreadQueryData(threadId, { messages: newMessageData });
};
