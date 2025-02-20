import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../Styles/AccountHandlerStyles.css';

const Notifications = ({ currentUserUsername }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://casino-math-lab-backend.onrender.com/users/get-notifications', {
                    params: { username: currentUserUsername }
                });
                // Log the response to see what is being returned
                console.log('Notifications response:', response);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (currentUserUsername) {
            fetchNotifications();
        }
    }, [currentUserUsername]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://casino-math-lab-backend.onrender.com/users/get-notifications', {
                    params: { username: currentUserUsername }
                });
                setNotifications(response.data);

                // Mark notifications as seen after fetching
                if (response.data.length > 0) {
                    await axios.post('https://casino-math-lab-backend.onrender.com/users/mark-notifications-as-seen', null, {
                        params: { username: currentUserUsername }
                    });
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (currentUserUsername) {
            fetchNotifications();
        }
    }, [currentUserUsername]);

    const handleResponse = async (notificationId, accepted) => {
        try {
            await axios.post('https://casino-math-lab-backend.onrender.com/users/respond-to-friend-request', {
                notificationId,
                accepted,
            });
            // Remove the handled notification from the list
            setNotifications(notifications.filter((notification) => notification.id !== notificationId));
        } catch (error) {
            console.error('Error responding to friend request:', error);
        }
    };

    return (
        <div className="notifications-page">
            <h1>Notifications</h1>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div key={notification.id} className="notification">
                        <p>{notification.sender.username} wants to be your friend.</p>
                        <button onClick={() => handleResponse(notification.id, true)}>Accept</button>
                        <button onClick={() => handleResponse(notification.id, false)}>Reject</button>
                    </div>
                ))
            ) : (
                <p>No new notifications.</p>
            )}
        </div>
    );
};

export default Notifications;