
"use client";

import { useEffect, useState } from "react";
import Login from "../Login";
import AddEmployee from "../AddEmployee";
import EmployeeList from "./EmployeeList";
import supabase from "./supabaseClient";
import { getEmployees } from "../service";

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function checkSession() {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    throw error;
                }

                if (!active) return;

                if (session) {
                    setLoggedIn(true);
                    await loadEmployees();
                } else {
                    localStorage.removeItem("isLoggedIn");
                    setLoggedIn(false);
                }
            } catch (err) {
                console.error("Session check error:", err);
                if (active) {
                    setError("Login session check nahi ho saki. Dobara login karein.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!active) return;

            setLoggedIn(Boolean(session));

            if (session) {
                localStorage.setItem("isLoggedIn", "true");
            } else {
                localStorage.removeItem("isLoggedIn");
                setData([]);
            }
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, []);

    async function loadEmployees() {
        setError("");

        try {
            const employees = await getEmployees();

            if (Array.isArray(employees)) {
                setData(employees);
            } else if (Array.isArray(employees?.employees)) {
                setData(employees.employees);
            } else {
                console.error("Unexpected employees response:", employees);
                setData([]);
                setError("Employees ka data expected format mein nahi mila.");
            }
        } catch (err) {
            console.error("Employee loading error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Employees load nahi ho sake."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin() {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error || !session) {
            setError("Login session nahi mili. Dobara login karein.");
            setLoggedIn(false);
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        setLoggedIn(true);
        await loadEmployees();
    }

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            setError("Logout nahi ho saka. Dobara try karein.");
            return;
        }

        localStorage.removeItem("isLoggedIn");
        setLoggedIn(false);
        setData([]);
        setError("");
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );
    }

    if (!loggedIn) {
        return (
            <>
                {error && (
                    <div className="alert alert-danger m-3" role="alert">
                        {error}
                    </div>
                )}
                <Login onLogin={handleLogin} />
            </>
        );
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark px-4">
                <span className="navbar-brand">
                    Employee Management System
                </span>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>

            <div className="container mt-3">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
            </div>

            <AddEmployee onEmployeeAdded={loadEmployees} />

            <EmployeeList data={data} />
        </div>
    );
}
