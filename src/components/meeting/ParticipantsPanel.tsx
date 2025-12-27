import { X, Mic, MicOff, Video, VideoOff, Hand, MoreVertical, Search } from 'lucide-react';
import { Participant } from '@/types/meeting';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ParticipantsPanelProps {
  participants: Participant[];
  onClose: () => void;
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
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

export const ParticipantsPanel = ({ participants, onClose }: ParticipantsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const raisedHands = filteredParticipants.filter(p => p.isHandRaised);
  const others = filteredParticipants.filter(p => !p.isHandRaised);

  const ParticipantRow = ({ participant }: { participant: Participant }) => (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors rounded-lg group">
      <div className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-medium",
        getAvatarColor(participant.name)
      )}>
        {getInitials(participant.name)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {participant.name}
          {participant.isHost && (
            <span className="ml-2 text-xs text-muted-foreground">(Host)</span>
          )}
          {participant.id === '1' && (
            <span className="ml-2 text-xs text-primary">(You)</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {participant.isHandRaised && (
          <div className="flex items-center justify-center w-7 h-7 bg-warning/20 rounded-full">
            <Hand className="w-4 h-4 text-warning" />
          </div>
        )}
        
        <div className={cn(
          "flex items-center justify-center w-7 h-7 rounded-full",
          participant.isMuted ? "bg-destructive/20" : "bg-transparent"
        )}>
          {participant.isMuted ? (
            <MicOff className="w-4 h-4 text-destructive" />
          ) : (
            <Mic className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        <div className={cn(
          "flex items-center justify-center w-7 h-7 rounded-full",
          participant.isCameraOff ? "bg-destructive/20" : "bg-transparent"
        )}>
          {participant.isCameraOff ? (
            <VideoOff className="w-4 h-4 text-destructive" />
          ) : (
            <Video className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        <button className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-7 h-7 rounded-full hover:bg-muted transition-all">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-surface animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">
          People ({participants.length})
        </h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Participants list */}
      <div className="flex-1 overflow-y-auto">
        {raisedHands.length > 0 && (
          <div className="mb-2">
            <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Raised hands ({raisedHands.length})
            </p>
            {raisedHands.map((participant) => (
              <ParticipantRow key={participant.id} participant={participant} />
            ))}
          </div>
        )}

        <div>
          {raisedHands.length > 0 && (
            <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              In this call
            </p>
          )}
          {others.map((participant) => (
            <ParticipantRow key={participant.id} participant={participant} />
          ))}
        </div>
      </div>
    </div>
  );
};
