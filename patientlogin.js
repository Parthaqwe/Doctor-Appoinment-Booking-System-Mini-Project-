document.getElementById("patient-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const patientData = {
    fullname: document.getElementById("fullname").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirm-password").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value
  };

  if (patientData.password !== patientData.confirmPassword) {
    return alert("Passwords do not match!");
  }

  try {
    const res = await fetch("http://localhost:5000/api/patient/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
      window.location.href = "patientL.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Registration error. Try again.");
  }
});
