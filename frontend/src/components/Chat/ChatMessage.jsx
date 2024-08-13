import PropTypes from 'prop-types';

const ChatMessage = ({ content, userId, createdAt, isOwnMessage }) => {
  return (
    <div
      className={`mb-2 flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
    >
      <p className={`text-sm font-medium ${isOwnMessage ? 'mr-3' : 'ml-3'}`}>
        {userId}
      </p>
      <div
        className={`max-w-[75%] break-words rounded-t-3xl p-2 ${
          isOwnMessage
            ? 'rounded-bl-3xl bg-pal-purple text-white'
            : 'rounded-br-3xl bg-pal-disable text-white'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
      <p className={`mt-1 text-xs ${isOwnMessage ? 'mr-1' : 'ml-1'}`}>
        {createdAt}
      </p>
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
