import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendsList = ({ username, render }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('https://casino-math-lab-backend.onrender.com/users/get-friends', {
                    params: { username: username }
                });
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, [username]);

    if (loading) {
        return <div>Loading friends...</div>;
    }

    return (
        <div>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div key={friend.id}>
                        {render ? render(friend) : (
                            <div style={{ marginBottom: '10px' }}>
                                <img src={friend.avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <span>{friend.username}</span>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendsList;