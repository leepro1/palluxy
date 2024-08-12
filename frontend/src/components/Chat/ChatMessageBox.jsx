import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from '@components/Chat/ChatMessage';
import ChatInput from '@components/Chat/ChatInput';

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

ChatMessageBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      timestamp: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    }),
  ),
  myUserName: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};

export default ChatMessageBox;
