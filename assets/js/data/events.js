export async function fetchEvents() {
    try {
        const response = await fetch('assets/data/events.json');
        if (!response.ok) throw new Error('Failed to fetch events');
        return response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}