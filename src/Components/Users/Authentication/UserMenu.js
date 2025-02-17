import React, { useState, useRef, useEffect } from "react";
import "../../../Styles/AuthenticationStyles.css";
import { Link } from "react-router-dom";
import axios from "axios";

const UserMenu = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0); // State for notification count
    const menuRef = useRef(null);

    // Fetch notification count when the component mounts
    useEffect(() => {
        if (user?.username) { // Safe check for user and username
            const fetchNotificationCount = async () => {
                try {
                    const token = localStorage.getItem("authToken"); // Get the token from localStorage
                    if (!token) {
                        console.error('No token found');
                        return;
                    }
                    const response = await axios.get('http://localhost:8080/users/get-notifications', {
                        params: { username: user.username },
                        headers: {
                            'Authorization': `Bearer ${token}` // Add the token in the Authorization header
                        }
                    });
                    setNotificationCount(response.data.length); // Set the count of notifications
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            };

            fetchNotificationCount();
        }
    }, [user]); // Only run the effect if user is not null and has a username


    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-menu" ref={menuRef}>
            <button
                className="btn btn-theme border-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on click
            >
                <img src={user.avatar} alt={user.username} style={{width:"50px", height:"50px", borderRadius:"50%"}} />
                <p className="text-muted">{user.username}</p>
            </button>
            {isMenuOpen && (
                <div className="menu-dropdown">
                    <ul>
                        <li>
                            <Link to="/account-settings">Account Settings</Link> {/* Link to Account Settings */}
                        </li>
                        <li>
                            <Link to={`/profile/${user.username}`}>Profile</Link> {/* Link to Profile */}
                        </li>
                        <li>
                            <Link to="/notifications">
                                Notifications {/* Link to Notifications Page */}
                                {notificationCount > 0 && ( // Show badge if there are notifications
                                    <span className="notification-badge">{notificationCount}</span>
                                )}
                            </Link>
                        </li>
                        <li onClick={onLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
