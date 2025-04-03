import { useEffect, useRef } from 'react';
import { useSendMessageMutation } from '../queries/useSendMessageMutation.js';
import type { ChatMessage } from '../types.js';
import { ConversationInput } from './ConversationInput.jsx';
import './styles/Conversation.css';
import type { NodesRef } from '@lynx-js/types';

type ConversationProps = {
  threadId: string;
  messages: ChatMessage[];
};

export function Conversation({ messages, threadId }: ConversationProps) {

  const { mutateAsync, isPending } = useSendMessageMutation(threadId);

  const scrollRef = useRef<NodesRef>(null)

  useEffect(() => {

    lynx.createSelectorQuery()
      .select('#message-list')
      .invoke({
        method: 'scrollToPosition',
        params: {
          position: messages.length - 1,
          offset: 0,
          alignTo: 'top',
          smooth: true,
        },
        success: function (res) { },
        fail: function (res) { },
      })
      .exec();
  }, [messages.length])

  return (
    <view className="Content">
      <view style={{ flex: 1, height: '100%', width: '100%', marginLeft: 20, marginRight: 20, }}>
        <list
          id={'message-list'}
          ref={scrollRef}
          className="list"
          list-type="single"
          scroll-orientation="vertical"
          custom-list-name="list-container"
          style={{ flex: 1, height: '100%', width: '100%' }}
        >
          {messages.map((message, index) => {
            const fromHuman = message.type === 'human';
            return (
              <list-item
                item-key={`${index}`}
                style={{
                  width: '100%',
                }}
                key={`${index}`}
              >
                <view
                  className={`Message ${fromHuman ? 'HumanMessage' : 'AiMessage'}`}
                >
                  <text
                    className={fromHuman ? 'HumanMessageText' : 'AiMessageText'}
                  >
                    {message.content}
                  </text>
                </view>
              </list-item>
            );
          })}
        </list>
      </view>
      <view style={{ width: '100%' }}>
        <ConversationInput onSend={mutateAsync} sending={isPending} />
      </view>
    </view>
  );
}
