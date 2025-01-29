import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NoAvatar from '../../../Media/images/Avatars/NoAvatar.png';
import FriendsList from '../Friends/FriendsList'; // Import the FriendsList component

const Profile = ({ language, currentUserUsername }) => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false); // State to track friend request status

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
                setFriendRequestSent(response.data.exists); // Update state based on response
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
                setFriendRequestSent(!friendRequestSent); // Toggle the state
                alert(response.data); // Show success message
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert(error.response?.data || 'An error occurred. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div className="container bootstrap snippets bootdey">
            <h1 className="text-primary">{user.username}'s Profile</h1>
            <hr />
            <div className="row">
                <div className="col-md-3">
                    <div className="text-center">
                        <img src={user.avatar || NoAvatar} className="avatar img-circle img-thumbnail" alt="avatar" />
                    </div>
                </div>
                <div className="col-md-9 personal-info">
                    <h3>Personal info</h3>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">{user.firstName}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">{user.lastName}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Email:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">{user.email}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Phone:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">{user.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Created At:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Balance:</label>
                            <div className="col-lg-8">
                                <p className="form-control-static">${user.balance}</p>
                            </div>
                        </div>
                    </form>
                    <button onClick={() => setShowFriendsModal(true)}>Show Friends</button>

                    {/* Conditionally render the "Add Friend" button */}
                    {username !== currentUserUsername && (
                        <button
                            onClick={handleAddFriend}
                            style={{ backgroundColor: friendRequestSent ? 'green' : '' }}
                        >
                            {friendRequestSent ? 'Request Sent' : 'Add Friend'}
                        </button>
                    )}
                </div>
            </div>

            {/* Friends Modal */}
            {showFriendsModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{user.username}'s Friends</h5>
                                <button type="button" onClick={() => setShowFriendsModal(false)}>×</button>
                            </div>
                            <div className="modal-body">
                                <FriendsList username={username} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setShowFriendsModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;