document.addEventListener("DOMContentLoaded", () => {
  // Falls data (past 6 months)
  const fallsData = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    values: [1, 1, 1, 2, 1, 2],
  };

  // Heart rate data (daily averages + spikes)
  const heartRateData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    values: Array.from({ length: 30 }, () => {
      const base = Math.floor(Math.random() * 20) + 65; // avg 65–85 bpm
      // 10% chance of an abnormal spike
      return Math.random() < 0.1 ? base + Math.floor(Math.random() * 20) + 15 : base;
    }),
  };

  // Temperature data (daily averages + spikes)
  const tempData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    values: Array.from({ length: 30 }, () => {
      const base = parseFloat((Math.random() * 0.8 + 36.5).toFixed(1));
      // 10% chance of an abnormal spike
      return Math.random() < 0.1 ? parseFloat((base + Math.random() * 1.5).toFixed(1)) : base;
    }),
  };

  // --- Chart.js setup ---

  // Falls chart
  const fallsChart = new Chart(document.getElementById("fallsChart"), {
    type: "bar",
    data: {
      labels: fallsData.labels,
      datasets: [
        {
          label: "Number of Falls",
          data: fallsData.values,
          backgroundColor: "#ff6b6b",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
      onClick: (e) => {
        const activePoints = fallsChart.getElementsAtEventForMode(e, 'point', { intersect: true }, false);
        if (activePoints.length > 0) {
          const firstPoint = activePoints[0];
          const label = fallsChart.data.labels[firstPoint.index];
          const value = fallsChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
          alert(`Falls in ${label}: ${value}`);
        }
      }
    },
  });

  // Heart rate chart
  const heartRateChart = new Chart(document.getElementById("heartRateChart"), {
    type: "line",
    data: {
      labels: heartRateData.labels,
      datasets: [
        {
          label: "Heart Rate (bpm)",
          data: heartRateData.values,
          borderColor: "#3aa6ff",
          tension: 0.3,
          pointRadius: heartRateData.values.map((v) => (v > 90 || v < 60 ? 6 : 3)),
          pointBackgroundColor: heartRateData.values.map((v) => (v > 90 || v < 60 ? "#ff0000" : "#3aa6ff")),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        annotation: {
          annotations: {
            normalRangeTop: {
              type: "line",
              yMin: 90,
              yMax: 90,
              borderColor: "#28a745",
              borderWidth: 2,
              borderDash: [6, 6],
            },
            normalRangeBottom: {
              type: "line",
              yMin: 60,
              yMax: 60,
              borderColor: "#28a745",
              borderWidth: 2,
              borderDash: [6, 6],
            },
          },
        },
      },
      scales: {
        y: {
          suggestedMin: 50,
          suggestedMax: 110,
        },
      },
      onClick: (e) => {
        const activePoints = heartRateChart.getElementsAtEventForMode(e, 'point', { intersect: true }, false);
        if (activePoints.length > 0) {
          const firstPoint = activePoints[0];
          const label = heartRateChart.data.labels[firstPoint.index];
          const value = heartRateChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
          alert(`Heart Rate on ${label}: ${value} bpm`);
        }
      }
    },
  });

  // Temperature chart
  const tempChart = new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: {
      labels: tempData.labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: tempData.values,
          borderColor: "#ff8c42",
          tension: 0.3,
          pointRadius: tempData.values.map((v) => (v > 37.2 || v < 36.1 ? 6 : 3)),
          pointBackgroundColor: tempData.values.map((v) => (v > 37.2 || v < 36.1 ? "#ff0000" : "#ff8c42")),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        annotation: {
          annotations: {
            normalRangeTop: {
              type: "line",
              yMin: 37.2,
              yMax: 37.2,
              borderColor: "#28a745",
              borderWidth: 2,
              borderDash: [6, 6],
            },
            normalRangeBottom: {
              type: "line",
              yMin: 36.1,
              yMax: 36.1,
              borderColor: "#28a745",
              borderWidth: 2,
              borderDash: [6, 6],
            },
          },
        },
      },
      scales: {
        y: {
          suggestedMin: 35.5,
          suggestedMax: 38.5,
        },
      },
      onClick: (e) => {
        const activePoints = tempChart.getElementsAtEventForMode(e, 'point', { intersect: true }, false);
        if (activePoints.length > 0) {
          const firstPoint = activePoints[0];
          const label = tempChart.data.labels[firstPoint.index];
          const value = tempChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
          alert(`Temperature on ${label}: ${value}°C`);
        }
      }
    },
  });
});