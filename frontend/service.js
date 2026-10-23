
const API_URL =
    "https://hibfuzgmzugjjsmnapzo.supabase.co/functions/v1/employees";

// Employees ki list lena
export async function getEmployees() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        return await response.json();
    } catch (error) {
        console.error("GET employees error:", error);
        throw error;
    }
}

// Naya employee add karna
export async function addEmployee(employee) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    if (!response.ok) {
        throw new Error("Add employee API is not enabled yet.");
    }

    return await response.json();
}

// Employee delete karna
export async function deleteEmployee(id) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Delete employee API is not enabled yet.");
    }

    return await response.json();
}

// Employee update karna
export async function updateEmployee(id, employee) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    if (!response.ok) {
        throw new Error("Update employee API is not enabled yet.");
    }

    return await response.json();
}
