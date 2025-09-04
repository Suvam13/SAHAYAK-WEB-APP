document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const deviceInput = document.getElementById("deviceId");
  const passwordInput = document.getElementById("password");
  const message = document.getElementById("message");

  const sampleDeviceId = "101"; // sample device ID
  const samplePassword = "1234"; // sample password

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const enteredId = deviceInput.value.trim();
    const enteredPassword = passwordInput.value;

    if (enteredId === sampleDeviceId && enteredPassword === samplePassword) {
      // Correct login
      window.location.href = "dashboard.html";
    } else {
      message.textContent = "Wrong Device ID or Password. Please try again.";
      message.style.color = "red";
      deviceInput.value = "";
      passwordInput.value = "";
      deviceInput.focus();
    }
  });
});
