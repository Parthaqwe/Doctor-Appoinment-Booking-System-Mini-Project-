document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const email = document.getElementById("username_or_email").value;
    const password = document.getElementById("password").value;
  
    try {
      const res = await fetch("http://localhost:5000/api/patient/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
  
      if (res.ok) {
        alert("Login successful!");
        window.location.href = "patient.html";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed.");
    }
  });
