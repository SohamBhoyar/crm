import React, { useState } from "react";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth.api";
// adjust path if needed
// import { loginApi } from "../../../api/auth.api";
const LoginForm = ({ registerPath, resetPath }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // 🔥 VERY IMPORTANT

        setError("");
        setLoading(true);

        try {
            const res = await login({
                email,
                password,
            });

            if (res.data.success) {
                // later you can store user in context / redux
                navigate("/home");
            } else {
                setError(res.data.message || "Login failed");
            }
        } catch (err) {
            const msg =
                err?.response?.data?.message || "Invalid email or password";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">
                Login to <strong>Tecnovate CRM</strong>
            </p>

            {/* 🔥 REAL LOGIN FORM */}
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                )}

                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe"
                        />
                        <label
                            className="custom-control-label c-pointer"
                            htmlFor="rememberMe"
                        >
                            Remember Me
                        </label>
                    </div>

                    <Link to={resetPath} className="fs-11 text-primary">
                        Forget password?
                    </Link>
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>

            {/* SOCIAL (UI ONLY) */}
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                    <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                        or
                    </span>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button className="btn btn-light-brand flex-fill" type="button">
                        <FiFacebook size={16} />
                    </button>
                    <button className="btn btn-light-brand flex-fill" type="button">
                        <FiTwitter size={16} />
                    </button>
                    <button className="btn btn-light-brand flex-fill" type="button">
                        <FiGithub size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-5 text-muted">
                <span>Don't have an account?</span>
                <Link to={registerPath} className="fw-bold ms-1">
                    Contact Admin
                </Link>
            </div>
        </>
    );
};

export default LoginForm;
