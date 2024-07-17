import { useState } from 'react';

const ChatBox = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div
      className={`flex h-full flex-col border-l border-gray-300 bg-white shadow-lg ${className}`}
    >
      <div className="border-b border-gray-300 bg-gray-100 p-2">
        <p className="text-lg">채팅창</p>
      </div>
      <div className="flex-grow overflow-y-auto p-2">
        {messages.map((message, index) => (
          <p
            key={index}
            className="mb-1"
          >
            {message}
          </p>
        ))}
      </div>
      <div className="flex border-t border-gray-300 p-2">
        <input
          type="text"
          className="w-8/12 flex-grow rounded border border-gray-300 p-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSend}
          className="ml-2 rounded bg-blue-500 p-1 text-white"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
