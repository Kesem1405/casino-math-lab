import React, { useState } from "react";
import axios from "axios";
import "../../../Styles/AuthenticationStyles.css";
import {useNavigate} from "react-router-dom";
import SuccessModal from "./SuccessModal";

const Register = ({ language, languageData, onRegister }) => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        specialChar: false,
        capitalLetter: false,
    });
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const navigate = useNavigate();

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
            const response = await axios.post("http://localhost:8080/register", userData);
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
                                                    <p style={{ color: passwordCriteria.minLength ? "green" : "red" }}>
                                                        {texts.minLength} {passwordCriteria.minLength ? "✔️" : "❌"}
                                                    </p>
                                                    <p style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>
                                                        {texts.specialChar} {passwordCriteria.specialChar ? "✔️" : "❌"}
                                                    </p>
                                                    <p style={{ color: passwordCriteria.capitalLetter ? "green" : "red" }}>
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
                        <a href="/src/Components/Users/Authentication/Login" className="text-primary ml-1">
                            {texts.login}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Register;