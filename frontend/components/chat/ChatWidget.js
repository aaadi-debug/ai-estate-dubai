'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import axios from 'axios';

const conversationSteps = [
    { key: 'greeting', bot: 'Hello! 👋 I\'m your AI assistant from AI Estate Dubai. You are looking for a property in Dubai. May I know your good name?' },
    { key: 'name', bot: 'Great! May I know your name please?' },
    { key: 'phone', bot: 'Thanks {{name}}! What\'s the best phone number to reach you?' },
    { key: 'email', bot: 'Perfect. And your email address?' },
    { key: 'budget', bot: 'What is your budget range? (e.g., AED 1M - 2M)' },
    { key: 'propertyType', bot: 'What type of property are you interested in?', options: ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Plot'] },
    { key: 'location', bot: 'Which areas in Dubai are you considering? (e.g., Downtown, Palm Jumeirah, JVC)' },
    { key: 'datetime', bot: 'When would you like to schedule a viewing or call?' },
    { key: 'confirm', bot: 'Thank you! I\'ve captured all your details. An agent will contact you shortly via WhatsApp or call. Have a great day! 🌟', isFinal: true },
];

export function ChatWidget({ agentId = 'demo-agent-123' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [leadData, setLeadData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial greeting on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            triggerBotMessage(conversationSteps[0].bot);
            setCurrentStep(1);
        }
    }, [isOpen]);

    const triggerBotMessage = (text, isFinal = false) => {
        setIsTyping(true);
        setTimeout(() => {
            const formattedText = text.replace('{{name}}', leadData.name || '');
            setMessages(prev => [...prev, { text: formattedText, isBot: true }]);
            setIsTyping(false);

            // If this is the final confirmation message, auto-send lead
            if (isFinal) {
                setTimeout(() => {
                    sendLeadToBackend(leadData);
                }, 1000); // small delay so user sees the message first
            }
        }, 800 + Math.random() * 800);
    };

    const handleSend = (text = inputValue.trim()) => {
        if (!text) return;

        setMessages(prev => [...prev, { text, isBot: false }]);
        setInputValue('');

        // Save to leadData based on step
        const stepKey = conversationSteps[currentStep]?.key;
        if (stepKey && stepKey !== 'greeting' && stepKey !== 'confirm') {
            setLeadData(prev => ({ ...prev, [stepKey]: text }));
        }

        // Move to next step
        const nextStepIndex = currentStep + 1;
        if (nextStepIndex < conversationSteps.length) {
            const nextStep = conversationSteps[nextStepIndex];
            const isFinal = nextStep.isFinal || false;  // ← Add this
            triggerBotMessage(nextStep.bot, isFinal);  // ← Pass isFinal here

            if (nextStep.options) {
                // Show quick options
                setTimeout(() => {
                    setMessages(prev => [
                        ...prev,
                        { isBot: true, options: nextStep.options }
                    ]);
                }, 1200);
            }

            setCurrentStep(nextStepIndex);
        }
        // else {
        //     // Final step - send lead to backend
        //     sendLeadToBackend({ ...leadData, finalMessage: text });
        // }
    };

    const handleOptionClick = (option) => {
        const lowerCaseOption = option.toLowerCase();
        handleSend(lowerCaseOption);
    };

    const sendLeadToBackend = async (data) => {
        console.log('🚀 Attempting to send lead:', { ...data, agentId });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/new`,
                { ...data, agentId }
            );
            console.log('✅ Lead saved successfully:', response.data);
        } catch (error) {
            console.error('❌ Failed to save lead:', error.response?.data || error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            }
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition transform hover:scale-110 cursor-pointer"
            >
                {isOpen ? <Minimize2 className="w-7 h-7" /> : <Bot className="w-7 h-7" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Bot className="w-8 h-8" />
                            <div>
                                <h3 className="font-semibold">AI Estate Assistant</h3>
                                <p className="text-xs opacity-90">Typically replies in seconds</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i}>
                                {msg.text && <ChatBubble message={msg.text} isBot={msg.isBot} />}
                                {msg.options && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {msg.options.map((opt, idx) => (
                                            <Button
                                                key={idx}
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleOptionClick(opt)}
                                            >
                                                {opt}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="flex space-x-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span className="text-sm">AI is typing...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-white">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                autoFocus
                            />
                            <Button type="submit">
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}