import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/AccountHandlerStyles.css';
// Import all 15 avatars
import Avatar1 from "../../../Media/images/Avatars/Avatar1.png";
import Avatar2 from "../../../Media/images/Avatars/Avatar2.png";
import Avatar3 from "../../../Media/images/Avatars/Avatar3.png";
import Avatar4 from "../../../Media/images/Avatars/Avatar4.png";
import Avatar5 from "../../../Media/images/Avatars/Avatar5.png";
import Avatar6 from "../../../Media/images/Avatars/Avatar6.png";
import Avatar7 from "../../../Media/images/Avatars/Avatar7.png";
import Avatar8 from "../../../Media/images/Avatars/Avatar8.png";
import Avatar9 from "../../../Media/images/Avatars/Avatar9.png";
import Avatar10 from "../../../Media/images/Avatars/Avatar10.png";
import Avatar11 from "../../../Media/images/Avatars/Avatar11.png";
import Avatar12 from "../../../Media/images/Avatars/Avatar12.png";
import Avatar13 from "../../../Media/images/Avatars/Avatar13.png";
import Avatar14 from "../../../Media/images/Avatars/Avatar14.png";
import Avatar15 from "../../../Media/images/Avatars/Avatar15.png";
import NoAvatar from "../../../Media/images/Avatars/NoAvatar.png";

const AccountSettings = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: user.id,
        username: user.username,
        password: user.password || '********',
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar || Avatar1, // Default avatar
    });
    const [showPassword, setShowPassword] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || Avatar1);
    const [showAvatarModal, setShowAvatarModal] = useState(false); // State for avatar modal

    const avatars = [
        Avatar1, Avatar2, Avatar3, Avatar4, Avatar5,
        Avatar6, Avatar7, Avatar8, Avatar9, Avatar10,
        Avatar11, Avatar12, Avatar13, Avatar14, Avatar15, NoAvatar
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8080/users/update-profile', formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                alert('Profile updated successfully!');
                setIsEditing(false);
                if (onUpdate) {
                    onUpdate(response.data); // response.data should be a UserDTO
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.response?.data.error || 'An error occurred. Please try again.');
        }
    };
    const handleAvatarSelect = async (avatar) => {
        try {
            const response = await axios.post('http://localhost:8080/users/update-avatar', {
                username: user.username, // Ensure this is not null
                avatar: avatar, // Ensure this is not null
            }, {
                headers: { 'Content-Type': 'application/json' }, // Set the content type
            });

            if (response.status === 200) {
                setSelectedAvatar(avatar);
                setFormData({ ...formData, avatar });
                setShowAvatarModal(false);
                alert('Avatar updated successfully!');
            }
        } catch (error) {
            console.error('Error updating avatar:', error);
            alert('Failed to update avatar. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container bootstrap snippets bootdey">
            <h1 className="text-primary">Edit Profile</h1>
            <hr />
            <div className="row">
                <div className="col-md-3">
                    <div className="text-center">
                        <img
                            src={selectedAvatar}
                            className="avatar img-circle img-thumbnail"
                            alt="avatar"
                        />
                        <button
                            className="btn btn-primary mt-3"
                            disabled={!isEditing}
                            onClick={() => setShowAvatarModal(true)}
                        >
                            Choose Avatar
                        </button>
                    </div>
                </div>
                <div className="col-md-9 personal-info">
                    <h3>Personal info</h3>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Email:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Phone Number:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Username:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Password:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <small>
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={togglePasswordVisibility}
                                    />{' '}
                                    Show Password
                                </small>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 text-center">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleSave}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={handleEdit}
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Avatar Selection Modal */}
            {showAvatarModal && (
                <div className="modal-backdrop">
                    <div className="avatar-modal">
                        <div className="modal-header">
                            <h5>Choose Your Avatar</h5>
                            <button
                                className="close-btn"
                                onClick={() => setShowAvatarModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="avatar-grid">
                                {avatars.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        className={`avatar-option ${selectedAvatar === avatar ? "selected" : ""}`}
                                        onClick={() => handleAvatarSelect(avatar)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountSettings;