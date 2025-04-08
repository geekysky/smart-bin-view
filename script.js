
// Global variables
let map;
let selectedBin = null;
let markers = [];

// DOM elements
const mapElement = document.getElementById('map');
const mapboxTokenInput = document.getElementById('mapbox-token');
const loadMapButton = document.getElementById('load-map');
const binsTableBody = document.getElementById('bins-table-body');
const binInfo = document.getElementById('bin-info');
const selectPrompt = document.querySelector('.select-prompt');

// Stats elements
const totalBinsElement = document.getElementById('total-bins');
const criticalBinsElement = document.getElementById('critical-bins');
const operationalBinsElement = document.getElementById('operational-bins');
const avgFillLevelElement = document.getElementById('avg-fill-level');

// Detail elements
const binNameElement = document.getElementById('bin-name');
const binAddressElement = document.getElementById('bin-address');
const binStatusElement = document.getElementById('bin-status');
const binTypeElement = document.getElementById('bin-type');
const binFillLevelBarElement = document.getElementById('bin-fill-level-bar');
const binFillLevelTextElement = document.getElementById('bin-fill-level-text');
const binLastUpdatedElement = document.getElementById('bin-last-updated');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats
    updateStats();
    
    // Populate table
    populateTable();
    
    // Set up event listeners
    loadMapButton.addEventListener('click', initializeMap);
    
    // Check if there's a token in localStorage
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
        mapboxTokenInput.value = savedToken;
        // Auto-load map if token exists
        initializeMap();
    }
});

// Initialize the map
function initializeMap() {
    const token = mapboxTokenInput.value.trim();
    
    if (!token) {
        alert('Please enter a valid Mapbox token');
        return;
    }
    
    // Save token to localStorage
    localStorage.setItem('mapboxToken', token);
    
    // Set Mapbox access token
    mapboxgl.accessToken = token;
    
    try {
        // Initialize the map
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [73.8567, 18.5204], // Pune, India
            zoom: 11
        });
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // When map loads, add markers
        map.on('load', function() {
            addMapMarkers();
        });
        
        // Hide the input form when map is loaded
        document.getElementById('map-input').style.display = 'none';
    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Error initializing map. Please check your token and try again.');
    }
}

// Add markers to the map
function addMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];
    
    // Add new markers
    wasteBinData.forEach(bin => {
        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <h3>${bin.name}</h3>
                <div class="map-popup-fill">
                    <div class="map-popup-progress">
                        <div class="table-progress-bar ${getBinFillColor(bin.fillLevel)}" style="width: ${bin.fillLevel}%"></div>
                    </div>
                    <span>${bin.fillLevel}%</span>
                </div>
                <p>${getBinTypeLabel(bin.binType)}</p>
            </div>
        `;
        
        // Create popup
        const popup = new mapboxgl.Popup({
            offset: 25
        }).setHTML(popupContent);
        
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = `marker ${getBinFillColor(bin.fillLevel)}`;
        markerElement.style.width = '20px';
        markerElement.style.height = '20px';
        markerElement.style.borderRadius = '50%';
        markerElement.style.cursor = 'pointer';
        
        // Add pulse animation to markers with high fill levels
        if (bin.fillLevel >= 70) {
            markerElement.classList.add('animate-pulse-slow');
        }
        
        // Create and add marker
        const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([bin.location.longitude, bin.location.latitude])
            .setPopup(popup)
            .addTo(map);
        
        // Store marker for later reference
        markers.push(marker);
        
        // Add click event to marker
        markerElement.addEventListener('click', () => {
            selectBin(bin);
        });
    });
}

// Populate the table with waste bin data
function populateTable() {
    // Clear table first
    binsTableBody.innerHTML = '';
    
    // Add rows
    wasteBinData.forEach(bin => {
        const row = document.createElement('tr');
        row.dataset.binId = bin.id;
        
        if (selectedBin && bin.id === selectedBin.id) {
            row.classList.add('selected');
        }
        
        row.innerHTML = `
            <td>${bin.id}</td>
            <td>${bin.name}</td>
            <td>${bin.location.address}</td>
            <td>${getBinTypeLabel(bin.binType)}</td>
            <td>
                <div class="table-fill-level">
                    <div class="table-progress">
                        <div class="table-progress-bar ${getBinFillColor(bin.fillLevel)}" style="width: ${bin.fillLevel}%"></div>
                    </div>
                    <span>${bin.fillLevel}%</span>
                </div>
            </td>
            <td><span class="${getBinStatusColor(bin.status)}">${bin.status}</span></td>
            <td>${formatDate(bin.lastUpdated)}</td>
        `;
        
        // Add click event to row
        row.addEventListener('click', () => {
            selectBin(bin);
        });
        
        binsTableBody.appendChild(row);
    });
}

// Select a bin and show its details
function selectBin(bin) {
    // Toggle selection if already selected
    if (selectedBin && bin.id === selectedBin.id) {
        selectedBin = null;
        hideDetails();
    } else {
        selectedBin = bin;
        showDetails(bin);
    }
    
    // Refresh table to update selection
    populateTable();
    
    // Center map on selected bin
    if (map && selectedBin) {
        map.flyTo({
            center: [selectedBin.location.longitude, selectedBin.location.latitude],
            zoom: 15,
            duration: 1000
        });
    }
}

// Show bin details
function showDetails(bin) {
    // Hide prompt, show details
    selectPrompt.style.display = 'none';
    binInfo.classList.remove('hidden');
    
    // Fill in details
    binNameElement.textContent = bin.name;
    binAddressElement.textContent = bin.location.address;
    
    // Status with proper class
    binStatusElement.innerHTML = `<span class="${getBinStatusColor(bin.status)}">${bin.status}</span>`;
    
    // Bin type
    binTypeElement.textContent = getBinTypeLabel(bin.binType);
    
    // Fill level with proper color
    binFillLevelBarElement.className = `progress-bar ${getBinFillColor(bin.fillLevel)}`;
    binFillLevelBarElement.style.width = `${bin.fillLevel}%`;
    binFillLevelTextElement.textContent = `${bin.fillLevel}%`;
    
    // Last updated
    binLastUpdatedElement.textContent = formatDate(bin.lastUpdated);
}

// Hide bin details
function hideDetails() {
    selectPrompt.style.display = 'block';
    binInfo.classList.add('hidden');
}

// Update stats
function updateStats() {
    // Calculate stats
    const totalBins = wasteBinData.length;
    
    const criticalBins = wasteBinData.filter(bin => bin.fillLevel >= 90).length;
    
    const operationalBins = wasteBinData.filter(bin => bin.status === 'operational').length;
    
    const totalFillLevel = wasteBinData.reduce((sum, bin) => sum + bin.fillLevel, 0);
    const avgFillLevel = Math.round(totalFillLevel / totalBins);
    
    // Update DOM
    totalBinsElement.textContent = totalBins;
    criticalBinsElement.textContent = criticalBins;
    operationalBinsElement.textContent = operationalBins;
    avgFillLevelElement.textContent = `${avgFillLevel}%`;
}
