import React, { useState } from 'react';

const Bot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage = userInput.trim();
    setUserInput(''); // Clear input field
    
    if (!userMessage) return;

    try {
      setIsLoading(true);
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: 'user', message: userMessage },
        { type: 'bot', message: botMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <h1 className="text-center text-xl font-semibold mb-4">Chatbot Assistant</h1>
        <div className="h-48 overflow-y-scroll mb-4" id="chat-history">
          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={`${
                entry.type === 'user' ? 'text-right bg-gray-200' : 'text-left bg-green-100'
              } p-2 rounded-md mb-2`}
            >
              {entry.message}
            </div>
          ))}
        </div>
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            type="text"
            className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter your message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="loader">
          <img src="loader.gif" width="150px" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default Bot;
