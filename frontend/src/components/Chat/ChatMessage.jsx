import React from 'react';

const ChatMessage = ({ content, userId, createdAt, isOwnMessage }) => {
  return (
    <div
      className={`mb-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-full break-words rounded-lg p-2 ${
          isOwnMessage ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
        }`}
      >
        <p className="text-xs">{userId}</p>
        <p className="text-sm">{content}</p>
        <p className="mt-1 text-right text-xs">{createdAt}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
