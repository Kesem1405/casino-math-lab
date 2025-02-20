import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal"; // Import the SuccessModal
import "../../../Styles/AuthenticationStyles.css";

const Login = ({ language, languageData, onLogin }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://casino-math-lab-backend.onrender.com/users/login", {
                identifier,
                password,
            });
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                onLogin(response.data);
                setShowSuccessModal(true); // Show success modal
                setTimeout(() => {
                    navigate("/"); // Navigate to home after 2 seconds
                }, 2000);
            }
        } catch (error) {
            setError("Invalid username/email or password");
        }
    };

    const texts = languageData[language].login;

    return (
        <div id="main-wrapper" className="container">
            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    message="Logged in successfully!"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

            {/* Login Form */}
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
                                        <form onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <label htmlFor="username">{texts.username}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    value={identifier}
                                                    onChange={(e) => setIdentifier(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group mb-5">
                                                <label htmlFor="password">{texts.password}</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-theme">
                                                {texts.title}
                                            </button>
                                            <a href="#l" className="forgot-link float-right text-primary">
                                                {texts.forgotPassword}
                                            </a>
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
                        {texts.noAccount}{" "}
                        <a href="/src/Components/Users/Authentication/Register" className="text-primary ml-1">
                            {texts.register}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;