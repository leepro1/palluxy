import React from 'react';

const ChatInput = ({ onSend, text, setText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full border-t border-gray-300 bg-pal-purple p-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-white-700 mr-4 flex-1 rounded p-2"
        placeholder="메시지를 작성해보세요."
      />
      <button
        type="submit"
        className="border-white-700 w-20 rounded border p-2 text-white"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
