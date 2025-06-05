// DriverDetail Component
const DriverDetail = (props) => {
    const { useState, useEffect } = React;
    
    // Get driver ID from props or DOM
    const driverId = props.driverId || document.getElementById('driverDetailRoot')?.getAttribute('data-driver-id');
    
    // State for driver data
    const [driver, setDriver] = useState(null);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [newNote, setNewNote] = useState('');
    
    useEffect(() => {
        // In a real app, this would fetch data from the backend
        // For now, we use dummy data
        const driverData = window.dummyData.drivers.find(d => d.id === driverId) || window.dummyData.drivers[0];
        setDriver(driverData);
        
        // Initialize charts
        if (driver) {
            const performanceCtx = document.getElementById('driverPerformanceChart');
            if (performanceCtx) {
                window.initDriverPerformanceChart(performanceCtx, window.dummyData.driverPerformanceData);
            }
        }
    }, [driverId, driver]);
    
    // Handle filter changes
    const handleFilterChange = () => {
        console.log("Filters applied:", { dateRange });
        // In a real app, this would fetch filtered data from the backend
    };
    
    // Handle adding a new note
    const handleAddNote = () => {
        if (newNote.trim()) {
            // In a real app, this would send the note to the backend
            alert(`Note added: ${newNote}`);
            setNewNote('');
        }
    };
    
    if (!driver) {
        return <div className="loading">Loading driver data...</div>;
    }
    
    return (
        <div className="driver-detail-container">
            {/* Driver Profile Section */}
            <div className="profile-section">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="driver-photo-container">
                                    <img 
                                        src={window.placeholderImages.driver} 
                                        alt={driver.name} 
                                        className="driver-photo"
                                    />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="driver-info">
                                    <h2>{driver.name}</h2>
                                    <div className="info-row">
                                        <div className="info-label">Age:</div>
                                        <div className="info-value">{driver.age}</div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-label">Total Kilometers:</div>
                                        <div className="info-value">{driver.totalKm} km</div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-label">Status:</div>
                                        <div className="info-value">
                                            <span className={`status-badge ${driver.currentStatus.toLowerCase().replace(' ', '-')}`}>
                                                {driver.currentStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-label">Rating:</div>
                                        <div className="info-value">
                                            <div className="driver-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <i 
                                                        key={i} 
                                                        className={`fas fa-star ${i < driver.rating ? 'active' : ''}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Notes Section */}
                                    <div className="notes-section mt-4">
                                        <h4>Driver Notes</h4>
                                        <div className="notes-list">
                                            {driver.notes && driver.notes.length > 0 ? (
                                                driver.notes.map((note, index) => (
                                                    <div className="note-item" key={index}>
                                                        <div className="note-header">
                                                            <span className="note-date">{note.date}</span>
                                                            <span className="note-author">{note.author}</span>
                                                        </div>
                                                        <div className="note-content">
                                                            {note.text}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-notes">
                                                    <p>No notes available for this driver.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="add-note mt-3">
                                            <textarea 
                                                className="form-control" 
                                                rows="3" 
                                                placeholder="Add a new note..." 
                                                value={newNote}
                                                onChange={(e) => setNewNote(e.target.value)}
                                            ></textarea>
                                            <button 
                                                className="btn btn-primary mt-2" 
                                                onClick={handleAddNote}
                                                disabled={!newNote.trim()}
                                            >
                                                Add Note
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Filters Section */}
            <div className="filters-section mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Performance Filters</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Date Range</label>
                                    <div className="col-sm-9 d-flex">
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
                            <div className="col-md-6 d-flex align-items-end">
                                <button className="btn btn-primary" onClick={handleFilterChange}>
                                    Apply Filters
                                </button>
                                <button className="btn btn-outline-secondary ms-2">
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Performance Data Section */}
            <div className="performance-section mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Performance Data</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-road"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Total Distance</h3>
                                        <div className="stat-value">{driver.stats?.totalKm || driver.totalKm || '0'} km</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-money-bill-wave"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Total Spent</h3>
                                        <div className="stat-value">{driver.stats?.totalSpent || '0'} €</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-route"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Money/Kilometer</h3>
                                        <div className="stat-value">{driver.stats?.moneyPerKm || '0'} €/km</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-gas-pump"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Fuel Expenses</h3>
                                        <div className="stat-value">{driver.stats?.fuelExpenses || '0'} €</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-tint"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Money/Liter</h3>
                                        <div className="stat-value">{driver.stats?.moneyPerLiter || '0'} €/l</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Total Earned</h3>
                                        <div className="stat-value">{driver.stats?.totalEarned || '0'} €</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-calendar-day"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>Trip Days</h3>
                                        <div className="stat-value">{driver.stats?.tripDays || '0'} days</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-flag"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>UA-NL Kilometers</h3>
                                        <div className="stat-value">{driver.stats?.uaNlKm || '0'} km</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-flag"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h3>UA-GB Kilometers</h3>
                                        <div className="stat-value">{driver.stats?.uaGbKm || '0'} km</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Performance Chart */}
            <div className="chart-section mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Performance Metrics Over Time</h5>
                    </div>
                    <div className="card-body">
                        <canvas id="driverPerformanceChart" height="120"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the component
if (typeof module !== 'undefined') {
    module.exports = DriverDetail;
}