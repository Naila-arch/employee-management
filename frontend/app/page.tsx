"use client";

import { useState, useEffect } from "react";
import { getEmployees } from "../service";
import AddEmployee from "../AddEmployee";
import EmployeeList from "./EmployeeList";
import Login from "../Login";

export default function Home() {
    const [data, setdata] = useState<any[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");

        if (loginStatus === "true") {
            setLoggedIn(true);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (loggedIn) {
            getEmployees().then((employees) => {
                setdata(employees);
            });
        }
    }, [loggedIn]);

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        setLoggedIn(false);
    }

    if (loading) {
        return (
            <p className="text-center mt-5">
                Loading...
            </p>
        );
    }

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} />;
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">

                    <span className="navbar-brand">
                        Employee Management System
                    </span>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </nav>

            <div className="container mt-4">

                <AddEmployee setdata={setdata} />

                <EmployeeList data={data} />

            </div>
        </>
    );
}