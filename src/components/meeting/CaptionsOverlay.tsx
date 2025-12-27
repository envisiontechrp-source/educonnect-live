import { Caption } from '@/types/meeting';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CaptionsOverlayProps {
  captions: Caption[];
  isVisible: boolean;
  captionSize: 'small' | 'medium' | 'large';
  onSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

const sizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

export const CaptionsOverlay = ({ 
  captions, 
  isVisible, 
  captionSize, 
  onSizeChange 
}: CaptionsOverlayProps) => {
  if (!isVisible) return null;

  const recentCaptions = captions.slice(-3);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 max-w-3xl w-full px-4">
      <div className="relative">
        {/* Settings button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute -top-10 right-0 flex items-center justify-center w-8 h-8 bg-caption-bg/80 hover:bg-caption-bg rounded-full transition-colors">
              <Settings className="w-4 h-4 text-caption-text" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Caption Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSizeChange('small')}>
              <span className={cn(captionSize === 'small' && 'font-bold')}>Small text</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSizeChange('medium')}>
              <span className={cn(captionSize === 'medium' && 'font-bold')}>Medium text</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSizeChange('large')}>
              <span className={cn(captionSize === 'large' && 'font-bold')}>Large text</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Captions */}
        <div className="bg-caption-bg/90 backdrop-blur-sm rounded-lg px-4 py-3 space-y-2">
          {recentCaptions.length === 0 ? (
            <p className={cn(
              "text-center text-caption-text/60",
              sizeClasses[captionSize]
            )}>
              Listening for speech...
            </p>
          ) : (
            recentCaptions.map((caption) => (
              <div key={caption.id} className="animate-caption-fade">
                <p className={cn(
                  "text-caption-text leading-relaxed",
                  sizeClasses[captionSize]
                )}>
                  <span className="font-semibold text-primary">
                    {caption.participantName}:
                  </span>{' '}
                  {caption.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
