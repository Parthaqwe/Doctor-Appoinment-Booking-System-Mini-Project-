window.onload = async function() {
  try {
    const res = await fetch("http://localhost:5000/api/appointments");
    const appointments = await res.json();

    const appointmentsList = document.getElementById("appointments-list");
    appointmentsList.innerHTML = "";

    appointments.forEach(appointment => {
      const item = document.createElement("div");
      item.classList.add("appointment-item");
      item.innerHTML = `
        <div class="info">
          <p><strong>Patient:</strong> ${appointment.patientName}</p>
          <p><strong>Time:</strong> ${new Date(appointment.appointmentTime).toLocaleString()}</p>
        </div>
        <div class="actions">
          <button onclick="updateStatus(${appointment.id}, 'Accepted')">Accept</button>
          <button onclick="updateStatus(${appointment.id}, 'Denied')">Deny</button>
          <p class="status">Status: <span id="status-${appointment.id}">${appointment.status}</span></p>
        </div>
      `;
      appointmentsList.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading appointments:", err);
  }
};

async function updateStatus(id, status) {
  document.getElementById(`status-${id}`).textContent = status;
  document.getElementById(`status-${id}`).style.color = status === 'Accepted' ? 'green' : 'red';

  await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}

function editProfile() {
  document.getElementById('edit-profile-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('edit-profile-modal').style.display = 'none';
}

function saveProfile() {
  document.getElementById('doctor-name').textContent = document.getElementById('doctor-name-input').value;
  document.getElementById('doctor-degree').textContent = document.getElementById('doctor-degree-input').value;
  closeModal();
}

  