# Simple JSON loader for demo
export async function fetchEvents() {
    const response = await fetch('assets/data/events.json');
    return response.json();
}

export async function fetchAlumni() {
    const response = await fetch('assets/data/alumni.json');
    return response.json();
}