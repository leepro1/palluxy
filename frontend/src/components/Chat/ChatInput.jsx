import PropTypes from 'prop-types';

const ChatInput = ({ onSend, text, setText, btnText = '전송' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-20 w-full bg-pal-purple p-2"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="before:border-white-700 mr-4 w-3/4 resize-none overflow-auto rounded p-2"
      />
      <button
        type="submit"
        className="border-white-700 w-1/4 rounded border p-2 text-xs text-white sm:text-xs md:text-lg"
      >
        {btnText}
      </button>
    </form>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  btnText: PropTypes.string,
};

export default ChatInput;
