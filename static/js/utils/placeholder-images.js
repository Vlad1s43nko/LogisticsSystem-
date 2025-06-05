// Placeholder images for the logistics system
window.placeholderImages = {
    // Truck placeholder image (side view)
    truck: '/static/img/truck-placeholder.png',
    
    // Driver placeholder image
    driver: '/static/img/driver-placeholder.png',
    
    // Fallback SVG images (inline SVG as base64 to ensure they always work)
    fallbackTruck: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNNjUsMzBIMTUwVjgwSDY1VjMwWiIgZmlsbD0iI2FhYSIvPjxyZWN0IHg9IjE1MCIgeT0iNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2FhYSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iODAiIHI9IjE1IiBmaWxsPSIjNTU1Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iODAiIHI9IjE1IiBmaWxsPSIjNTU1Ii8+PC9zdmc+',
    fallbackDriver: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNkZGQiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iNDAiIGZpbGw9IiNhYWEiLz48cGF0aCBkPSJNNTAsOTVDNTAsOTUgNjUsMTQwIDEwMCwxNDAgMTM1LDE0MCAxNTAsOTUgMTUwLDk1IiBmaWxsPSIjYWFhIi8+PC9zdmc+',
    fallback: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%20id%3D%22holder_text%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
};

// Function to handle image loading errors
function handleImageError(img) {
    img.onerror = null;
    
    // Determine which fallback to use based on image alt text or source
    if (img.alt && img.alt.toLowerCase().includes('truck') || img.src.includes('truck')) {
        img.src = window.placeholderImages.fallbackTruck;
    } else if (img.alt && img.alt.toLowerCase().includes('driver') || img.src.includes('driver')) {
        img.src = window.placeholderImages.fallbackDriver;
    } else {
        img.src = window.placeholderImages.fallback;
    }
}

// Add event listener to handle image errors
document.addEventListener('DOMContentLoaded', function() {
    // Find all images
    const images = document.querySelectorAll('img');
    
    // Add error handler to each image
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
    
    // Pre-load the fallback images to ensure they're in cache
    const preloadFallbacks = () => {
        const preloadTruck = new Image();
        preloadTruck.src = window.placeholderImages.fallbackTruck;
        
        const preloadDriver = new Image();
        preloadDriver.src = window.placeholderImages.fallbackDriver;
        
        const preloadGeneric = new Image();
        preloadGeneric.src = window.placeholderImages.fallback;
    };
    
    // Execute preload
    preloadFallbacks();
});