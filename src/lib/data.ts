const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:5000').replace(/\/+$/, '');

export const getUsers = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/users`, { cache: 'no-store' });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE' || error?.message?.includes('Dynamic server usage')) {
            throw error;
        }
        console.error('Error fetching users:', error);
        return [];
    }
};
