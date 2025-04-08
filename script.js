
// Global variables
let map;
let selectedBin = null;
let markers = [];

// DOM elements
const mapElement = document.getElementById('map');
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
    
    // Initialize map
    initializeMap();
});

// Initialize the map using Leaflet
function initializeMap() {
    try {
        // Initialize the map centered on Pune, India
        map = L.map('map').setView([18.5204, 73.8567], 12);
        
        // Add the OpenStreetMap tile layer (free to use)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Add navigation controls
        L.control.scale().addTo(map);
        
        // Add markers for each bin
        addMapMarkers();
    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Error initializing map. Please try refreshing the page.');
    }
}

// Add markers to the map
function addMapMarkers() {
    // Clear existing markers from array
    markers.forEach(marker => {
        if (marker) {
            marker.remove();
        }
    });
    markers = [];
    
    // Add new markers
    wasteBinData.forEach(bin => {
        // Create custom icon based on fill level
        const fillStatusClass = getBinFillColor(bin.fillLevel);
        const iconHtml = `<div class="custom-marker ${fillStatusClass} ${bin.fillLevel >= 70 ? 'animate-pulse-slow' : ''}"></div>`;
        
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-div-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
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
        
        // Create marker with popup
        const marker = L.marker([bin.location.latitude, bin.location.longitude], {
            icon: customIcon
        }).addTo(map);
        
        // Add popup to marker
        marker.bindPopup(popupContent);
        
        // Add click event to marker
        marker.on('click', () => {
            selectBin(bin);
        });
        
        // Store marker for later reference
        markers.push(marker);
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
        
        // Update markers to highlight selected bin
        wasteBinData.forEach((dataBin, index) => {
            if (markers[index]) {
                if (dataBin.id === bin.id) {
                    // Highlight selected marker
                    const selectedIcon = L.divIcon({
                        html: `<div class="custom-marker ${getBinFillColor(dataBin.fillLevel)} selected-marker ${dataBin.fillLevel >= 70 ? 'animate-pulse-slow' : ''}"></div>`,
                        className: 'custom-div-icon',
                        iconSize: [30, 30],
                        iconAnchor: [15, 15]
                    });
                    markers[index].setIcon(selectedIcon);
                    
                    // Center map on selected bin
                    map.setView([dataBin.location.latitude, dataBin.location.longitude], 14);
                } else {
                    // Reset other markers
                    const normalIcon = L.divIcon({
                        html: `<div class="custom-marker ${getBinFillColor(dataBin.fillLevel)} ${dataBin.fillLevel >= 70 ? 'animate-pulse-slow' : ''}"></div>`,
                        className: 'custom-div-icon',
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    });
                    markers[index].setIcon(normalIcon);
                }
            }
        });
    }
    
    // Refresh table to update selection
    populateTable();
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
