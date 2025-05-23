"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const userMessagesEndRef = useRef<HTMLDivElement>(null);
  const aiMessagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    userMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    aiMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.message }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, there was an error processing your request." },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white/90 rounded-2xl shadow-2xl flex flex-col h-[75vh] border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 py-6 border-b drop-shadow-lg">
          AI Chat 💬
        </h1>

        {/* Chat Panels */}
        <div className="flex flex-1 overflow-y-auto divide-x border-t">
          {/* User Chat Panel */}
          <div className="w-1/2 p-4 overflow-y-auto space-y-3">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">You</h2>
            {messages
              .filter((msg) => msg.sender === "user")
              .map((msg, idx) => (
                <div key={idx} className="flex justify-start">
                  <div className="px-4 py-2 rounded-lg shadow text-sm max-w-xs break-words bg-blue-600 text-white rounded-br-none">
                    {msg.text}
                  </div>
                </div>
              ))}
            <div ref={userMessagesEndRef} />
          </div>

          {/* AI Chat Panel */}
          <div className="w-1/2 p-4 overflow-y-auto space-y-3">
            <h2 className="text-lg font-semibold text-green-700 mb-2">AI Assistant</h2>
            {messages
              .filter((msg) => msg.sender === "ai")
              .map((msg, idx) => (
                <div key={idx} className="flex justify-start">
                  <div className="px-4 py-2 rounded-lg shadow text-sm max-w-xs break-words bg-green-100 text-gray-800 rounded-bl-none">
                    {msg.text}
                  </div>
                </div>
              ))}
            <div ref={aiMessagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t flex gap-2 bg-white rounded-b-2xl"
        >
          <input
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base shadow"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-xl transition text-base"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
