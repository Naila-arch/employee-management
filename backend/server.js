const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// GET ALL EMPLOYEES
app.get("/employees", async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM public."employees" ORDER BY id'
        );

        res.json(result.rows);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// ADD EMPLOYEE
app.post("/employees", async (req, res) => {
    try {
        const {
            id,
            name,
            email,
            phone,
            department,
            position,
            salary,
            joiningDate,
            status
        } = req.body;

        const result = await pool.query(
            `INSERT INTO employees
            (id, name, email, phone, department, position, salary, "joiningDate", status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [
                id,
                name,
                email,
                phone,
                department,
                position,
                salary,
                joiningDate,
                status
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE EMPLOYEE
app.put("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            phone,
            department,
            position,
            salary,
            joiningDate,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE employees
             SET name = $1,
                 email = $2,
                 phone = $3,
                 department = $4,
                 position = $5,
                 salary = $6,
                 "joiningDate" = $7,
                 status = $8
             WHERE id = $9
             RETURNING *`,
            [
                name,
                email,
                phone,
                department,
                position,
                salary,
                joiningDate,
                status,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// DELETE EMPLOYEE
app.delete("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM employees WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// START SERVER
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});