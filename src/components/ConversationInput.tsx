import { ThemedInput } from './ui/ThemedInput.jsx';
import './styles/ConversationInput.css';
import { useState, useEffect } from '@lynx-js/react';
import arrow from '../assets/arrow.png';

type ConversationInputProps = {
  onSend: (text: string) => void;
  sending: boolean;
};

export function ConversationInput({ onSend, sending }: ConversationInputProps) {
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  useEffect(() => {
    setIsAnimating(true);
  }, [])

  return (
    <view className={`Container ${isAnimating ? "fade-in-up" : ""}`}>
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
