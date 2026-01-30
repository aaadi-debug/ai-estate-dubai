// frontend/components/chat/ChatWidget.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const conversationSteps = {
    greeting: {
        bot: "👋 Hi! I help people find great properties in Dubai and arrange viewings fast.\n\nAre you looking to",
        options: [
            "Buy for myself / family",
            "Invest (rental or resale)",
            "Just browsing for now"
        ]
    },
    budget: {
        bot: "To show you the most relevant options quickly — what's your approximate budget in AED?",
        options: [
            "Under 1M",
            "1M – 3M",
            "3M – 5M",
            "5M – 10M",
            "10M+",
            "Not sure yet"
        ]
    },
    locationPrefs: {
        bot: "Which areas in Dubai are you most interested in?\n(You can write multiple — separate with commas)",
    },
    valueProposition: {
        bot: "Perfect, based on what you've shared I can:\n\n• Send matching properties right now\n• Arrange private viewings\n• Book a quick call or WhatsApp with an agent\n\nHow would you like to proceed?",
        options: [
            "Send properties on WhatsApp",
            "Book a call / viewing",
            "Email some options",
            "Just keep chatting here for now"
        ]
    },
    contactMethod: {
        bot: "Great! What's the best way to reach you?",
        options: [
            "WhatsApp",
            "Phone call",
            "Email",
            "Continue chatting here"
        ]
    },
    whatsappNumber: {
        bot: "Awesome — what's your WhatsApp number? (include country code, e.g. +971 50 ...)",
    },
    phoneNumber: {
        bot: "Got it. What's the best number to call you on? (include country code)",
    },
    email: {
        bot: "No problem — what's your email address?",
    },
    name: {
        bot: "One last thing — your good name? 😊",
        // no options → free text
    },
    confirm: {
        bot: "Thank you! 🎉 I've noted your preferences.\nOne of our team will reach out very soon via your chosen method.\n\nHave a great day!",
        isFinal: true
    }
};

const stepOrder = [
    'greeting',
    'budget',
    'locationPrefs',
    'valueProposition',
    'contactMethod',
    'whatsappNumber',
    'phoneNumber',
    'email',
    'name',
    'confirm'
];

export function ChatWidget({ agentId, mode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentStepKey, setCurrentStepKey] = useState('greeting');
    const [leadData, setLeadData] = useState({});
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const sessionIdRef = useRef(null);

    if (!agentId) {
        console.error('Missing agentId in ChatWidget');
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!sessionIdRef.current) {
            sessionIdRef.current = uuidv4();
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Start with greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            triggerBotMessage(conversationSteps.greeting.bot, conversationSteps.greeting.options);
        }
    }, [isOpen]);

    const triggerBotMessage = (text, options = null, isFinal = false) => {
        setIsTyping(true);
        setTimeout(() => {
            // Replace placeholder with actual name if available
            let formattedText = text;
            if (text.includes('{{name}}')) {
                formattedText = text.replace('{{name}}', leadData.name || 'you');
            }
            setMessages(prev => [...prev, { text: formattedText, isBot: true, options }]);
            setIsTyping(false);

            // if (isFinal) {
            //     setTimeout(() => {
            //         sendLeadToBackend({ ...leadData });
            //     }, 1200);
            // }
        }, 700 + Math.random() * 900);
    };

    const getNextStepKey = (currentKey, userResponse = '') => {
        console.log(`[STEP] Current: ${currentKey} | User said: "${userResponse}"`);
        const lower = userResponse.toLowerCase();

        if (currentKey === 'greeting') return 'budget';
        if (currentKey === 'budget') return 'locationPrefs';
        if (currentKey === 'locationPrefs') return 'valueProposition';

        if (currentKey === 'valueProposition') {
            if (lower.includes('whatsapp')) return 'whatsappNumber';
            if (lower.includes('call') || lower.includes('viewing')) return 'phoneNumber';
            if (lower.includes('email')) return 'email';
            if (lower.includes('chat') || lower.includes('chatting')) return 'confirm';
            return 'contactMethod'; // fallback
        }

        if (currentKey === 'contactMethod') {
            if (lower.includes('whatsapp')) return 'whatsappNumber';
            if (lower.includes('call') || lower.includes('phone')) return 'phoneNumber';
            if (lower.includes('email')) return 'email';
            return 'confirm';
        }

        // After collecting contact → confirm
        if (['whatsappNumber', 'phoneNumber', 'email'].includes(currentKey)) {
            return 'name';
        }

        if (currentKey === 'name') {
            return 'confirm';
        }

        return 'confirm';
    };

    const saveUserResponse = (stepKey, text) => {
        let update = {};

        if (stepKey === 'greeting') {
            update.intent = text;
        } else if (stepKey === 'budget') {
            update.budget = text;
        } else if (stepKey === 'locationPrefs') {
            const areas = text
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            update.locationPrefs = areas;
        } else if (stepKey === 'valueProposition') {
            update.preferredAction = text;
        } else if (stepKey === 'whatsappNumber') {
            const clean = text.trim().replace(/\s+/g, '');
            update.whatsappNumber = clean;
            update.phone = clean; // for backward compat
        } else if (stepKey === 'phoneNumber') {
            update.phone = text.trim().replace(/\s+/g, '');
        } else if (stepKey === 'email') {
            update.email = text.trim().toLowerCase();
        } else if (stepKey === 'name') {
            const cleanName = text.trim();
            update.name = cleanName;
            // Optional: you can store first name only if you want
            // update.firstName = cleanName.split(' ')[0];
        }

        if (Object.keys(update).length > 0) {
            setLeadData(prev => ({ ...prev, ...update }));
        }
    };

    const handleSend = (text = inputValue.trim()) => {
        if (!text) return;

        // Show user message
        setMessages(prev => [...prev, { text, isBot: false }]);
        setInputValue('');

        // Save answer
        // saveUserResponse(currentStepKey, text);
        // Save answer
        setLeadData(prev => {
            const update = {};

            // ── all your save logic here (same as before) ──
            if (currentStepKey === 'greeting') {
                update.intent = text;
            } else if (currentStepKey === 'budget') {
                update.budget = text;
            } else if (currentStepKey === 'locationPrefs') {
                const areas = text.split(',').map(s => s.trim()).filter(Boolean);
                update.locationPrefs = areas;
            } else if (currentStepKey === 'valueProposition') {
                update.preferredAction = text;
            } else if (currentStepKey === 'whatsappNumber') {
                const clean = text.trim().replace(/\s+/g, '');
                update.whatsappNumber = clean;
                update.phone = clean;
            } else if (currentStepKey === 'phoneNumber') {
                update.phone = text.trim().replace(/\s+/g, '');
            } else if (currentStepKey === 'email') {
                update.email = text.trim().toLowerCase();
            } else if (currentStepKey === 'name') {
                update.name = text.trim();
            }

            const newData = { ...prev, ...update };

            // ── If we just saved the name → send lead immediately after update ──
            if (currentStepKey === 'name') {
                // We use setTimeout(0) so the state has time to settle
                setTimeout(() => {
                    sendLeadToBackend(newData);
                }, 0);
            }

            return newData;
        });

        // Decide next step
        const nextKey = getNextStepKey(currentStepKey, text);
        const nextStep = conversationSteps[nextKey];

        if (nextStep) {
            triggerBotMessage(
                nextStep.bot,
                nextStep.options || null,
                nextStep.isFinal || false
            );
            setCurrentStepKey(nextKey);
        }
    };

    const handleOptionClick = (option) => {
        handleSend(option);
    };

    const sendLeadToBackend = async (data) => {
        console.log('Sending lead:', { ...data, agentId });
        console.log('Full payload being sent:', JSON.stringify({ ...data, agentId }, null, 2));

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/new`,
                { ...data, agentId }
            );
            console.log('Lead saved:', response.data);
        } catch (err) {
            // console.error('Lead save failed:', err.response?.data || err.message);
            console.error('Lead save failed:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            // Optional: show error in chat
            setMessages(prev => [
                ...prev,
                { text: "Sorry, there was an issue saving your info. Our team will still reach out soon.", isBot: true, isError: true }
            ]);
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
                                <h3 className="font-semibold">Dubai Property Assistant</h3>
                                <p className="text-xs opacity-90">Usually replies instantly</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50">
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
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <div className="flex space-x-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span>Typing...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
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