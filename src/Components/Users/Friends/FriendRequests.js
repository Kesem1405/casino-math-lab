import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = ({ username }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/get-friend-requests?username=${username}`);
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        fetchFriendRequests();
    }, [username]);

    const handleResponse = async (requestId, accepted) => {
        try {
            await axios.post('http://localhost:8080/users/respond-to-friend-request', {
                requestId,
                accepted
            });
            setRequests(requests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error responding to friend request:', error);
        }
    };

    return (
        <div>
            <h3>Friend Requests</h3>
            {requests.map(request => (
                <div key={request.id}>
                    <p>{request.sender.username} wants to be your friend</p>
                    <button onClick={() => handleResponse(request.id, true)}>Accept</button>
                    <button onClick={() => handleResponse(request.id, false)}>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;