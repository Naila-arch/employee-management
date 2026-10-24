
"use client";

import { useState } from "react";
import supabase from "./app/supabaseClient";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password,
                });

            if (error) {
                alert("Login failed: " + error.message);
                return;
            }

            if (!data.session?.access_token) {
                alert("Login session nahi mila. Dobara login karo.");
                return;
            }

            localStorage.setItem("isLoggedIn", "true");

            if (typeof onLogin === "function") {
                await onLogin();
            }
        } catch (error) {
            console.error("Login error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
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

                    <h4 className="text-center mb-4">Login</h4>

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
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
