const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/employees';

export async function fetchEmployees(token: string, search = '') {
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
}

export async function fetchEmployee(token: string, id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch employee');
    return res.json();
}

export async function createEmployee(token: string, data: any) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create employee');
    return res.json();
}

export async function updateEmployee(token: string, id: string, data: any) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
}

export async function deleteEmployee(token: string, id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
}
