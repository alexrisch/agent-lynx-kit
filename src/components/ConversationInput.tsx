import { ThemedInput } from './ui/ThemedInput.jsx';
import './styles/ConversationInput.css';
import { useState } from '@lynx-js/react';
import arrow from '../assets/arrow.png';

type ConversationInputProps = {
  onSend: (text: string) => void;
  sending: boolean;
};

export function ConversationInput({ onSend, sending }: ConversationInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  return (
    <view className="Container">
      <ThemedInput
        className="Input"
        value={input}
        onChange={setInput}
        placeholder="Send a message"
      />
      <view bindtap={sending ? undefined : handleSend} className="SendIcon">
        <image src={arrow} className="Arrow" />
      </view>
    </view>
  );
}
