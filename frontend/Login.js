"use client";

import { useState } from "react";

function Login({ setLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {
            localStorage.setItem("isLoggedIn", "true");

            setLoggedIn(true);
        } else {
            alert("Invalid email or password.");
        }
    }

    return (
        <div className="container mt-5">

            <div
                className="card shadow mx-auto"
                style={{ maxWidth: "450px" }}
            >

                <div className="card-body p-4">

                    <h2 className="text-center mb-4">
                        Employee Management System
                    </h2>

                    <h4 className="text-center mb-4">
                        Login
                    </h4>

                    <form onSubmit={handleLogin}>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;