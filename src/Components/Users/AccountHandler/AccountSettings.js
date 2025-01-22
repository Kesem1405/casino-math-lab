import React, { useState } from 'react';
import axios from 'axios';

const AccountSettings = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: user.id, // Include the user ID
        username: user.username,
        password: '',
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        // Validate form data
        const validationErrors = {};
        if (formData.password && formData.password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters long.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            validationErrors.email = 'Invalid email address.';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/update-profile', formData);
            if (response.status === 200) {
                setIsEditing(false);
                setErrors({});
                alert('Profile updated successfully!');

                // Update the parent state with the new user data
                if (onUpdate) {
                    onUpdate(response.data); // Pass the updated user data to the parent
                }
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); // Display backend error message
            } else {
                alert('Failed to update profile. Please try again.');
            }
        }
    };

    return (
        <div className="account-settings">
            <h2>Account Settings</h2>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter new password"
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="buttons">
                {!isEditing ? (
                    <button onClick={handleEdit}>Edit</button>
                ) : (
                    <button onClick={handleSave}>Save</button>
                )}
            </div>
        </div>
    );
};

export default AccountSettings;