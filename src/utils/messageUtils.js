import axios from 'axios';

export const fetchMessages = async (sender, receiver) => {
    const response = await axios.get(`https://casino-math-lab-backend.onrender.com/messages/get?sender=${sender}&receiver=${receiver}`);
    return response.data;
};

export const markMessagesAsRead = async (sender, receiver) => {
    await axios.post('https://casino-math-lab-backend.onrender.com/messages/mark-all-as-read', null, {
        params: { sender, receiver },
    });
};

export const fetchUnreadCount = async (username) => {
    const userResponse = await axios.get(`https://casino-math-lab-backend.onrender.com/users/get-profile?username=${username}`);
    const userId = userResponse.data.id;
    const response = await axios.get(`https://casino-math-lab-backend.onrender.com/messages/unread-count?userId=${userId}`);
    return response.data.unreadCount;
};