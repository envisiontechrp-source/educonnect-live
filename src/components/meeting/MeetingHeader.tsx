import { Copy, Check, Shield } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MeetingHeaderProps {
  title: string;
  meetingCode: string;
}

export const MeetingHeader = ({ title, meetingCode }: MeetingHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(meetingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center py-4 px-6">
      <div className="flex items-center gap-4 bg-surface/90 backdrop-blur-md rounded-full px-5 py-2.5 shadow-elevation-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        
        <div className="w-px h-4 bg-border" />
        
        <button
          onClick={copyCode}
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
          )}
        >
          <span className="font-mono tracking-wide">{meetingCode}</span>
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
};
