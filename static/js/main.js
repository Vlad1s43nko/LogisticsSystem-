// Main JavaScript file for the logistics system

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize tooltips
    initTooltips();
    
    // Add responsive table wrappers
    wrapTables();
    
    // Add general event listeners
    addEventListeners();
    
    console.log("Main.js initialization complete");
});

// Function to initialize mobile navigation
function initMobileNav() {
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.classList.add('mobile-nav-toggle');
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.main-header');
    if (header) {
        header.prepend(mobileNavToggle);
        
        mobileNavToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
                this.innerHTML = sidebar.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Function to initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Function to add responsive wrappers to tables
function wrapTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        // Check if the table is not already wrapped
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// Function to initialize sidebar toggle
function initSidebarToggle() {
    console.log("Initializing sidebar toggle");
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const contentOverlay = document.getElementById('contentOverlay');
    
    if (!sidebar) {
        console.error("Sidebar element not found");
        return;
    }
    
    if (!sidebarToggle) {
        console.error("Sidebar toggle button not found");
        return;
    }
    
    if (!contentOverlay) {
        console.error("Content overlay element not found");
        return;
    }
    
    // Toggle sidebar on button click
    sidebarToggle.addEventListener('click', function() {
        console.log("Sidebar toggle clicked");
        sidebar.classList.toggle('expanded');
        
        if (sidebar.classList.contains('expanded')) {
            contentOverlay.classList.add('active');
        } else {
            contentOverlay.classList.remove('active');
        }
    });
    
    // Close sidebar when clicking the overlay
    contentOverlay.addEventListener('click', function() {
        sidebar.classList.remove('expanded');
        contentOverlay.classList.remove('active');
    });
}

// Function to add general event listeners
function addEventListeners() {
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        
        if (sidebar && sidebar.classList.contains('active') && 
            mobileNavToggle && !sidebar.contains(event.target) && 
            !mobileNavToggle.contains(event.target)) {
            
            sidebar.classList.remove('active');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Handle form submission prevention for demo
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Form submission is disabled in this demo.');
        });
    });
    
    // Add click handlers for filter reset buttons
    const resetButtons = document.querySelectorAll('button:not([type="submit"])').forEach(button => {
        if (button.textContent.includes('Reset')) {
            button.addEventListener('click', function(event) {
                // Find the closest form
                const form = this.closest('form');
                if (form) {
                    // Reset all inputs
                    const inputs = form.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        if (input.type === 'text' || input.type === 'date' || input.type === 'number' || input.tagName === 'SELECT') {
                            input.value = '';
                        } else if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        }
                    });
                    
                    // If there's an "All" option in selects, select it
                    const selects = form.querySelectorAll('select');
                    selects.forEach(select => {
                        const allOption = Array.from(select.options).find(option => 
                            option.value === 'all' || option.value === '' || option.textContent.includes('All'));
                        if (allOption) {
                            select.value = allOption.value;
                        }
                    });
                }
            });
        }
    });
    
    // Animation on scroll removed as requested
}

// Animation on scroll functionality removed as requested

// Format currency values
function formatCurrency(value, currency = 'EUR') {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: currency
    }).format(value);
}

// Format number with thousands separator
function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}

// Calculate date difference in days
function dateDiffInDays(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Calculate profit
function calculateProfit(revenue, expenses) {
    return revenue - expenses;
}

// Calculate average consumption
function calculateAverageConsumption(fuelLiters, distance) {
    return (fuelLiters / distance) * 100;
}

// Removed animations as requested