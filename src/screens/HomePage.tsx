import { useCallback, useState } from '@lynx-js/react';
import uuid from 'react-native-uuid';
import { APP_CONFIG } from '../constants/AppConfig.js';
import { useSendMessageMutation } from '../queries/useSendMessageMutation.js';
import { useHomeThreadQuery } from '../queries/useThreadQuery.js';
import { addNewPersistedPreviousThreads } from '../utils/persist.js';
import { Conversation } from '../components/Conversation.jsx';
import { ConversationInput } from '../components/ConversationInput.jsx';
import { Drawer } from '../components/Drawer.jsx';
import { useOnScreenFocus } from '../atoms/page.js';

export function HomePage() {
  const [threadId, setThreadId] = useState<string>(
    // @ts-ignore
    uuid.v4()
  );

  useOnScreenFocus("Home", () => {
    // @ts-ignore
    setThreadId(uuid.v4());
  });

  const { data } = useHomeThreadQuery(threadId);
  const { mutateAsync, isPending } = useSendMessageMutation(threadId);

  const onSend = useCallback(
    (input: string) => {
      if (!data?.messages) {
        addNewPersistedPreviousThreads(threadId);
      }
      mutateAsync(input);
    },
    [mutateAsync, data?.messages, threadId],
  );

  if (!data?.messages.length) {
    return (
      <view className="Page">
        <Drawer />
        <view className="Content">
          <text className="Subtitle">{APP_CONFIG.homeMessage}</text>
        </view>
        <ConversationInput onSend={onSend} sending={isPending} />
      </view>
    );
  }

  return (
    <view className="Page">
      <Drawer />
      <Conversation threadId={threadId} messages={data?.messages ?? []} />
    </view>
  );
}
