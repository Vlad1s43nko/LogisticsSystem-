// Dummy data for the logistics system with map coordinates
window.dummyData = {
    // Dashboard summary statistics
    dashboardSummary: {
        fuelPerKm: '0.28',
        totalDistance: 158425,
        tripDays: '583',
        financialDynamics: '1.76',
        netProfit: 728350,
        expenses: 412780
    },
    
    // Trucks data with location information
    trucks: [
        {
            id: 'T001',
            licensePlate: 'AA1234BB',
            status: 'In Trip',
            currentDriver: 'Ivan Petrov',
            currentLocation: {
                lat: 52.3702,  // Amsterdam area (currently traveling)
                lng: 4.8951,
                lastUpdated: '2025-06-04T10:30:00Z',
                address: 'Near Amsterdam, Netherlands'
            },
            currentTrip: {
                direction: 'UA-NL',
                cargo: 'Electronics',
                cost: '3,500'
            },
            stats: {
                totalDistance: '45,230',
                tripDays: '158',
                profit: '182,450',
                fuelConsumption: '27.3'
            },
            trips: [
                {
                    id: 'TR1001',
                    direction: 'UA-NL',
                    driver: 'Ivan Petrov',
                    startDate: '2025-04-01',
                    endDate: '2025-04-07',
                    cargo: 'Electronics',
                    client: 'TechCorp BV',
                    startKm: 120000,
                    endKm: 122500,
                    days: 7,
                    cost: 3500,
                    fuelConsumed: 700,
                    fuelCost: 1120,
                    costPerLiter: 1.6,
                    otherExpenses: 350,
                    totalExpenses: 1470,
                    profit: 2030,
                    route: [
                        { lat: 50.4501, lng: 30.5234, name: 'Kyiv, Ukraine' },
                        { lat: 50.0755, lng: 14.4378, name: 'Prague, Czech Republic' },
                        { lat: 50.8503, lng: 4.3517, name: 'Brussels, Belgium' },
                        { lat: 52.3676, lng: 4.9041, name: 'Amsterdam, Netherlands' }
                    ],
                    status: 'Completed'
                },
                {
                    id: 'TR1002',
                    direction: 'NL-UA',
                    driver: 'Ivan Petrov',
                    startDate: '2025-03-20',
                    endDate: '2025-03-26',
                    cargo: 'Agricultural Equipment',
                    client: 'FarmTech UA',
                    startKm: 117500,
                    endKm: 120000,
                    days: 7,
                    cost: 3200,
                    fuelConsumed: 680,
                    fuelCost: 1088,
                    costPerLiter: 1.6,
                    otherExpenses: 280,
                    totalExpenses: 1368,
                    profit: 1832,
                    route: [
                        { lat: 52.3676, lng: 4.9041, name: 'Amsterdam, Netherlands' },
                        { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
                        { lat: 50.0647, lng: 19.9450, name: 'Krakow, Poland' },
                        { lat: 50.4501, lng: 30.5234, name: 'Kyiv, Ukraine' }
                    ],
                    status: 'Completed'
                }
            ]
        },
        {
            id: 'T002',
            licensePlate: 'BB5678CC',
            status: 'On Park',
            currentDriver: null,
            currentLocation: {
                lat: 50.4501,  // Kyiv (parked)
                lng: 30.5234,
                lastUpdated: '2025-06-03T18:45:00Z',
                address: 'Logistics Center, Kyiv, Ukraine'
            },
            currentTrip: null,
            stats: {
                totalDistance: '38,750',
                tripDays: '142',
                profit: '152,800',
                fuelConsumption: '29.1'
            },
            trips: [
                {
                    id: 'TR2001',
                    direction: 'UA-GB',
                    driver: 'Petro Smirnov',
                    startDate: '2025-03-10',
                    endDate: '2025-03-18',
                    cargo: 'Textiles',
                    client: 'FabricUK Ltd',
                    startKm: 87000,
                    endKm: 90200,
                    days: 9,
                    cost: 4200,
                    fuelConsumed: 920,
                    fuelCost: 1472,
                    costPerLiter: 1.6,
                    otherExpenses: 420,
                    totalExpenses: 1892,
                    profit: 2308,
                    route: [
                        { lat: 50.4501, lng: 30.5234, name: 'Kyiv, Ukraine' },
                        { lat: 52.2297, lng: 21.0122, name: 'Warsaw, Poland' },
                        { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
                        { lat: 51.5074, lng: -0.1278, name: 'London, UK' }
                    ],
                    status: 'Completed'
                }
            ]
        },
        {
            id: 'T003',
            licensePlate: 'CC9012DD',
            status: 'Maintenance',
            currentDriver: null,
            currentLocation: {
                lat: 50.4501,  // Kyiv (in maintenance)
                lng: 30.5234,
                lastUpdated: '2025-06-01T09:00:00Z',
                address: 'Service Center, Kyiv, Ukraine'
            },
            currentTrip: null,
            stats: {
                totalDistance: '52,120',
                tripDays: '183',
                profit: '203,500',
                fuelConsumption: '28.7'
            },
            trips: []
        },
        {
            id: 'T004',
            licensePlate: 'DD3456EE',
            status: 'In Trip',
            currentDriver: 'Oleksandr Kozak',
            currentLocation: {
                lat: 51.5074,  // London area (currently traveling)
                lng: -0.1278,
                lastUpdated: '2025-06-04T11:15:00Z',
                address: 'Near London, UK'
            },
            currentTrip: {
                direction: 'UA-GB',
                cargo: 'Furniture',
                cost: '4,100'
            },
            stats: {
                totalDistance: '22,325',
                tripDays: '100',
                profit: '89,600',
                fuelConsumption: '29.4'
            },
            trips: [
                {
                    id: 'CURRENT_T004',
                    direction: 'UA-GB',
                    driver: 'Oleksandr Kozak',
                    startDate: '2025-06-01',
                    endDate: 'TBD',
                    cargo: 'Furniture',
                    client: 'UK Furniture Ltd',
                    startKm: 22000,
                    endKm: 'TBD',
                    days: 'In Progress',
                    cost: 4100,
                    status: 'In Progress',
                    route: [
                        { lat: 50.4501, lng: 30.5234, name: 'Kyiv, Ukraine' },
                        { lat: 52.2297, lng: 21.0122, name: 'Warsaw, Poland' },
                        { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
                        { lat: 51.5074, lng: -0.1278, name: 'London, UK' }
                    ],
                    currentPosition: {
                        lat: 51.5074,
                        lng: -0.1278,
                        timestamp: '2025-06-04T11:15:00Z'
                    }
                }
            ]
        }
    ],
    
    // Drivers data (unchanged)
    drivers: [
        {
            id: 'D001',
            name: 'Ivan Petrov',
            age: 35,
            status: 'Active',
            currentStatus: 'In Trip',
            totalKm: 145000,
            hireDate: '2021-03-15',
            leaveDate: null,
            lastActive: '2025-04-14',
            stats: {
                totalKm: 145000,
                totalSpent: 65450,
                moneyPerKm: 0.45,
                fuelExpenses: 52360,
                moneyPerLiter: 1.58,
                totalEarned: 189500,
                tripDays: 536,
                uaNlKm: 85000,
                uaGbKm: 60000
            }
        },
        {
            id: 'D002',
            name: 'Petro Smirnov',
            age: 42,
            status: 'Active',
            currentStatus: 'Available',
            totalKm: 178500,
            hireDate: '2019-08-20',
            leaveDate: null,
            lastActive: '2025-04-10',
            stats: {
                totalKm: 178500,
                totalSpent: 77800,
                moneyPerKm: 0.44,
                fuelExpenses: 62400,
                moneyPerLiter: 1.56,
                totalEarned: 234500,
                tripDays: 620,
                uaNlKm: 95000,
                uaGbKm: 83500
            }
        },
        {
            id: 'D003',
            name: 'Oleksandr Kozak',
            age: 29,
            status: 'Active',
            currentStatus: 'In Trip',
            totalKm: 85300,
            hireDate: '2023-01-10',
            leaveDate: null,
            lastActive: '2025-04-14',
            stats: {
                totalKm: 85300,
                totalSpent: 40250,
                moneyPerKm: 0.47,
                fuelExpenses: 32100,
                moneyPerLiter: 1.62,
                totalEarned: 115200,
                tripDays: 325,
                uaNlKm: 38000,
                uaGbKm: 47300
            }
        },
        {
            id: 'D004',
            name: 'Mikhail Ivanenko',
            age: 45,
            status: 'Inactive',
            currentStatus: 'On Leave',
            totalKm: 210000,
            hireDate: '2018-05-12',
            leaveDate: '2025-03-20',
            lastActive: '2025-03-20',
            stats: {
                totalKm: 210000,
                totalSpent: 92400,
                moneyPerKm: 0.44,
                fuelExpenses: 73500,
                moneyPerLiter: 1.54,
                totalEarned: 278600,
                tripDays: 745,
                uaNlKm: 125000,
                uaGbKm: 85000
            }
        }
    ],
    
    // Chart data (unchanged)
    profitLossData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [38500, 42300, 45800, 49200, 51000, 55400, 59800, 63200, 68500, 72300, 76800, 81200],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Expenses',
                data: [22800, 24500, 26200, 27800, 29400, 31000, 32600, 34200, 35800, 37400, 39000, 40600],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    },
    
    // Chart data for truck performance
    truckPerformanceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Distance (km)',
                data: [3200, 2900, 3500, 3100, 3600, 3400, 3800, 3500, 3700, 3900, 4100, 4200],
                borderColor: '#3498db',
                tension: 0.3,
                yAxisID: 'y',
            },
            {
                label: 'Fuel Consumption (l/100km)',
                data: [28.2, 28.5, 27.9, 28.1, 28.4, 28.7, 28.2, 28.0, 28.3, 28.5, 28.7, 28.9],
                borderColor: '#f39c12',
                tension: 0.3,
                yAxisID: 'y1',
            },
            {
                label: 'Profit (€)',
                data: [5800, 5300, 6200, 5700, 6500, 6100, 6800, 6300, 6700, 7100, 7400, 7600],
                borderColor: '#27ae60',
                tension: 0.3,
                yAxisID: 'y2',
            }
        ]
    },
    
    // Chart data for driver performance
    driverPerformanceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Distance (km)',
                data: [5200, 4800, 5500, 5100, 5600, 5300, 5800, 5400, 5700, 6000, 6200, 6400],
                borderColor: '#3498db',
                tension: 0.3,
            },
            {
                label: 'Expenses (€)',
                data: [2300, 2100, 2400, 2200, 2500, 2300, 2600, 2400, 2500, 2700, 2800, 2900],
                borderColor: '#e74c3c',
                tension: 0.3,
            },
            {
                label: 'Earnings (€)',
                data: [6800, 6300, 7200, 6700, 7500, 7000, 7800, 7200, 7600, 8000, 8300, 8500],
                borderColor: '#27ae60',
                tension: 0.3,
            }
        ]
    }
};