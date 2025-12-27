import { useState, useCallback, useEffect } from 'react';
import { Participant, ChatMessage, Caption, PanelType } from '@/types/meeting';

const generateMeetingCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const segment = () => Array(3).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${segment()}-${segment()}-${segment()}`;
};

const mockParticipants: Participant[] = [
  { id: '1', name: 'You', isMuted: false, isCameraOff: false, isScreenSharing: false, isSpeaking: false, isHandRaised: false, isHost: true },
  { id: '2', name: 'Sarah Chen', isMuted: true, isCameraOff: false, isScreenSharing: false, isSpeaking: true, isHandRaised: false, isHost: false },
  { id: '3', name: 'Marcus Johnson', isMuted: false, isCameraOff: true, isScreenSharing: false, isSpeaking: false, isHandRaised: true, isHost: false },
  { id: '4', name: 'Emily Rodriguez', isMuted: false, isCameraOff: false, isScreenSharing: false, isSpeaking: false, isHandRaised: false, isHost: false },
];

export const useMeetingState = () => {
  const [meetingCode] = useState(generateMeetingCode());
  const [meetingTitle] = useState('Educational Session');
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', participantId: '2', participantName: 'Sarah Chen', content: 'Hello everyone! Ready to start?', timestamp: new Date(Date.now() - 120000) },
    { id: '2', participantId: '3', participantName: 'Marcus Johnson', content: 'Yes, looking forward to this session!', timestamp: new Date(Date.now() - 60000) },
  ]);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  
  // Local user controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [captionSize, setCaptionSize] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isMuted: !p.isMuted } : p
    ));
  }, []);

  const toggleCamera = useCallback(() => {
    setIsCameraOff(prev => !prev);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isCameraOff: !p.isCameraOff } : p
    ));
  }, []);

  const toggleScreenShare = useCallback(() => {
    setIsScreenSharing(prev => !prev);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isScreenSharing: !p.isScreenSharing } : p
    ));
  }, []);

  const toggleCaptions = useCallback(() => {
    setIsCaptionsOn(prev => !prev);
  }, []);

  const toggleHandRaise = useCallback(() => {
    setIsHandRaised(prev => !prev);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isHandRaised: !p.isHandRaised } : p
    ));
  }, []);

  const togglePanel = useCallback((panel: PanelType) => {
    setActivePanel(prev => prev === panel ? null : panel);
  }, []);

  const sendMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      participantId: '1',
      participantName: 'You',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addCaption = useCallback((text: string, participantId: string, participantName: string, isFinal: boolean = false) => {
    const newCaption: Caption = {
      id: Date.now().toString(),
      participantId,
      participantName,
      text,
      timestamp: new Date(),
      isFinal,
    };
    setCaptions(prev => {
      const filtered = prev.filter(c => c.participantId !== participantId || c.isFinal);
      return [...filtered.slice(-10), newCaption];
    });
  }, []);

  // Simulate random speaking and captions
  useEffect(() => {
    if (!isCaptionsOn) return;
    
    const samplePhrases = [
      "Let me explain this concept in more detail...",
      "That's an excellent question!",
      "As you can see from the diagram...",
      "Does everyone understand so far?",
      "Let's move on to the next topic.",
      "The key point here is...",
    ];

    const interval = setInterval(() => {
      const speakingParticipant = participants.find(p => p.id !== '1' && Math.random() > 0.5);
      if (speakingParticipant) {
        const phrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
        addCaption(phrase, speakingParticipant.id, speakingParticipant.name, true);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isCaptionsOn, participants, addCaption]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key.toLowerCase()) {
        case 'm':
          toggleMute();
          break;
        case 'c':
          toggleCamera();
          break;
        case 'l':
          toggleCaptions();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMute, toggleCamera, toggleCaptions]);

  return {
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
    addCaption,
  };
};
