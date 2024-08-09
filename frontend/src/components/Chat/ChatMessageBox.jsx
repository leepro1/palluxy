import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatMessageBox = ({ messages, myUserName, onSend, text, setText }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {messages.map((message, idx) => (
          <ChatMessage
            key={idx}
            content={message.content}
            userId={message.sender}
            createdAt={new Date(message.timestamp).toLocaleTimeString()}
            isOwnMessage={message.sender === myUserName}
            className="p-2"
          />
        ))}
      </div>
      <ChatInput
        onSend={onSend}
        text={text}
        setText={setText}
      />
    </div>
  );
};

export default ChatMessageBox;
