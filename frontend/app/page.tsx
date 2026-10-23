
"use client";

import { useEffect, useState } from "react";
import Login from "../Login";
import AddEmployee from "../AddEmployee";
import EmployeeList from "./EmployeeList";
import { getEmployees } from "../service";

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");

        if (loginStatus === "true") {
            setLoggedIn(true);
            loadEmployees();
        } else {
            setLoading(false);
        }
    }, []);

    async function loadEmployees() {
        try {
            const employees = await getEmployees();
            setData(employees);
        } catch (error) {
            console.log("Employee loading error:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleLogin() {
        localStorage.setItem("isLoggedIn", "true");
        setLoggedIn(true);
        loadEmployees();
    }

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        setLoggedIn(false);
        setData([]);
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );
    }

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
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

            <AddEmployee onEmployeeAdded={loadEmployees} />

            <EmployeeList data={data} />
        </div>
    );
}
