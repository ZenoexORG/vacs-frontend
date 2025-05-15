import React, { useEffect, useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../molecules/Input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useT } from '../../app/i18n/useT';
import IncidentsAPI from '@hooks/incidents/incidents';

export interface MessageItem {
  message: string;
  author: string;
  created_at: string;
}

export interface ChatData {
  id: number;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  vehicle_id: string;
  date: string;
  history: MessageItem[];
}

export interface ChatProps {
  isDark?: boolean;
  chatData: ChatData;
  addMessage: (incidentId: number, message: string) => void;
  onBack: () => void;
  className?: string;
}

const formatDate = (dateString: string, locale: string = 'en') => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};

export const Chat: React.FC<ChatProps> = ({
  isDark = true,
  chatData,
  addMessage,
  onBack,
  className,
}) => {
  const { t, i18n } = useT('chat');
  const [newMessage, setNewMessage] = useState<string>('');
  const [currentChatData, setCurrentChatData] = useState<ChatData>(chatData);

  useEffect(() => {
    setCurrentChatData(chatData);
  }, [chatData]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        addMessage(currentChatData.id, newMessage);
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
  };

  const closeTicket = async () => {
    try {
      const response = await IncidentsAPI.edit(chatData.id.toString(), {
        status: 'closed',
      });
      console.log('Ticket closed:', response);
    } catch (error) {
      console.error('Error closing ticket', error);
    }
  }

  const isSystemMessage = (message: string) => message === 'created';

  return (
    <div className={`flex w-full flex-col h-full rounded-xl ${isDark ? 'bg-dark-900 text-white' : 'bg-white-50 text-black-500'} ${className}`}>
      {/* Header */}
      <div className={`flex items-center p-4 border-b ${isDark ? 'border-dark-700' : 'border-white-200'}`}>
        <div className="flex items-center gap-4">
          <Button
            isDark={isDark}
            size="small"
            onClick={onBack}
          >
            <ArrowBackIcon fontSize="small" />
          </Button>

          <h2 className="text-lg font-bold">{currentChatData.vehicle_id}</h2>
        </div>

        <Button
          isDark={isDark}
          isCancel={true}
          size="small"
          className="ml-auto"
          onClick={closeTicket}
        >
          {t('close')}
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {currentChatData.history.map((item, index) => (
          <div
            key={index}
            className={`w-2/3 p-4 rounded-md ${isSystemMessage(item.message)
              ? isDark ? 'bg-dark-600 ml-0 mr-auto' : 'bg-black-50 ml-0 mr-auto'
              : isDark ? 'bg-primary-600 mr-0 ml-auto' : 'bg-blue-500 text-white mr-0 ml-auto'
              }`}
          >
            <p>
              {isSystemMessage(item.message)
                ? `${t('message')} ${formatDate(item.created_at, i18n.language)} ${t('at')} ${formatTime(item.created_at)} ${t('hours')}.`
                : item.message
              }
            </p>

            <div className="flex justify-between mt-2 text-sm text-white-50">
              <span>{isSystemMessage(item.message) ? null : item.author}</span>
              <span>{isSystemMessage(item.message) ? null : `${formatTime(item.created_at)} - ${formatDate(item.created_at)}`}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status Badge */}
      <div className="px-4 py-2">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold
          ${currentChatData.status === 'open'
            ? isDark ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'
            : isDark ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
          }`}>
          {currentChatData.status.toUpperCase()}
        </div>
        <div className={`inline-block ml-2 px-3 py-1 rounded-full text-xs font-bold
          ${currentChatData.priority === 'high'
            ? isDark ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
            : currentChatData.priority === 'medium'
              ? isDark ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'
              : isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
          }`}>
          {currentChatData.priority.toUpperCase()} PRIORITY
        </div>
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t items-center flex gap-2 ${isDark ? 'border-dark-700' : 'border-white-200'}`}>
        <div className="flex-1">
          <Input
            isDark={isDark}
            placeholder="Write message"
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full"
          />
        </div>
        <Button
          isDark={isDark}
          isSubmit={true}
          onClick={handleSendMessage}
          className="aspect-square"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};
