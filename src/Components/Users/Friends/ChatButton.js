import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import FriendsList from './FriendsList';
import '../../../Styles/Chat.css';

const ChatButton = ({ senderUsername, isMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    // Function to fetch the unread message count
    const fetchUnreadCount = async () => {
        try {
            // Fetch the user ID for the receiver (the user viewing the chat)
            const userResponse = await axios.get(`http://localhost:8080/users/get-profile?username=${senderUsername}`);
            const userId = userResponse.data.id;

            // Fetch the unread message count for the receiver
            const response = await axios.get(`http://localhost:8080/messages/unread-count?userId=${userId}`);
            setUnreadCount(response.data.unreadCount);
            console.log(unreadCount);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    // Fetch the unread count when the component mounts or senderUsername changes
    useEffect(() => {
        fetchUnreadCount();
    }, [senderUsername]);

    // Refetch unread count when the chat button is opened
    useEffect(() => {
        if (isOpen) {
            fetchUnreadCount();
        }
    }, [fetchUnreadCount, isOpen]);

    // Function to handle opening a chat with a friend
    const handleFriendClick = async (friendUsername) => {
        try {
            // Mark all messages as read between the sender and the selected friend
            await axios.post('http://localhost:8080/messages/mark-all-as-read', null, {
                params: { sender: senderUsername, receiver: friendUsername }
            });

            await fetchUnreadCount();
            console.log(unreadCount);
            // Set the selected friend
            setSelectedFriend(friendUsername);
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    return (
        <div className={`chat-container ${isMenuOpen ? 'menu-open' : ''}`}>
            <button className="chat-button btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
                Chat {isOpen ? '▼' : '▲'} {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
            </button>
            {isOpen && (
                <div className="chat-popup" style={{
                    display: 'flex',
                    position: 'fixed',
                    bottom: '80px',
                    left: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                    {!selectedFriend ? (
                        <div className="friends-list" style={{width: '300px', padding: '10px'}}>
                            <h5 className="font-weight-bold mb-3 text-center">Friends</h5>
                            <div className="card mask-custom">
                                <div className="card-body">
                                    <FriendsList
                                        username={senderUsername}
                                        render={(friend) => (
                                            <li
                                                key={friend.username}
                                                onClick={() => handleFriendClick(friend.username)}
                                                className="p-2 border-bottom"
                                                style={{
                                                    borderBottom: '1px solid rgba(255,255,255,.3) !important',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div className="d-flex justify-content-between link-light">
                                                    <div className="d-flex flex-row">
                                                        <img
                                                            src={friend.avatar}
                                                            alt="avatar"
                                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                            width="50" height="50"
                                                        />
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0"
                                                               style={{color: "aqua"}}>{friend.username}</p>
                                                            <p className="small text-muted">Last message...</p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1">
                                                        <p className="small text-muted mb-1">Just now</p>
                                                        {unreadCount > 0 ? (
                                                            <span
                                                                className="badge bg-danger float-end">{unreadCount}</span>
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ChatWindow senderUsername={senderUsername} receiverUsername={selectedFriend}
                                    onClose={() => setSelectedFriend(null)}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatButton;