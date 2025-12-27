import { Mic, MicOff, Hand, Pin, MoreVertical } from 'lucide-react';
import { Participant } from '@/types/meeting';
import { cn } from '@/lib/utils';

interface VideoTileProps {
  participant: Participant;
  isLarge?: boolean;
  isSelfView?: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name: string) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-cyan-500 to-cyan-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

export const VideoTile = ({ participant, isLarge = false, isSelfView = false }: VideoTileProps) => {
  return (
    <div
      className={cn(
        "video-tile group relative flex items-center justify-center",
        "transition-all duration-300 ease-out",
        participant.isSpeaking && "speaking ring-[3px] ring-success",
        isSelfView && "absolute bottom-4 right-4 w-48 h-36 z-10 shadow-elevation-4",
        !isSelfView && "w-full h-full"
      )}
    >
      {/* Video or Avatar */}
      {participant.isCameraOff ? (
        <div className={cn(
          "flex items-center justify-center w-full h-full",
          "bg-gradient-to-br",
          getAvatarColor(participant.name)
        )}>
          <div className={cn(
            "flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm",
            isLarge ? "w-24 h-24" : "w-16 h-16"
          )}>
            <span className={cn(
              "font-semibold text-white",
              isLarge ? "text-3xl" : "text-xl"
            )}>
              {getInitials(participant.name)}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {/* Simulated video with gradient */}
          <div className={cn(
            "flex items-center justify-center rounded-full bg-gradient-to-br",
            getAvatarColor(participant.name),
            isLarge ? "w-24 h-24" : "w-16 h-16"
          )}>
            <span className={cn(
              "font-semibold text-white",
              isLarge ? "text-3xl" : "text-xl"
            )}>
              {getInitials(participant.name)}
            </span>
          </div>
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Hand raised indicator */}
      {participant.isHandRaised && (
        <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-warning rounded-full animate-pulse-soft">
          <Hand className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {participant.isMuted ? (
            <div className="flex items-center justify-center w-6 h-6 bg-destructive rounded-full">
              <MicOff className="w-3.5 h-3.5 text-white" />
            </div>
          ) : (
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full transition-colors",
              participant.isSpeaking ? "bg-success" : "bg-white/20"
            )}>
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          <span className="text-sm font-medium text-white drop-shadow-md">
            {participant.name}
            {participant.isHost && <span className="ml-1 text-xs opacity-75">(Host)</span>}
          </span>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button className="flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
          <Pin className="w-4 h-4 text-white" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Screen sharing indicator */}
      {participant.isScreenSharing && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary rounded-full">
          <span className="text-xs font-medium text-white">Presenting</span>
        </div>
      )}
    </div>
  );
};
