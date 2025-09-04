document.addEventListener("DOMContentLoaded", () => {

    const heartRateEl = document.getElementById("heartRate");
    const tempEl = document.getElementById("temperature");
    const statusEl = document.getElementById("status");

    const blob = document.querySelector(".blob");
    const statusPill = document.querySelector(".status-pill");
    const pillTitle = document.querySelector(".pill-title");
    const heroHeading = document.querySelector(".hero-copy h1");
    const btn = document.getElementById("fallButton"); // use new button ID

    // --- Mock data for testing ---
    let isFallen = false;

    function updateUI(data) {
        heartRateEl.textContent = data.pulse;
        tempEl.textContent = data.temp + "°C";
        statusEl.textContent = data.status;

        if(data.status === "Fallen") {
            // Fall state
            blob.style.background = "radial-gradient(500px 340px at 75% 35%, #ff3333 0%, #ff5c5c 30%, #ff7f7f 55%, #ff9f9f 75%, #ffbfbf 95%)";
            statusPill.style.background = "radial-gradient(circle, #ff4d4d, #cc0000)";
            pillTitle.textContent = "(( FALLEN ))";
            const now = new Date();
            heroHeading.textContent = `Fall detected at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;

            // Show Noticed? button
            btn.style.display = "inline-block";
            btn.textContent = "Noticed?";
            btn.style.background = "#ff4d4d";
            btn.style.color = "#ffffff";
        } else {
            // Safe state
            blob.style.background = "radial-gradient(500px 340px at 75% 35%, #4aa1d4, #5ab0e0, #7bc4ee, #98d7fb, #c6ecff)";
            statusPill.style.background = "radial-gradient(280px 180px at 75% 35%, #0f5bd7, #1f7bff, #3aa6ff, #7bc4ff, #c9ecff)";
            pillTitle.textContent = "(( SAFE ))";
            heroHeading.innerHTML = `
                <span>Stay</span><br/>
                <span>Alert. Stay</span><br/>
                <span>Connected.</span>`;
            
            // Hide button when safe
            btn.style.display = "none";
        }
    }

    // --- Button click resets to safe ---
    btn.addEventListener("click", () => {
        const safeData = {
            pulse: 72,
            temp: 30,
            status: "Normal"
        };
        updateUI(safeData);
    });

    // --- Simulate data changing every 3 seconds for testing ---
    setInterval(() => {
        isFallen = !isFallen; // toggle between normal/fallen
        const mockData = {
            pulse: isFallen ? 180 : 72,
            temp: 30,
            status: isFallen ? "Fallen" : "Normal"
        };
        updateUI(mockData);
    }, 3000);

});
