function showCreateProfileForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("profile-creation-form").style.display = "block";
}

function showLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("profile-creation-form").style.display = "none";
}

document.getElementById("login").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/doctor/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      window.location.href = "doctorpage.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Login failed. Please try again.");
  }
});

document.getElementById("profile-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const doctorData = {
    doctorName: document.getElementById("doctor-name").value,
    email: document.getElementById("email-create").value,
    dob: document.getElementById("dob").value,
    education: document.getElementById("education").value,
    experience: document.getElementById("experience").value,
    password: document.getElementById("password-create").value
  };

  try {
    const res = await fetch("http://localhost:5000/api/doctor/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData)
    });
    const data = await res.json();

    if (res.ok) {
      alert("Profile created successfully!");
      showLoginForm();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Profile creation failed. Try again.");
  }
});