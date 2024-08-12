import PropTypes from 'prop-types';

const ChatMessage = ({ content, userId, createdAt, isOwnMessage }) => {
  return (
    <div
      className={`mb-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-full break-words rounded-lg p-2 ${
          isOwnMessage
            ? 'bg-pal-purple text-white'
            : 'bg-pal-disable text-white'
        }`}
      >
        <p className="text-xs">{userId}</p>
        <p className="text-sm">{content}</p>
        <p className="mt-1 text-right text-xs">{createdAt}</p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  content: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
};

export default ChatMessage;
