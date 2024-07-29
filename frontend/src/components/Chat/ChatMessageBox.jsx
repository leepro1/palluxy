import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatMessageBox = ({
  messages,
  scrollRef,
  myUserName,
  onSend,
  text,
  setText,
}) => {
  return (
    <div className="flex h-full w-full flex-col border border-gray-300 bg-white p-2">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, idx) => (
          <ChatMessage
            key={idx}
            content={message.content}
            userId={message.sender}
            createdAt={new Date(message.timestamp).toLocaleTimeString()}
            isOwnMessage={message.sender === myUserName}
          />
        ))}
        <div ref={scrollRef} />
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
