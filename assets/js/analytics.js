// VISITOR LINE GRAPH
new Chart(document.getElementById('visitorChart'), {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Visitors',
            data: [120, 190, 300, 250, 280, 320, 400],
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            borderColor: '#ffb7ff',
            backgroundColor: 'rgba(186,104,200,0.3)',
            pointRadius: 4,
            pointBackgroundColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
        },
        plugins: { 
            legend: { labels: { color: '#fff' } }
        }
    }
});

// RATINGS BAR GRAPH
new Chart(document.getElementById('ratingChart'), {
    type: 'bar',
    data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
            label: 'Ratings Count',
            data: [12, 19, 30, 45, 70],
            backgroundColor: 'rgba(186,104,200,0.6)',
            borderColor: '#ffb7ff',
            borderWidth: 2,
            borderRadius: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
        },
        plugins: { 
            legend: { labels: { color: '#fff' } }
        }
    }
});
