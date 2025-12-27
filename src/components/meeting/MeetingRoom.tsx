import { useNavigate } from 'react-router-dom';
import { useMeetingState } from '@/hooks/useMeetingState';
import { MeetingHeader } from './MeetingHeader';
import { VideoGrid } from './VideoGrid';
import { ControlBar } from './ControlBar';
import { SidePanel } from './SidePanel';
import { CaptionsOverlay } from './CaptionsOverlay';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export const MeetingRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    meetingCode,
    meetingTitle,
    participants,
    messages,
    captions,
    activePanel,
    isMuted,
    isCameraOff,
    isScreenSharing,
    isCaptionsOn,
    isHandRaised,
    captionSize,
    setCaptionSize,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleCaptions,
    toggleHandRaise,
    togglePanel,
    sendMessage,
  } = useMeetingState();

  const handleEndCall = () => {
    toast({
      title: "Call ended",
      description: "You have left the meeting.",
    });
    navigate('/');
  };

  // Show toast for captions toggle
  useEffect(() => {
    if (isCaptionsOn) {
      toast({
        title: "Captions enabled",
        description: "Live captions are now visible.",
      });
    }
  }, [isCaptionsOn]);

  return (
    <div className="relative flex flex-col h-screen bg-video-bg overflow-hidden">
      {/* Header */}
      <MeetingHeader title={meetingTitle} meetingCode={meetingCode} />

      {/* Main video area */}
      <VideoGrid 
        participants={participants} 
        isPanelOpen={activePanel !== null}
      />

      {/* Captions overlay */}
      <CaptionsOverlay
        captions={captions}
        isVisible={isCaptionsOn}
        captionSize={captionSize}
        onSizeChange={setCaptionSize}
      />

      {/* Control bar */}
      <ControlBar
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        isScreenSharing={isScreenSharing}
        isCaptionsOn={isCaptionsOn}
        isHandRaised={isHandRaised}
        activePanel={activePanel}
        participantCount={participants.length}
        messageCount={messages.length}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onToggleScreenShare={toggleScreenShare}
        onToggleCaptions={toggleCaptions}
        onToggleHandRaise={toggleHandRaise}
        onTogglePanel={togglePanel}
        onEndCall={handleEndCall}
      />

      {/* Side panel */}
      <SidePanel
        activePanel={activePanel}
        participants={participants}
        messages={messages}
        onClose={() => togglePanel(null)}
        onSendMessage={sendMessage}
      />
    </div>
  );
};
