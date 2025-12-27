import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { ChatMessage } from '@/types/meeting';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatPanelProps {
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (content: string) => void;
}

export const ChatPanel = ({ messages, onClose, onSendMessage }: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">In-call messages</h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground text-sm">
              Messages can only be seen by people in the call and are deleted when the call ends.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "animate-fade-in",
                message.participantId === '1' && "ml-8"
              )}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className={cn(
                  "text-sm font-medium",
                  message.participantId === '1' ? "text-primary" : "text-foreground"
                )}>
                  {message.participantName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(message.timestamp, 'h:mm a')}
                </span>
              </div>
              <p className={cn(
                "text-sm rounded-lg px-3 py-2 inline-block",
                message.participantId === '1' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground"
              )}>
                {message.content}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message to everyone"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              inputValue.trim() 
                ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
                : "bg-transparent text-muted-foreground"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
