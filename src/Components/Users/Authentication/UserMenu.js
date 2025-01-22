import React, { useState, useRef, useEffect } from "react";
import "../../../Styles/AuthenticationStyles.css";
import { Link } from "react-router-dom";

const UserMenu = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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
                className="btn btn-theme"
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on click
            >
                {user.username}
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
                        <li onClick={onLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;