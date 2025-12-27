import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const JoinScreen = () => {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [userName, setUserName] = useState('');

  const handleJoin = () => {
    if (meetingCode.trim() || true) { // Allow joining without code for demo
      navigate('/meeting');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Video preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Video preview container */}
          <div className="relative aspect-video bg-video-bg rounded-2xl overflow-hidden shadow-elevation-3">
            {/* Simulated video preview */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isCameraOff ? (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">
                    {userName ? userName[0].toUpperCase() : 'Y'}
                  </span>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">
                    {userName ? userName[0].toUpperCase() : 'Y'}
                  </span>
                </div>
              )}
            </div>

            {/* Preview controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                  isMuted 
                    ? "bg-destructive text-white" 
                    : "bg-surface/90 text-foreground hover:bg-surface"
                )}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                  isCameraOff 
                    ? "bg-destructive text-white" 
                    : "bg-surface/90 text-foreground hover:bg-surface"
                )}
              >
                {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 text-foreground hover:bg-surface transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Camera/mic status */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isMuted && isCameraOff 
              ? 'Microphone and camera are off'
              : isMuted 
              ? 'Microphone is off'
              : isCameraOff 
              ? 'Camera is off'
              : 'Ready to join'
            }
          </p>
        </div>
      </div>

      {/* Right side - Join form */}
      <div className="w-[420px] flex items-center justify-center p-8 border-l border-border bg-surface">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Ready to join?
            </h1>
            <p className="text-muted-foreground">
              Enter a meeting code or start a new meeting
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Your name
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Meeting code (optional)
              </label>
              <Input
                type="text"
                placeholder="abc-defg-hij"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                className="h-12 font-mono tracking-wide"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleJoin}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              Join now
            </Button>
            <Button 
              variant="outline"
              onClick={handleJoin}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              Start a new meeting
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By joining, you agree to the terms of service.
            <br />
            This is a demo application for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
