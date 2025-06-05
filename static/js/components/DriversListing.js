// DriversListing Component
const DriversListing = () => {
    const { useState, useEffect } = React;
    
    // State for active tab
    const [activeTab, setActiveTab] = useState('active');
    
    // State for drivers data
    const [activeDrivers, setActiveDrivers] = useState([]);
    const [inactiveDrivers, setInactiveDrivers] = useState([]);
    
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        // Load data from dummyData
        const allDrivers = window.dummyData.drivers;
        setActiveDrivers(allDrivers.filter(driver => driver.status === 'Active'));
        setInactiveDrivers(allDrivers.filter(driver => driver.status === 'Inactive'));
    }, []);
    
    // Filter drivers based on search query
    const filteredActiveDrivers = activeDrivers.filter(driver => 
        driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const filteredInactiveDrivers = inactiveDrivers.filter(driver => 
        driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="drivers-listing-container">
            {/* Search and Actions */}
            <div className="actions-bar">
                <div className="search-container">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search drivers..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="action-buttons">
                    <button className="btn btn-primary">
                        <i className="fas fa-plus"></i> Add New Driver
                    </button>
                </div>
            </div>
            
            {/* Tabs */}
            <ul className="nav nav-tabs mt-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        Active Drivers
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'inactive' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inactive')}
                    >
                        Inactive Drivers
                    </button>
                </li>
            </ul>
            
            {/* Tab Content */}
            <div className="tab-content mt-3">
                {/* Active Drivers Tab */}
                {activeTab === 'active' && (
                    <div className="tab-pane active">
                        <div className="card">
                            <div className="card-header">
                                <h5>Active Drivers</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Total KM</th>
                                                <th>Rating</th>
                                                <th>Current Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredActiveDrivers.length > 0 ? (
                                                filteredActiveDrivers.map(driver => (
                                                    <tr key={driver.id}>
                                                        <td>{driver.id}</td>
                                                        <td>
                                                            <div className="driver-name">
                                                                <img 
                                                                    src={window.placeholderImages.driver} 
                                                                    alt={driver.name} 
                                                                    className="driver-avatar-small"
                                                                />
                                                                {driver.name}
                                                            </div>
                                                        </td>
                                                        <td>{driver.totalKm} km</td>
                                                        <td>
                                                            <div className="driver-rating">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <i 
                                                                        key={i} 
                                                                        className={`fas fa-star ${i < driver.rating ? 'active' : ''}`}
                                                                    ></i>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`status-badge ${driver.currentStatus.toLowerCase().replace(' ', '-')}`}>
                                                                {driver.currentStatus}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <a href={`/driver/${driver.id}`} className="btn btn-sm btn-outline-primary">
                                                                    <i className="fas fa-eye"></i>
                                                                </a>
                                                                <button className="btn btn-sm btn-outline-secondary">
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button className="btn btn-sm btn-outline-danger">
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        No active drivers found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Inactive Drivers Tab */}
                {activeTab === 'inactive' && (
                    <div className="tab-pane active">
                        <div className="card">
                            <div className="card-header">
                                <h5>Inactive Drivers</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Total KM</th>
                                                <th>Rating</th>
                                                <th>Last Active</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredInactiveDrivers.length > 0 ? (
                                                filteredInactiveDrivers.map(driver => (
                                                    <tr key={driver.id}>
                                                        <td>{driver.id}</td>
                                                        <td>
                                                            <div className="driver-name">
                                                                <img 
                                                                    src={window.placeholderImages.driver} 
                                                                    alt={driver.name} 
                                                                    className="driver-avatar-small"
                                                                />
                                                                {driver.name}
                                                            </div>
                                                        </td>
                                                        <td>{driver.totalKm} km</td>
                                                        <td>
                                                            <div className="driver-rating">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <i 
                                                                        key={i} 
                                                                        className={`fas fa-star ${i < driver.rating ? 'active' : ''}`}
                                                                    ></i>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td>{driver.lastActive}</td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <a href={`/driver/${driver.id}`} className="btn btn-sm btn-outline-primary">
                                                                    <i className="fas fa-eye"></i>
                                                                </a>
                                                                <button className="btn btn-sm btn-outline-secondary">
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button className="btn btn-sm btn-outline-success">
                                                                    <i className="fas fa-user-check"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        No inactive drivers found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
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
    module.exports = DriversListing;
}