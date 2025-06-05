// MapComponent.js - Save this as: app/static/js/components/MapComponent.js

// Map Component for Logistics System using OpenStreetMap
window.MapComponent = (props) => {
    const { type, data, height = 300 } = props;
    const { useEffect, useRef } = React;
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    
    // Default coordinates (Ukraine center if no data provided)
    const defaultCoords = [49.8397, 24.0297];
    
    useEffect(() => {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded! Make sure to include Leaflet CSS and JS before this component.');
            return;
        }
        
        if (!mapRef.current || mapInstanceRef.current) return;
        
        // Get coordinates based on type
        let coords = defaultCoords;
        let zoomLevel = 6;
        
        if (type === 'truck' && data && data.currentLocation) {
            coords = [data.currentLocation.lat, data.currentLocation.lng];
            zoomLevel = 13;
        } else if (type === 'trip' && data && data.route && data.route.length > 0) {
            coords = [data.route[0].lat, data.route[0].lng];
            zoomLevel = 8;
        }
        
        // Initialize map
        const map = L.map(mapRef.current).setView(coords, zoomLevel);
        mapInstanceRef.current = map;
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(map);
        
        // Add markers based on type
        if (type === 'truck' && data) {
            addTruckMarkers(map, data);
        } else if (type === 'trip' && data) {
            addTripMarkers(map, data);
        }
        
        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [type, data]);
    
    const addTruckMarkers = (map, truck) => {
        if (!truck.currentLocation) {
            // If no location, show a placeholder message
            const noLocationPopup = L.popup()
                .setLatLng(map.getCenter())
                .setContent(`
                    <div class="map-popup">
                        <h4>${truck.licensePlate}</h4>
                        <p><strong>Status:</strong> ${truck.status}</p>
                        <p><strong>Location:</strong> Not available</p>
                    </div>
                `)
                .openOn(map);
            return;
        }
        
        const { lat, lng } = truck.currentLocation;
        
        // Custom truck icon
        const truckIcon = L.divIcon({
            className: 'custom-truck-marker',
            html: `<div class="truck-marker">
                     <i class="fas fa-truck" style="color: #27ae60; font-size: 20px;"></i>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([lat, lng], { icon: truckIcon }).addTo(map);
        
        // Popup with truck info
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${truck.licensePlate}</h4>
                <p><strong>Status:</strong> ${truck.status}</p>
                <p><strong>Driver:</strong> ${truck.currentDriver || 'Not assigned'}</p>
                ${truck.currentTrip ? `<p><strong>Route:</strong> ${truck.currentTrip.direction}</p>` : ''}
                <p><strong>Location:</strong> ${truck.currentLocation.address || 'Unknown'}</p>
                <small>Last updated: ${truck.currentLocation.lastUpdated || 'Unknown'}</small>
            </div>
        `);
    };
    
    const addTripMarkers = (map, trip) => {
        if (!trip.route || trip.route.length === 0) {
            // If no route, show trip info at center
            const noRoutePopup = L.popup()
                .setLatLng(map.getCenter())
                .setContent(`
                    <div class="map-popup">
                        <h4>Trip Information</h4>
                        <p><strong>Direction:</strong> ${trip.direction || 'Unknown'}</p>
                        <p><strong>Driver:</strong> ${trip.driver || 'Unknown'}</p>
                        <p><strong>Status:</strong> ${trip.status || 'Unknown'}</p>
                        <p>Route data not available</p>
                    </div>
                `)
                .openOn(map);
            return;
        }
        
        const route = trip.route;
        
        // Start point (green)
        const startIcon = L.divIcon({
            className: 'custom-start-marker',
            html: `<div class="start-marker">
                     <i class="fas fa-play-circle" style="color: #27ae60; font-size: 24px;"></i>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const startMarker = L.marker([route[0].lat, route[0].lng], { icon: startIcon }).addTo(map);
        startMarker.bindPopup(`
            <div class="map-popup">
                <h4>Trip Start</h4>
                <p><strong>Location:</strong> ${route[0].name || 'Departure point'}</p>
                <p><strong>Time:</strong> ${trip.startDate}</p>
            </div>
        `);
        
        // End point (red)
        if (route.length > 1) {
            const endIcon = L.divIcon({
                className: 'custom-end-marker',
                html: `<div class="end-marker">
                         <i class="fas fa-flag-checkered" style="color: #e74c3c; font-size: 24px;"></i>
                       </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            const endPoint = route[route.length - 1];
            const endMarker = L.marker([endPoint.lat, endPoint.lng], { icon: endIcon }).addTo(map);
            endMarker.bindPopup(`
                <div class="map-popup">
                    <h4>Trip Destination</h4>
                    <p><strong>Location:</strong> ${endPoint.name || 'Arrival point'}</p>
                    <p><strong>Expected:</strong> ${trip.endDate || 'TBD'}</p>
                </div>
            `);
            
            // Draw route line
            const routeCoords = route.map(point => [point.lat, point.lng]);
            L.polyline(routeCoords, {
                color: '#3498db',
                weight: 4,
                opacity: 0.8
            }).addTo(map);
        }
        
        // Current position (if trip is in progress)
        if (trip.status === 'In Progress' && trip.currentPosition) {
            const currentIcon = L.divIcon({
                className: 'custom-current-marker',
                html: `<div class="current-marker">
                         <i class="fas fa-truck" style="color: #f39c12; font-size: 20px;"></i>
                       </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            const currentMarker = L.marker([trip.currentPosition.lat, trip.currentPosition.lng], { icon: currentIcon }).addTo(map);
            currentMarker.bindPopup(`
                <div class="map-popup">
                    <h4>Current Location</h4>
                    <p><strong>Truck:</strong> ${trip.truckLicense || truck.licensePlate || 'Unknown'}</p>
                    <p><strong>Driver:</strong> ${trip.driver}</p>
                    <small>Last updated: ${trip.currentPosition.timestamp || 'Unknown'}</small>
                </div>
            `);
        }
        
        // Fit map to show all markers
        if (route.length > 1) {
            const group = new L.featureGroup();
            map.eachLayer(function(layer) {
                if (layer instanceof L.Marker) {
                    group.addLayer(layer);
                }
            });
            if (group.getLayers().length > 0) {
                map.fitBounds(group.getBounds().pad(0.1));
            }
        }
    };
    
    return React.createElement('div', {
        ref: mapRef,
        style: { 
            height: `${height}px`, 
            width: '100%', 
            borderRadius: '5px',
            border: '1px solid #ddd'
        }
    });
};