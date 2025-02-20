import React, { useState } from "react";
import axios from "axios";
import "../../../Styles/AuthenticationStyles.css";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";

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

const Register = ({ language, languageData, onRegister }) => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        avatar: Avatar1, // Default avatar
    });
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        specialChar: false,
        capitalLetter: false,
    });
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false); // State for avatar modal
    const navigate = useNavigate();

    const [selectedAvatar, setSelectedAvatar] = useState(Avatar1); // Default selected avatar

    // Array of all 15 avatars
    const avatars = [
        Avatar1, Avatar2, Avatar3, Avatar4, Avatar5,
        Avatar6, Avatar7, Avatar8, Avatar9, Avatar10,
        Avatar11, Avatar12, Avatar13, Avatar14, Avatar15, NoAvatar,
    ];

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        setUserData({ ...userData, avatar });
        setShowAvatarModal(false); // Close modal after selection
    };

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const capitalLetter = /[A-Z]/.test(password);
        setPasswordCriteria({ minLength, specialChar, capitalLetter });
        return minLength && specialChar && capitalLetter;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword(userData.password)) {
            setError("Password does not meet the requirements.");
            return;
        }
        try {
            const response = await axios.post("https://casino-math-lab-backend.onrender.com/users/register", userData);
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                onRegister(response.data);
                setShowSuccessModal(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (name === "password") {
            validatePassword(value);
        }
    };

    const texts = languageData[language].register;

    return (
        <div id="main-wrapper" className="container">
            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    message="Registered successfully!"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

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

            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">{texts.title}</h3>
                                        </div>
                                        <h6 className="h5 mb-0">{texts.welcome}</h6>
                                        <p className="text-muted mt-2 mb-5">{texts.description}</p>
                                        {error && <p className="text-danger">{error}</p>}
                                        <form onSubmit={handleRegister}>
                                            <div className="form-group">
                                                <label htmlFor="username">{texts.username}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    name="username"
                                                    value={userData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">{texts.password}</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    value={userData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="passwordCriteria mt-2">
                                                    <p style={{color: passwordCriteria.minLength ? "green" : "red"}}>
                                                        {texts.minLength} {passwordCriteria.minLength ? "✔️" : "❌"}
                                                    </p>
                                                    <p style={{color: passwordCriteria.specialChar ? "green" : "red"}}>
                                                        {texts.specialChar} {passwordCriteria.specialChar ? "✔️" : "❌"}
                                                    </p>
                                                    <p style={{color: passwordCriteria.capitalLetter ? "green" : "red"}}>
                                                        {texts.capitalLetter} {passwordCriteria.capitalLetter ? "✔️" : "❌"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">{texts.email}</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstName">{texts.firstName}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={userData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName">{texts.lastName}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={userData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phoneNumber">{texts.phoneNumber}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={userData.phoneNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Choose Avatar</label>
                                                <div className="text-center">
                                                    <img
                                                        src={selectedAvatar}
                                                        className="avatar img-circle img-thumbnail mb-3"
                                                        alt="avatar"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => setShowAvatarModal(true)}
                                                    >
                                                        Pick an Avatar
                                                    </button>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-theme">
                                                {texts.title}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">This beautiful theme yours!</h4>
                                            <p className="lead text-white">
                                                {texts.moto}
                                            </p>
                                            <p>- Admin User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-muted text-center mt-3 mb-0">
                        {texts.alreadyHaveAccount}{" "}
                        <a href="/Login" className="text-primary ml-1">
                            {texts.login}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;