import { useSendMessageMutation } from '../queries/useSendMessageMutation.js';
import type { ChatMessage } from '../types.js';
import { ConversationInput } from './ConversationInput.jsx';
import './styles/Conversation.css';

type ConversationProps = {
  threadId: string;
  messages: ChatMessage[];
};

export function Conversation({ messages, threadId }: ConversationProps) {

  const { mutateAsync, isPending } = useSendMessageMutation(threadId);

  return (
    <view className="Content">
      <view style={{ flex: 1, height: '100%', width: '100%', marginLeft: 20, marginRight: 20, }}>
        <list
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
      <view style={{width: '100%'}}>
      <ConversationInput onSend={mutateAsync} sending={isPending} />
      </view>
    </view>
  );
}
