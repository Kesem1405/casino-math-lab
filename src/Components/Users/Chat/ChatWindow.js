import React, { useState, useEffect } from 'react';
import { fetchMessages, markMessagesAsRead } from '../../../utils/messageUtils';
import '../../../Styles/Chat.css';
import axios from "axios";

const ChatWindow = ({ senderUsername, receiverUsername, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchMessages(receiverUsername, senderUsername);
                setMessages(data);
                await markMessagesAsRead(receiverUsername, senderUsername);
            } catch (error) {
                console.error('Error loading messages:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [receiverUsername, senderUsername]);

    const sendMessage = async () => {
        try {
            await axios.post('https://casino-math-lab-backend.onrender.com/messages/send', {
                sender: senderUsername,
                receiver: receiverUsername,
                content: newMessage,
            });
            setNewMessage('');
            const data = await fetchMessages(senderUsername, receiverUsername);
            setMessages(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div className="chat-window card shadow-lg" style={{ width: '400px', marginLeft: '10px', borderRadius: '10px' }}>
            <div className="card-header d-flex justify-content-between align-items-center p-3 bg-primary text-white">
                <h5 className="mb-0">{receiverUsername}</h5>
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-outline-light"
                    style={{ borderRadius: '50%' }}
                >
                    X
                </button>
            </div>
            <div className="card-body p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`d-flex ${message.senderUsername === senderUsername ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                    >
                        {message.senderUsername !== senderUsername && (
                            <img
                                src={message.senderAvatar || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"}
                                alt="avatar"
                                className="rounded-circle me-2"
                                width="40"
                            />
                        )}
                        <div className={`message-box p-2 rounded ${message.senderUsername === senderUsername ? 'bg-light' : 'bg-primary text-white'}`}>
                            <p className="mb-1">{message.content}</p>
                            <small className="text-muted">
                                {new Date(message.sentAt).toLocaleTimeString()}
                            </small>
                        </div>
                        {message.senderUsername === senderUsername && (
                            <img
                                src={message.senderAvatar || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"}
                                alt="avatar"
                                className="rounded-circle ms-2"
                                width="40"
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="card-footer bg-light">
                <textarea
                    className="form-control mb-2"
                    rows="2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="btn btn-primary btn-sm float-end" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
