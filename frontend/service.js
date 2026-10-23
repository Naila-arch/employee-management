
export async function updateEmployee(id, employee) {
    return requestAPI(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "PUT",
            body: JSON.stringify(employee),
        }
    );
}
