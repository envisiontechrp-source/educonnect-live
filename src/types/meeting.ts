export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isSpeaking: boolean;
  isHandRaised: boolean;
  isHost: boolean;
}

export interface ChatMessage {
  id: string;
  participantId: string;
  participantName: string;
  content: string;
  timestamp: Date;
}

export interface Caption {
  id: string;
  participantId: string;
  participantName: string;
  text: string;
  timestamp: Date;
  isFinal: boolean;
}

export interface MeetingState {
  meetingId: string;
  meetingCode: string;
  title: string;
  participants: Participant[];
  messages: ChatMessage[];
  captions: Caption[];
  isRecording: boolean;
  startTime: Date;
}

export type PanelType = 'chat' | 'participants' | null;
