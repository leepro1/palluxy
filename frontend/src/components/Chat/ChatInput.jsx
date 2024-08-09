import React from 'react';

const ChatInput = ({ onSend, text, setText }) => {
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
        className="border-white-700 mr-4 w-3/4 resize-none overflow-auto rounded p-2"
        placeholder="메시지를 작성해보세요."
      />
      <button
        type="submit"
        className="border-white-700 w-1/4 rounded border p-2 text-xs text-white sm:text-xs md:text-lg"
      >
        전송
      </button>
    </form>
  );
};

export default ChatInput;
