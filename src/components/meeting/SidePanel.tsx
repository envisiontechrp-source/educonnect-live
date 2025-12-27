import { ChatMessage, Participant, PanelType } from '@/types/meeting';
import { ChatPanel } from './ChatPanel';
import { ParticipantsPanel } from './ParticipantsPanel';
import { cn } from '@/lib/utils';

interface SidePanelProps {
  activePanel: PanelType;
  participants: Participant[];
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (content: string) => void;
}

export const SidePanel = ({
  activePanel,
  participants,
  messages,
  onClose,
  onSendMessage,
}: SidePanelProps) => {
  if (!activePanel) return null;

  return (
    <div className={cn(
      "absolute top-0 right-0 bottom-0 w-[360px] z-30",
      "border-l border-border shadow-elevation-3"
    )}>
      {activePanel === 'chat' && (
        <ChatPanel
          messages={messages}
          onClose={onClose}
          onSendMessage={onSendMessage}
        />
      )}
      {activePanel === 'participants' && (
        <ParticipantsPanel
          participants={participants}
          onClose={onClose}
        />
      )}
    </div>
  );
};
