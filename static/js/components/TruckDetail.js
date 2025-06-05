// TruckDetail Component
const TruckDetail = (props) => {
    const { useState, useEffect } = React;
    
    // Get truck ID from props or DOM
    const truckId = props.truckId || document.getElementById('truckDetailRoot')?.getAttribute('data-truck-id');
    
    // State for truck data
    const [truck, setTruck] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedDriver, setSelectedDriver] = useState('all');
    const [tripsExpanded, setTripsExpanded] = useState({});
    
    useEffect(() => {
        // In a real app, this would fetch data from the backend
        // For now, we use dummy data
        const truckData = window.dummyData.trucks.find(t => t.id === truckId) || window.dummyData.trucks[0];
        setTruck(truckData);
        
        // Initialize charts
        if (activeTab === 'overview' && truck) {
            const performanceCtx = document.getElementById('truckPerformanceChart');
            if (performanceCtx) {
                window.initTruckPerformanceChart(performanceCtx, window.dummyData.truckPerformanceData);
            }
        }
    }, [truckId, activeTab, truck]);
    
    // Handle filter changes
    const handleFilterChange = () => {
        console.log("Filters applied:", { dateRange, selectedDriver });
        // In a real app, this would fetch filtered data from the backend
    };
    
    // Toggle trip details expansion
    const toggleTripDetails = (tripId) => {
        setTripsExpanded(prev => ({
            ...prev,
            [tripId]: !prev[tripId]
        }));
    };
    
    if (!truck) {
        return <div className="loading">Loading truck data...</div>;
    }
    
    return (
        <div className="truck-detail-container">
            {/* Map Section */}
            <div className="map-section">
                <div className="card">
                    <div className="card-header">
                        <h5>Truck Location</h5>
                    </div>
                    <div className="card-body">
                        <div className="truck-map-placeholder">
                            <div className="map-overlay">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Map showing current location of truck {truck.licensePlate}</p>
                                {truck.status === 'In Trip' && (
                                    <div className="status-badge">
                                        Currently in {truck.currentTrip?.direction || 'unknown location'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Filters Section */}
            <div className="filters-section">
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Date Range</label>
                            <div className="col-sm-10 d-flex">
                                <input 
                                    type="date" 
                                    className="form-control me-2" 
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                />
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Driver</label>
                            <div className="col-sm-9">
                                <select 
                                    className="form-select" 
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e.target.value)}
                                >
                                    <option value="all">All Drivers</option>
                                    {window.dummyData.drivers.map(driver => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={handleFilterChange}>
                            Apply Filters
                        </button>
                        <button className="btn btn-outline-secondary ms-2">
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Truck Information Section */}
            <div className="truck-info-section">
                <div className="truck-header">
                    <div className="truck-title">
                        <img 
                            src={window.placeholderImages.truck} 
                            alt={`Truck ${truck.licensePlate}`} 
                            className="truck-avatar"
                        />
                        <div>
                            <h2>{truck.licensePlate}</h2>
                            <div className={`truck-status ${truck.status.toLowerCase()}`}>
                                {truck.status}
                            </div>
                        </div>
                    </div>
                    <div className="truck-actions">
                        <button className="btn btn-outline-primary">
                            <i className="fas fa-print"></i> Print Report
                        </button>
                        <button className="btn btn-outline-secondary ms-2">
                            <i className="fas fa-cog"></i> Settings
                        </button>
                    </div>
                </div>
                
                <div className="summary-stats">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-road"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Total Distance</h3>
                                    <div className="stat-value">{truck.stats?.totalDistance || '0'} km</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-calendar-day"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Trip Days</h3>
                                    <div className="stat-value">{truck.stats?.tripDays || '0'} days</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Generated Profit</h3>
                                    <div className="stat-value">{truck.stats?.profit || '0'} €</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-gas-pump"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Avg. Fuel Consumption</h3>
                                    <div className="stat-value">{truck.stats?.fuelConsumption || '0'} l/100km</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Tabs */}
            <ul className="nav nav-tabs mt-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Performance Overview
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'trips' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trips')}
                    >
                        Trips History
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'maintenance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('maintenance')}
                    >
                        Maintenance
                    </button>
                </li>
            </ul>
            
            {/* Tab Content */}
            <div className="tab-content mt-3">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="tab-pane active">
                        <div className="card">
                            <div className="card-header">
                                <h5>Performance Metrics</h5>
                            </div>
                            <div className="card-body">
                                <canvas id="truckPerformanceChart" height="120"></canvas>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Trips History Tab */}
                {activeTab === 'trips' && (
                    <div className="tab-pane active">
                        <div className="card">
                            <div className="card-header">
                                <h5>Trips History</h5>
                            </div>
                            <div className="card-body">
                                <div className="trips-list">
                                    {truck.trips && truck.trips.length > 0 ? (
                                        truck.trips.map(trip => (
                                            <div className="trip-item" key={trip.id}>
                                                <div className="trip-header" onClick={() => toggleTripDetails(trip.id)}>
                                                    <div className="trip-summary">
                                                        <div className="trip-direction">
                                                            <i className="fas fa-route"></i> {trip.direction}
                                                        </div>
                                                        <div className="trip-driver">
                                                            <i className="fas fa-user"></i> {trip.driver}
                                                        </div>
                                                        <div className="trip-dates">
                                                            <i className="fas fa-calendar"></i> {trip.startDate} - {trip.endDate}
                                                        </div>
                                                        <div className="trip-cargo">
                                                            <i className="fas fa-box"></i> {trip.cargo}
                                                        </div>
                                                    </div>
                                                    <div className="trip-toggle">
                                                        <i className={`fas fa-chevron-${tripsExpanded[trip.id] ? 'up' : 'down'}`}></i>
                                                    </div>
                                                </div>
                                                
                                                {tripsExpanded[trip.id] && (
                                                    <div className="trip-details">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <table className="table table-sm">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Start Kilometrage</th>
                                                                            <td>{trip.startKm} km</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>End Kilometrage</th>
                                                                            <td>{trip.endKm} km</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Distance</th>
                                                                            <td>{trip.endKm - trip.startKm} km</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Trip Days</th>
                                                                            <td>{trip.days} days</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Client</th>
                                                                            <td>{trip.client}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Trip Cost</th>
                                                                            <td>{trip.cost} €</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <table className="table table-sm">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Fuel Consumed</th>
                                                                            <td>{trip.fuelConsumed} l</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Fuel Cost</th>
                                                                            <td>{trip.fuelCost} €</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Cost per Liter</th>
                                                                            <td>{trip.costPerLiter} €</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Other Expenses</th>
                                                                            <td>{trip.otherExpenses} €</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Total Expenses</th>
                                                                            <td>{trip.totalExpenses} €</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Profit</th>
                                                                            <td className={trip.profit > 0 ? 'text-success' : 'text-danger'}>
                                                                                {trip.profit} €
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-data">
                                            <p>No trip history available for this truck.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Maintenance Tab */}
                {activeTab === 'maintenance' && (
                    <div className="tab-pane active">
                        <div className="card">
                            <div className="card-header">
                                <h5>Maintenance History</h5>
                            </div>
                            <div className="card-body">
                                <p>Maintenance records for this truck will be displayed here.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Export the component
if (typeof module !== 'undefined') {
    module.exports = TruckDetail;
}