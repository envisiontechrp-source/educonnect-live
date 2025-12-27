import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Captions,
  Hand,
  MoreVertical,
  PhoneOff,
  MessageSquare,
  Users,
  Settings,
  Info,
  Grid,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PanelType } from '@/types/meeting';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ControlBarProps {
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isCaptionsOn: boolean;
  isHandRaised: boolean;
  activePanel: PanelType;
  participantCount: number;
  messageCount: number;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onToggleCaptions: () => void;
  onToggleHandRaise: () => void;
  onTogglePanel: (panel: PanelType) => void;
  onEndCall: () => void;
}

interface ControlButtonProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  shortcut?: string;
  isActive?: boolean;
  isDestructive?: boolean;
  badge?: number;
  onClick: () => void;
}

const ControlButton = ({
  icon,
  activeIcon,
  label,
  shortcut,
  isActive = false,
  isDestructive = false,
  badge,
  onClick,
}: ControlButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={cn(
          "control-btn relative",
          isActive && !isDestructive && "bg-destructive hover:bg-destructive/90",
          isDestructive && "end-call"
        )}
      >
        {isActive && activeIcon ? activeIcon : icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-[10px] font-medium text-white rounded-full">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    </TooltipTrigger>
    <TooltipContent side="top" className="flex items-center gap-2">
      <span>{label}</span>
      {shortcut && (
        <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-muted rounded">
          {shortcut}
        </kbd>
      )}
    </TooltipContent>
  </Tooltip>
);

export const ControlBar = ({
  isMuted,
  isCameraOff,
  isScreenSharing,
  isCaptionsOn,
  isHandRaised,
  activePanel,
  participantCount,
  messageCount,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onToggleCaptions,
  onToggleHandRaise,
  onTogglePanel,
  onEndCall,
}: ControlBarProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-3 bg-control-bg/95 backdrop-blur-md rounded-full px-4 py-3 shadow-elevation-4">
        {/* Primary controls */}
        <div className="flex items-center gap-2">
          <ControlButton
            icon={<Mic className="w-5 h-5" />}
            activeIcon={<MicOff className="w-5 h-5" />}
            label={isMuted ? 'Unmute' : 'Mute'}
            shortcut="M"
            isActive={isMuted}
            onClick={onToggleMute}
          />
          <ControlButton
            icon={<Video className="w-5 h-5" />}
            activeIcon={<VideoOff className="w-5 h-5" />}
            label={isCameraOff ? 'Turn on camera' : 'Turn off camera'}
            shortcut="C"
            isActive={isCameraOff}
            onClick={onToggleCamera}
          />
        </div>

        <div className="w-px h-8 bg-white/20" />

        {/* Secondary controls */}
        <div className="flex items-center gap-2">
          <ControlButton
            icon={<MonitorUp className="w-5 h-5" />}
            label={isScreenSharing ? 'Stop presenting' : 'Present now'}
            isActive={isScreenSharing}
            onClick={onToggleScreenShare}
          />
          <ControlButton
            icon={<Captions className="w-5 h-5" />}
            label={isCaptionsOn ? 'Turn off captions' : 'Turn on captions'}
            shortcut="L"
            isActive={false}
            onClick={onToggleCaptions}
          />
          <ControlButton
            icon={<Hand className="w-5 h-5" />}
            label={isHandRaised ? 'Lower hand' : 'Raise hand'}
            isActive={isHandRaised}
            onClick={onToggleHandRaise}
          />
        </div>

        <div className="w-px h-8 bg-white/20" />

        {/* Panel toggles */}
        <div className="flex items-center gap-2">
          <ControlButton
            icon={<MessageSquare className="w-5 h-5" />}
            label="Chat"
            isActive={activePanel === 'chat'}
            badge={activePanel !== 'chat' ? messageCount : undefined}
            onClick={() => onTogglePanel('chat')}
          />
          <ControlButton
            icon={<Users className="w-5 h-5" />}
            label="Participants"
            isActive={activePanel === 'participants'}
            badge={participantCount}
            onClick={() => onTogglePanel('participants')}
          />
        </div>

        <div className="w-px h-8 bg-white/20" />

        {/* More options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="control-btn">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuItem>
              <Grid className="w-4 h-4 mr-2" />
              Change layout
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Info className="w-4 h-4 mr-2" />
              Meeting details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-8 bg-white/20" />

        {/* End call */}
        <ControlButton
          icon={<PhoneOff className="w-5 h-5" />}
          label="Leave call"
          isDestructive
          onClick={onEndCall}
        />
      </div>
    </div>
  );
};
