const API_URL = "http://localhost:8080";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}


// ==================== PATIENT APIs ====================

export async function getPatients() {
    const response = await fetch(`${API_URL}/patients`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch patients");
    }

    return response.json();
}

export async function createPatient(patient) {
    const response = await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(patient)
    });

    if (!response.ok) {
        throw new Error("Failed to create patient");
    }

    return response.json();
}

export async function getPatient(id) {
    const response = await fetch(`${API_URL}/patients/${id}`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Patient not found");
    }

    return response.json();
}


// ==================== AUTH API ====================

export async function login(username, password) {
    const response = await fetch("http://localhost:8084/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data;
}


// ==================== BILLING APIs ====================

export async function getBills() {
    const response = await fetch(`${API_URL}/billing`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bills");
    }

    return response.json();
}

export async function createBill(bill) {
    const response = await fetch(`${API_URL}/billing`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(bill)
    });

    if (!response.ok) {
        throw new Error("Failed to create bill");
    }

    return response.json();
}

export async function updateBill(id, bill) {
    const response = await fetch(`${API_URL}/billing/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(bill)
    });

    if (!response.ok) {
        throw new Error("Failed to update bill");
    }

    return response.json();
}

export async function deleteBill(id) {
    const response = await fetch(`${API_URL}/billing/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to delete bill");
    }
}