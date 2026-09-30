"use client";

import { useState } from "react";
import { deleteEmployee, updateEmployee } from "../service";

function EmployeeList({ data }) {
    const [editEmployee, setEditEmployee] = useState(null);
    const [search, setSearch] = useState("");

    async function handleDelete(id) {
        try {
            await deleteEmployee(id);

            alert("Employee deleted successfully!");

            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Employee delete nahi ho saka.");
        }
    }

    function handleEdit(employee) {
        setEditEmployee(employee);
    }

    function handleInput(e) {
        setEditEmployee({
            ...editEmployee,
            [e.target.name]: e.target.value
        });
    }

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            await updateEmployee(editEmployee.id, editEmployee);

            alert("Employee updated successfully!");

            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Employee update nahi ho saka.");
        }
    }

    const filteredEmployees = data.filter((item) =>
        String(item.name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        String(item.email || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        String(item.id || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="container mt-5">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Employee List
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all employees
                    </p>
                </div>

                <div style={{ width: "350px" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ID, Name or Email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </div>

            {/* Employee Count */}
            <div className="mb-3">
                <span className="badge bg-primary">
                    Total Employees: {filteredEmployees.length}
                </span>
            </div>

            {/* Table */}
            <div className="card shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Position</th>
                                    <th>Salary</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredEmployees.length > 0 ? (

                                    filteredEmployees.map((item) => (

                                        <tr key={item.id}>

                                            <td className="fw-semibold">
                                                {item.id}
                                            </td>

                                            <td>
                                                {item.name}
                                            </td>

                                            <td>
                                                {item.email}
                                            </td>

                                            <td>
                                                {item.phone}
                                            </td>

                                            <td>
                                                {item.department}
                                            </td>

                                            <td>
                                                {item.position}
                                            </td>

                                            <td>
                                                Rs. {item.salary}
                                            </td>

                                            <td>
                                                {item.joiningDate}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.status === "Active"
                                                            ? "badge bg-success"
                                                            : "badge bg-secondary"
                                                    }
                                                >
                                                    {item.status}
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="text-center py-4 text-muted"
                                        >
                                            No employees found
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Edit Employee */}
            {editEmployee && (

                <div className="card shadow-sm mt-4">

                    <div className="card-body">

                        <h3 className="fw-bold mb-4">
                            Edit Employee
                        </h3>

                        <form onSubmit={handleUpdate}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Name
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={editEmployee.name}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={editEmployee.email}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                        value={editEmployee.phone}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Department
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="department"
                                        value={editEmployee.department}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Position
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="position"
                                        value={editEmployee.position}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Salary
                                    </label>

                                    <input
                                        className="form-control"
                                        type="number"
                                        name="salary"
                                        value={editEmployee.salary}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Joining Date
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="joiningDate"
                                        value={editEmployee.joiningDate}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={editEmployee.status}
                                        onChange={handleInput}
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

                            <button
                                type="submit"
                                className="btn btn-success me-2"
                            >
                                Update Employee
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditEmployee(null)}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default EmployeeList;