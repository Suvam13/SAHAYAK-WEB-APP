// Get DOM elements
const locationDisplay = document.getElementById("location");
const shareCheckbox = document.getElementById("shareLocation");

// Function to fetch and display location
function fetchLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        locationDisplay.innerText = `Your current location: ${lat}, ${lon}`;
      },
      (error) => {
        locationDisplay.innerText =
          "Unable to fetch location. Please allow location access.";
      }
    );
  } else {
    locationDisplay.innerText = "Geolocation is not supported on this device.";
  }
}

// Function to clear location info
function clearLocation() {
  locationDisplay.innerText = "Location sharing is turned off.";
}

// Event listener: when checkbox is toggled
shareCheckbox.addEventListener("change", () => {
  if (shareCheckbox.checked) {
    fetchLocation();
  } else {
    clearLocation();
  }
});

// Initial load: check if sharing is enabled
if (shareCheckbox.checked) {
  fetchLocation();
} else {
  clearLocation();
}
