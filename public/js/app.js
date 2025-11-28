// Global Variables
let map;
let markers = [];
let allLocations = [];
let currentCategory = 'all';
let pickingLocation = false;
let tempMarker = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadLocations();
    initEventListeners();
});

// Initialize Map
function initMap() {
    map = L.map('map').setView(MAP_CONFIG.DEFAULT_CENTER, MAP_CONFIG.DEFAULT_ZOOM);
    
    L.tileLayer(MAP_CONFIG.TILE_LAYER, {
        attribution: MAP_CONFIG.ATTRIBUTION,
        minZoom: MAP_CONFIG.MIN_ZOOM,
        maxZoom: MAP_CONFIG.MAX_ZOOM
    }).addTo(map);
    
    // Add click event for picking location
    map.on('click', onMapClick);
}

// Get Address from Coordinates (Reverse Geocoding)
async function getAddressFromCoordinates(lat, lng) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'Accept-Language': 'id' // Indonesian language
                }
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            return data.display_name || '';
        }
    } catch (error) {
        console.error('Error getting address:', error);
    }
    return '';
}

// Map Click Handler
async function onMapClick(e) {
    if (pickingLocation) {
        const { lat, lng } = e.latlng;
        document.getElementById('locationLat').value = lat.toFixed(6);
        document.getElementById('locationLng').value = lng.toFixed(6);
        
        // Remove previous temp marker
        if (tempMarker) {
            map.removeLayer(tempMarker);
        }
        
        // Add temp marker
        tempMarker = L.marker([lat, lng], {
            icon: createCustomIcon('map-pin', '#f59e0b')
        }).addTo(map);
        
        showToast('Mengambil alamat...', 'success');
        
        // Get address from coordinates
        const address = await getAddressFromCoordinates(lat, lng);
        if (address) {
            document.getElementById('locationAddress').value = address;
        }
        
        pickingLocation = false;
        
        // Reset map cursor
        document.getElementById('map').style.cursor = '';
        
        // Show modal back after getting address
        setTimeout(() => {
            const modal = document.getElementById('locationModal');
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
                // Focus to name field
                document.getElementById('locationName').focus();
                showToast('Lokasi & alamat berhasil dipilih!', 'success');
            }, 10);
        }, 500);
    }
}

// Create Custom Marker Icon
function createCustomIcon(iconName, color) {
    return L.divIcon({
        html: `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(0,0,0,0.3);">
                <i class="fas fa-${iconName}" style="color: white; transform: rotate(45deg); font-size: 18px;"></i>
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: 'custom-marker'
    });
}

// Load Locations from API
async function loadLocations(category = 'all', search = '') {
    try {
        let url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}`;
        const params = new URLSearchParams();
        
        if (category !== 'all') {
            params.append('category', category);
        }
        
        if (search) {
            params.append('search', search);
        }
        
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            allLocations = data.data;
            displayLocations(allLocations);
            updateLocationCount(data.count);
        } else {
            showToast('Gagal memuat data lokasi', 'error');
        }
    } catch (error) {
        console.error('Error loading locations:', error);
        showToast('Error: Tidak dapat terhubung ke server', 'error');
    }
}

// Display Locations on Map and List
function displayLocations(locations) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Clear location list
    const listContainer = document.getElementById('locationListContainer');
    listContainer.innerHTML = '';
    
    if (locations.length === 0) {
        listContainer.innerHTML = '<p class="loading">Tidak ada lokasi ditemukan</p>';
        return;
    }
    
    // Add markers and list items
    locations.forEach(location => {
        // Add marker to map
        const categoryConfig = CATEGORY_CONFIG[location.category] || CATEGORY_CONFIG.other;
        const marker = L.marker(
            [location.coordinates.lat, location.coordinates.lng],
            { icon: createCustomIcon(categoryConfig.icon, categoryConfig.color) }
        ).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div class="popup-content">
                <h3>${location.name}</h3>
                <p><i class="fas fa-tag"></i> ${categoryConfig.label}</p>
                ${location.address ? `<p><i class="fas fa-location-dot"></i> ${location.address}</p>` : ''}
                ${location.rating ? `<p><i class="fas fa-star"></i> Rating: ${location.rating}/5</p>` : ''}
                <div class="popup-actions">
                    <button class="btn btn-primary popup-btn" onclick="viewLocationDetail('${location._id}')">
                        <i class="fas fa-info-circle"></i> Detail
                    </button>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        markers.push(marker);
        
        // Add to list
        const listItem = document.createElement('div');
        listItem.className = 'location-item';
        listItem.innerHTML = `
            <div class="location-item-header">
                <h4><i class="fas fa-${categoryConfig.icon}"></i> ${location.name}</h4>
                <span class="location-item-category">${categoryConfig.label}</span>
            </div>
            ${location.address ? `<p><i class="fas fa-location-dot"></i> ${location.address}</p>` : ''}
            ${location.rating ? `<p><i class="fas fa-star"></i> Rating: ${location.rating}/5</p>` : ''}
        `;
        
        listItem.onclick = () => {
            map.setView([location.coordinates.lat, location.coordinates.lng], 16);
            marker.openPopup();
            
            // Close sidebar after clicking location
            const sidebar = document.getElementById('sidebar');
            const mainContainer = document.querySelector('.main-container');
            sidebar.classList.add('collapsed');
            mainContainer.classList.add('sidebar-hidden');
        };
        
        listContainer.appendChild(listItem);
    });
    
    // Fit map to markers
    if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Update Location Count
function updateLocationCount(count) {
    document.getElementById('locationCount').textContent = count;
}

// View Location Detail
async function viewLocationDetail(id) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATION_BY_ID(id)}`);
        const data = await response.json();
        
        if (data.success) {
            const location = data.data;
            const categoryConfig = CATEGORY_CONFIG[location.category] || CATEGORY_CONFIG.other;
            
            const detailContent = `
                ${location.imageUrl ? `<img src="${location.imageUrl}" alt="${location.name}" class="detail-image" onerror="this.style.display='none'">` : ''}
                
                <div class="detail-section">
                    <h3><i class="fas fa-tag"></i> ${location.name}</h3>
                    <p><strong>Kategori:</strong> ${categoryConfig.label}</p>
                </div>
                
                ${location.description ? `
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> Deskripsi</h3>
                    <p>${location.description}</p>
                </div>
                ` : ''}
                
                ${location.address ? `
                <div class="detail-section">
                    <h3><i class="fas fa-location-dot"></i> Alamat</h3>
                    <p>${location.address}</p>
                </div>
                ` : ''}
                
                <div class="detail-section">
                    <h3><i class="fas fa-map-marker-alt"></i> Koordinat</h3>
                    <p>Latitude: ${location.coordinates.lat}</p>
                    <p>Longitude: ${location.coordinates.lng}</p>
                </div>
                
                ${location.rating ? `
                <div class="detail-section">
                    <h3><i class="fas fa-star"></i> Rating</h3>
                    <p class="rating-stars">${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5 - Math.floor(location.rating))} ${location.rating}/5</p>
                </div>
                ` : ''}
                
                <div class="detail-actions">
                    <button class="btn btn-primary" onclick="editLocation('${location._id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteLocation('${location._id}')">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal('detailModal')">
                        <i class="fas fa-times"></i> Tutup
                    </button>
                </div>
            `;
            
            document.getElementById('detailContent').innerHTML = detailContent;
            openModal('detailModal');
        }
    } catch (error) {
        console.error('Error loading location detail:', error);
        showToast('Gagal memuat detail lokasi', 'error');
    }
}

// Edit Location
async function editLocation(id) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATION_BY_ID(id)}`);
        const data = await response.json();
        
        if (data.success) {
            const location = data.data;
            
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Lokasi';
            document.getElementById('locationId').value = location._id;
            document.getElementById('locationName').value = location.name;
            document.getElementById('locationCategory').value = location.category;
            document.getElementById('locationLat').value = location.coordinates.lat;
            document.getElementById('locationLng').value = location.coordinates.lng;
            document.getElementById('locationAddress').value = location.address || '';
            document.getElementById('locationDescription').value = location.description || '';
            document.getElementById('locationRating').value = location.rating || '';
            document.getElementById('locationImage').value = location.imageUrl || '';
            
            closeModal('detailModal');
            openModal('locationModal');
        }
    } catch (error) {
        console.error('Error loading location:', error);
        showToast('Gagal memuat data lokasi', 'error');
    }
}

// Delete Location
async function deleteLocation(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATION_BY_ID(id)}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Lokasi berhasil dihapus', 'success');
            closeModal('detailModal');
            loadLocations(currentCategory);
        } else {
            showToast('Gagal menghapus lokasi', 'error');
        }
    } catch (error) {
        console.error('Error deleting location:', error);
        showToast('Error: Tidak dapat menghapus lokasi', 'error');
    }
}

// Save Location (Create or Update)
async function saveLocation(formData) {
    try {
        const locationId = document.getElementById('locationId').value;
        const url = locationId 
            ? `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATION_BY_ID(locationId)}`
            : `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}`;
        
        const method = locationId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast(locationId ? 'Lokasi berhasil diupdate' : 'Lokasi berhasil ditambahkan', 'success');
            
            // Close modal and reset form
            const modal = document.getElementById('locationModal');
            modal.classList.remove('show');
            modal.style.display = 'none';
            resetForm();
            
            // Reload locations
            await loadLocations(currentCategory);
        } else {
            showToast('Gagal menyimpan lokasi: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('Error saving location:', error);
        showToast('Error: Tidak dapat menyimpan lokasi', 'error');
    }
}

// Initialize Event Listeners
function initEventListeners() {
    // List Toggle Button (Header)
    document.getElementById('listToggleBtn').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.querySelector('.main-container');
        sidebar.classList.toggle('collapsed');
        mainContainer.classList.toggle('sidebar-hidden');
    });
    
    // Sidebar Close Button
    document.getElementById('sidebarCloseBtn').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.querySelector('.main-container');
        sidebar.classList.add('collapsed');
        mainContainer.classList.add('sidebar-hidden');
    });
    
    // Close sidebar when clicking overlay (mobile)
    const mainContainer = document.querySelector('.main-container');
    mainContainer.addEventListener('click', (e) => {
        if (e.target === mainContainer && !document.querySelector('.sidebar').classList.contains('collapsed')) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.add('collapsed');
            mainContainer.classList.add('sidebar-hidden');
        }
    });
    
    // Search Toggle Button (Header)
    document.getElementById('searchToggleBtn').addEventListener('click', () => {
        openModal('searchModal');
    });
    
    // Search Modal Button
    document.getElementById('searchModalBtn').addEventListener('click', () => {
        const search = document.getElementById('searchInputModal').value;
        const category = document.getElementById('searchCategoryModal').value;
        closeModal('searchModal');
        loadLocations(category, search);
    });
    
    // Search Modal Input - Enter Key
    document.getElementById('searchInputModal').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const search = e.target.value;
            const category = document.getElementById('searchCategoryModal').value;
            closeModal('searchModal');
            loadLocations(category, search);
        }
    });
    
    // Add Location Button
    document.getElementById('addLocationBtn').addEventListener('click', () => {
        resetForm();
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus"></i> Tambah Lokasi Baru';
        openModal('locationModal');
    });
    
    // Category Buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentCategory = e.currentTarget.dataset.category;
            loadLocations(currentCategory);
        });
    });
    
    // Category Buttons
    document.getElementById('pickFromMapBtn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pickingLocation = true;
        showToast('Klik pada peta untuk memilih lokasi', 'success');
        // Hide modal completely
        const modal = document.getElementById('locationModal');
        modal.classList.remove('show');
        modal.style.display = 'none';
        // Change map cursor
        document.getElementById('map').style.cursor = 'crosshair';
    });
    
    // Locate Button
    document.getElementById('locateBtn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 15);
                    showToast('Lokasi Anda ditemukan', 'success');
                },
                () => {
                    showToast('Tidak dapat mengakses lokasi Anda', 'error');
                }
            );
        } else {
            showToast('Geolocation tidak didukung oleh browser Anda', 'error');
        }
    });
    
    // Refresh Button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadLocations(currentCategory);
        showToast('Data di-refresh', 'success');
    });
    
    // Location Form Submit
    document.getElementById('locationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const lat = parseFloat(document.getElementById('locationLat').value);
        const lng = parseFloat(document.getElementById('locationLng').value);
        const rating = parseFloat(document.getElementById('locationRating').value);
        
        // Validasi koordinat
        if (isNaN(lat) || isNaN(lng)) {
            showToast('Koordinat tidak valid!', 'error');
            return false;
        }
        
        if (lat < -90 || lat > 90) {
            showToast('Latitude harus antara -90 dan 90!', 'error');
            return false;
        }
        
        if (lng < -180 || lng > 180) {
            showToast('Longitude harus antara -180 dan 180!', 'error');
            return false;
        }
        
        // Validasi rating
        if (rating && (rating < 0 || rating > 5)) {
            showToast('Rating harus antara 0 dan 5!', 'error');
            return false;
        }
        
        const formData = {
            name: document.getElementById('locationName').value.trim(),
            category: document.getElementById('locationCategory').value,
            coordinates: { lat, lng },
            address: document.getElementById('locationAddress').value.trim(),
            description: document.getElementById('locationDescription').value.trim(),
            rating: rating || 0,
            imageUrl: document.getElementById('locationImage').value.trim()
        };
        
        await saveLocation(formData);
        return false;
    });
    
    // Modal Close Buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
            closeModal(e.target.id);
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => closeModal(modal.id));
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('collapsed');
        }
        // Invalidate map size to fix rendering issues
        if (map) {
            setTimeout(() => map.invalidateSize(), 100);
        }
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        // Reset form jika modal locationModal
        if (modalId === 'locationModal') {
            resetForm();
        }
    }, 300);
}

// Reset Form
function resetForm() {
    document.getElementById('locationForm').reset();
    document.getElementById('locationId').value = '';
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }
    pickingLocation = false;
    document.getElementById('map').style.cursor = '';
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Export functions for use in HTML onclick attributes
window.viewLocationDetail = viewLocationDetail;
window.editLocation = editLocation;
window.deleteLocation = deleteLocation;
window.closeModal = closeModal;
