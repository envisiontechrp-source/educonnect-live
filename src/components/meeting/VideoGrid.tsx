import { Participant } from '@/types/meeting';
import { VideoTile } from './VideoTile';
import { cn } from '@/lib/utils';

interface VideoGridProps {
  participants: Participant[];
  isPanelOpen: boolean;
}

export const VideoGrid = ({ participants, isPanelOpen }: VideoGridProps) => {
  const count = participants.length;
  const selfParticipant = participants.find(p => p.id === '1');
  const otherParticipants = participants.filter(p => p.id !== '1');
  
  // Show self-view as floating when more than 2 participants
  const showFloatingSelf = count > 2;
  const gridParticipants = showFloatingSelf ? otherParticipants : participants;

  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1 grid-rows-1';
    if (count === 2) return 'grid-cols-2 grid-rows-1';
    if (count === 3) return 'grid-cols-2 grid-rows-2';
    if (count === 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    if (count <= 9) return 'grid-cols-3 grid-rows-3';
    return 'grid-cols-4 grid-rows-3';
  };

  return (
    <div className={cn(
      "relative flex-1 p-4 transition-all duration-300",
      isPanelOpen && "pr-[380px]"
    )}>
      <div className={cn(
        "grid gap-3 h-full w-full",
        getGridClass(gridParticipants.length)
      )}>
        {gridParticipants.map((participant, index) => (
          <VideoTile
            key={participant.id}
            participant={participant}
            isLarge={gridParticipants.length <= 2}
          />
        ))}
      </div>

      {/* Floating self-view */}
      {showFloatingSelf && selfParticipant && (
        <VideoTile
          participant={selfParticipant}
          isSelfView
        />
      )}
    </div>
  );
};
