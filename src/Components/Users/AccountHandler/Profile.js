import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NoAvatar from '../../../Media/images/Avatars/NoAvatar.png';
import FriendsList from '../Friends/FriendsList';
import "../../../Styles/Profile.css"; // Add CSS for styling

const Profile = ({ language, currentUserUsername }) => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");
    const [friendRequestSent, setFriendRequestSent] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/get-profile?username=${username}`);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchFriendRequestStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/check-friend-request?senderUsername=${currentUserUsername}&receiverUsername=${username}`);
                setFriendRequestSent(response.data.exists);
            } catch (error) {
                console.error('Error fetching friend request status:', error);
            }
        };

        fetchUserProfile();
        fetchFriendRequestStatus();
    }, [username, currentUserUsername]);

    const handleAddFriend = async () => {
        try {
            const response = await axios.post('http://localhost:8080/users/send-friend-request', {
                senderUsername: currentUserUsername,
                receiverUsername: username,
            });
            if (response.status === 200) {
                setFriendRequestSent(!friendRequestSent);
                alert(response.data);
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert(error.response?.data || 'An error occurred. Please try again.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!user) return <div className="error">User not found.</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src={user.avatar || NoAvatar} className="avatar" alt="avatar" />
                <h1>{user.username}</h1>
                <div className="buttons">
                    <button className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>
                        Details
                    </button>
                    <button className={activeTab === "friends" ? "active" : ""} onClick={() => setActiveTab("friends")}>
                        Friends
                    </button>
                </div>
                {username !== currentUserUsername && (
                    <button className={friendRequestSent ? "friend-btn sent" : "friend-btn"} onClick={handleAddFriend}>
                        {friendRequestSent ? 'Request Sent' : 'Add Friend'}
                    </button>
                )}
            </div>
            {activeTab === "details" ? (
                <div className="profile-details">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phoneNumber}</p>
                    <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p><strong>Balance:</strong> ${user.balance !== undefined ? user.balance : "0"}</p>
                </div>
            ) : (
                <FriendsList username={username} />
            )}
        </div>
    );
};

export default Profile;