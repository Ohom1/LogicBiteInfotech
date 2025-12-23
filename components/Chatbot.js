'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Chatbot.module.css';

export default function Chatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 Welcome to LogicBite Infotech.", sender: 'bot' },
        { id: 2, text: "How can I help you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    // Hide on Admin/Login pages
    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Simulated Bot Response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "Thanks for reaching out! Our team is currently offline, but please leave your email or check our Services page.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Trigger Button */}
            <button
                className={styles.fab}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Chat"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <div className={styles.avatar}>LB</div>
                        <div>
                            <div className={styles.title}>LogicBite Support</div>
                            <div className={styles.status}>Online</div>
                        </div>
                    </div>

                    <div className={styles.messages}>
                        {messages.map(msg => (
                            <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className={styles.inputArea}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className={styles.input}
                        />
                        <button type="submit" className={styles.sendBtn}>➤</button>
                    </form>
                </div>
            )}
        </>
    );
}
