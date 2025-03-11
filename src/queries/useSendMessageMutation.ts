import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { APP_CONFIG } from '../constants/AppConfig.js';
import type { ChatMessage } from '../types.js';
import { getPersistedAgent, getPersistedModel } from '../utils/persist.js';
import { MutationKeys } from './MutationKeys.js';
import { addMessageToThreadQuery } from './useThreadQuery.js';

const apiUrl = APP_CONFIG.apiUrl;

const getSendMessageMutationKey = (threadId: string) => [
  MutationKeys.sendMessage,
  threadId,
];

const sendMessageFunction = async (threadId: string, input: string) => {
  const humanMessage: ChatMessage = {
    content: input,
    type: 'human',
  };
  const model: string | undefined | null = APP_CONFIG.enableModelSelect
    ? await getPersistedModel() ?? undefined
    : undefined;
  const agent: string | undefined | null = APP_CONFIG.enableAgentSelect
    ? await getPersistedAgent() ?? undefined
    : undefined;
  addMessageToThreadQuery(threadId, humanMessage);

  const payload = {
    threadId,
    message: input,
    model,
    agent,
  };

  const response = await fetch(
    `${apiUrl}/api/invoke`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    },
  );

  const newMessage = await response.json();
  console.log("here111132", newMessage)
  addMessageToThreadQuery(threadId, newMessage);
};

export const useSendMessageMutation = (threadId: string) =>
  useMutation({
    mutationKey: getSendMessageMutationKey(threadId),
    mutationFn: (input: string) => sendMessageFunction(threadId, input),
  });
