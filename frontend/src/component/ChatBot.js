import React, { useState, useRef } from 'react';
import { MessageCircle, Send, RefreshCw, X, Minimize2 } from 'lucide-react';
import Markdown from 'markdown-to-jsx';

const Chatbot = ({ files }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !files.length) return;

        const userMessage = inputMessage;
        setInputMessage('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('message', userMessage);
            files.forEach(file => formData.append('files', file));

            const response = await fetch('https://chatbot-ecommerce-ixsz.onrender.com/api/chat', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
            scrollToBottom();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </button>
            )}

            {isOpen && (
                <div className="w-[90%] max-w-md h-[70vh] sm:w-96 sm:h-[400px] bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                        <h3 className="font-medium text-base sm:text-lg">Chat Assistant</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-blue-600 rounded"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-blue-600 rounded"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`rounded-lg p-4 text-sm sm:text-base ${message.role === 'user'
                                    ? 'bg-blue-50 ml-8'
                                    : message.role === 'system'
                                        ? 'bg-gray-50 text-gray-600 text-sm'
                                        : 'bg-white border mr-8'
                                    }`}
                            >
                                <Markdown>{message.content}</Markdown>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Processing your request...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => {
                                    setInputMessage(e.target.value);
                                    if (e.target.value === '') {
                                        e.target.style.height = 'auto';
                                    } else {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }
                                }}
                                placeholder="Ask anything"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
                                rows={1}
                                disabled={isLoading || !files.length}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !files.length || !messages}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
