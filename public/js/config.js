// API Configuration
const API_CONFIG = {
    // Untuk development (local)
    BASE_URL: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api'
        : 'https://backend-geographic-information-syst.vercel.app/api', // Ganti dengan URL backend Anda
    
    ENDPOINTS: {
        LOCATIONS: '/locations',
        LOCATION_BY_ID: (id) => `/locations/${id}`,
        LOCATION_BY_BOUNDS: '/locations/bounds/search'
    }
};

// Map Configuration
const MAP_CONFIG = {
    DEFAULT_CENTER: [-6.200000, 106.816666], // Jakarta, Indonesia
    DEFAULT_ZOOM: 13,
    MIN_ZOOM: 5,
    MAX_ZOOM: 18,
    TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Category Icons and Colors
const CATEGORY_CONFIG = {
    restaurant: {
        icon: 'utensils',
        color: '#ef4444',
        label: 'Restoran'
    },
    hotel: {
        icon: 'hotel',
        color: '#3b82f6',
        label: 'Hotel'
    },
    tourist_spot: {
        icon: 'camera',
        color: '#10b981',
        label: 'Wisata'
    },
    school: {
        icon: 'school',
        color: '#f59e0b',
        label: 'Sekolah'
    },
    hospital: {
        icon: 'hospital',
        color: '#ef4444',
        label: 'Rumah Sakit'
    },
    shop: {
        icon: 'shopping-cart',
        color: '#8b5cf6',
        label: 'Toko'
    },
    other: {
        icon: 'map-pin',
        color: '#64748b',
        label: 'Lainnya'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, MAP_CONFIG, CATEGORY_CONFIG };
}
