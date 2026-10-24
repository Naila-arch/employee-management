
import supabase from "./app/supabaseClient";

const API_URL =
    "https://hibfuzgmzugjjsmnapzo.supabase.co/functions/v1/employees";

async function requestAPI(url, options = {}) {
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
        throw new Error("Please log in again.");
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": "sb_publishable_e6NvebB4l0o4vUx74j-5dA_Gt2odITD",
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.error || `Request failed: ${response.status}`
        );
    }

    return data;
}

// Employees ki list lena
export async function getEmployees() {
    return requestAPI(API_URL, {
        method: "GET",
    });
}

// Naya employee add karna
export async function addEmployee(employee) {
    return requestAPI(API_URL, {
        method: "POST",
        body: JSON.stringify(employee),
    });
}

// Employee delete karna
export async function deleteEmployee(id) {
    return requestAPI(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
        }
    );
}

// Employee update karna
export async function updateEmployee(id, employee) {
    return requestAPI(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "PUT",
            body: JSON.stringify(employee),
        }
    );
}
