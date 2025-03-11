import { Conversation } from "../components/Conversation.jsx";
import { Drawer } from "../components/Drawer.jsx";
import { useThreadQuery } from "../queries/useThreadQuery.js";

export type ThreadScreenProps = {
  threadId: string;
}

export function ThreadScreen({
  threadId,
}: ThreadScreenProps) {
  if (typeof threadId !== 'string') {
    throw new Error('Missing Thread Id');
  }

  const { data } = useThreadQuery(threadId);

  return (
    <view className="Page">
      <Drawer />
      <Conversation threadId={threadId} messages={data?.messages ?? []} />
    </view>

  );
}