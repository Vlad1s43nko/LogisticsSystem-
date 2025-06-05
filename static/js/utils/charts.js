// Chart initialization functions for the logistics system

// Set default Chart.js options
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#7f8c8d';
Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 3;
Chart.defaults.elements.point.hoverRadius = 5;

// Function to check if the current theme is dark
function isDarkTheme() {
    return document.body.classList.contains('body-dark');
}

// Function to get chart colors based on theme
function getChartColors() {
    return {
        gridColor: isDarkTheme() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        textColor: isDarkTheme() ? '#95a5a6' : '#7f8c8d',
        revenue: '#27ae60',
        revenueBackground: isDarkTheme() ? 'rgba(39, 174, 96, 0.15)' : 'rgba(39, 174, 96, 0.1)',
        expenses: '#e74c3c',
        expensesBackground: isDarkTheme() ? 'rgba(231, 76, 60, 0.15)' : 'rgba(231, 76, 60, 0.1)',
        distance: '#3498db',
        distanceBackground: isDarkTheme() ? 'rgba(52, 152, 219, 0.15)' : 'rgba(52, 152, 219, 0.1)',
        fuel: '#f39c12',
        fuelBackground: isDarkTheme() ? 'rgba(243, 156, 18, 0.15)' : 'rgba(243, 156, 18, 0.1)',
        profit: '#27ae60',
        profitBackground: isDarkTheme() ? 'rgba(39, 174, 96, 0.15)' : 'rgba(39, 174, 96, 0.1)'
    };
}

// Update chart theme when theme changes
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Update all charts after a slight delay to allow theme to change
            setTimeout(() => {
                updateChartsTheme();
            }, 100);
        });
    }
});

// Update all charts based on current theme
function updateChartsTheme() {
    // Find all charts and update them
    // Different versions of Chart.js have different ways to access instances
    if (Chart.instances) {
        // For newer versions where instances is an object/map
        if (typeof Chart.instances === 'object' && !Array.isArray(Chart.instances)) {
            Object.values(Chart.instances).forEach(chart => {
                updateChartTheme(chart);
                chart.update();
            });
        }
        // For versions where instances is an array
        else if (Array.isArray(Chart.instances)) {
            Chart.instances.forEach(chart => {
                updateChartTheme(chart);
                chart.update();
            });
        }
    }
    // Fallback for older versions
    else if (Chart.helpers && Chart.helpers.each && Chart.helpers.each(Chart.instances)) {
        Chart.helpers.each(Chart.instances, function(chart) {
            updateChartTheme(chart);
            chart.update();
        });
    }
}

// Update a specific chart's theme
function updateChartTheme(chart) {
    const colors = getChartColors();
    
    // Update grid and text colors
    if (chart.options.scales) {
        Object.keys(chart.options.scales).forEach(scaleKey => {
            const scale = chart.options.scales[scaleKey];
            if (scale.grid) {
                scale.grid.color = colors.gridColor;
            }
            if (scale.ticks) {
                scale.ticks.color = colors.textColor;
            }
        });
    }
    
    // Update title and legend colors
    if (chart.options.plugins && chart.options.plugins.title) {
        chart.options.plugins.title.color = colors.textColor;
    }
    if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
        chart.options.plugins.legend.labels.color = colors.textColor;
    }
}

// Initialize profit/loss chart for dashboard
function initProfitLossChart(ctx, data) {
    const colors = getChartColors();
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: data.datasets[0].data,
                    borderColor: colors.revenue,
                    backgroundColor: colors.revenueBackground,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: data.datasets[1].data,
                    borderColor: colors.expenses,
                    backgroundColor: colors.expensesBackground,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor,
                        callback: function(value) {
                            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 3 }).format(value);
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Initialize truck performance chart
function initTruckPerformanceChart(ctx, data) {
    const colors = getChartColors();
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Distance (km)',
                    data: data.datasets[0].data,
                    borderColor: colors.distance,
                    backgroundColor: colors.distanceBackground,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Fuel Consumption (l/100km)',
                    data: data.datasets[1].data,
                    borderColor: colors.fuel,
                    backgroundColor: colors.fuelBackground,
                    tension: 0.3,
                    yAxisID: 'y1'
                },
                {
                    label: 'Profit (€)',
                    data: data.datasets[2].data,
                    borderColor: colors.profit,
                    backgroundColor: colors.profitBackground,
                    tension: 0.3,
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Distance (km)',
                        color: colors.distance
                    },
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Fuel (l/100km)',
                        color: colors.fuel
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Profit (€)',
                        color: colors.profit
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: colors.textColor,
                        callback: function(value) {
                            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 3 }).format(value);
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Initialize driver performance chart
function initDriverPerformanceChart(ctx, data) {
    const colors = getChartColors();
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Distance (km)',
                    data: data.datasets[0].data,
                    borderColor: colors.distance,
                    backgroundColor: colors.distanceBackground,
                    tension: 0.3
                },
                {
                    label: 'Expenses (€)',
                    data: data.datasets[1].data,
                    borderColor: colors.expenses,
                    backgroundColor: colors.expensesBackground,
                    tension: 0.3
                },
                {
                    label: 'Earnings (€)',
                    data: data.datasets[2].data,
                    borderColor: colors.profit,
                    backgroundColor: colors.profitBackground,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (label.includes('€')) {
                                    label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                                } else {
                                    label += new Intl.NumberFormat().format(context.parsed.y);
                                    if (label.includes('Distance')) {
                                        label += ' km';
                                    }
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}