
"use client";

import { useState } from "react";
import { addEmployee } from "./service";

function AddEmployee({ setdata }) {
    const emptyEmployee = {
        id: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
        joiningDate: "",
        status: "Active"
    };

    const [value, setvalue] = useState(emptyEmployee);

    function handleinput(e) {
        setvalue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    async function handleform(e) {
        e.preventDefault();

        try {
            const newEmployee = await addEmployee(value);

            setdata((prev) => [...prev, newEmployee]);

            alert("Employee added successfully!");

            setvalue(emptyEmployee);

        } catch (error) {
            console.log(error);
            alert("Employee add nahi ho saka.");
        }
    }

    return (
        <div className="container mt-4">

            <div className="card shadow-sm border-0">

                <div className="card-body p-4">

                    <div className="mb-4">
                        <h2 className="fw-bold mb-1">
                            Add New Employee
                        </h2>

                        <p className="text-muted mb-0">
                            Enter employee information below
                        </p>
                    </div>

                    <form onSubmit={handleform}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Employee ID
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={value.id}
                                    onChange={handleinput}
                                    name="id"
                                    placeholder="Example: EMP011"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={value.name}
                                    onChange={handleinput}
                                    name="name"
                                    placeholder="Enter employee name"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={value.email}
                                    onChange={handleinput}
                                    name="email"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={value.phone}
                                    onChange={handleinput}
                                    name="phone"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Department
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={value.department}
                                    onChange={handleinput}
                                    name="department"
                                    placeholder="Example: IT"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Position
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={value.position}
                                    onChange={handleinput}
                                    name="position"
                                    placeholder="Example: Developer"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={value.salary}
                                    onChange={handleinput}
                                    name="salary"
                                    placeholder="Enter salary"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={value.joiningDate}
                                    onChange={handleinput}
                                    name="joiningDate"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    value={value.status}
                                    onChange={handleinput}
                                    name="status"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Not Active">
                                        Not Active
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className="mt-2">

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >
                                Add Employee
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddEmployee;