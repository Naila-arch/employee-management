
async function handleform(e) {
    e.preventDefault();

    try {
        await addEmployee(value);

        alert("Employee added successfully!");

        setvalue(emptyEmployee);

        if (onEmployeeAdded) {
            await onEmployeeAdded();
        }
    } catch (error) {
        console.error("Add employee error:", error);

        alert(
            error instanceof Error
                ? error.message
                : "Employee add nahi ho saka."
        );
    }
}
