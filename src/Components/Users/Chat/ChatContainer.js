import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import '../../../Styles/Chat.css';

const ChatContainer = ({ senderUsername, isMenuOpen }) => {
    const [selectedFriend, setSelectedFriend] = useState(null);

    return (
        <div className="chat-container">
            <ChatButton
                senderUsername={senderUsername}
                isMenuOpen={isMenuOpen}
                onSelectFriend={setSelectedFriend}
            />
            {selectedFriend && (
                <ChatWindow
                    senderUsername={senderUsername}
                    receiverUsername={selectedFriend}
                    onClose={() => setSelectedFriend(null)}
                />
            )}
        </div>
    );
};

export default ChatContainer;