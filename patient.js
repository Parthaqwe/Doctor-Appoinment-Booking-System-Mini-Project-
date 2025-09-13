// Restored and enhanced version of patient.js using buttons for specialties
window.onload = async function() {
  const res = await fetch("http://localhost:5000/api/doctors");
  const doctors = await res.json();
  const specialties = {};

  // Group doctors by specialty
  doctors.forEach(doc => {
    if (!specialties[doc.specialty]) specialties[doc.specialty] = [];
    specialties[doc.specialty].push(doc);
  });

  const container = document.querySelector(".specialty-cards");
  Object.keys(specialties).forEach(specialty => {
    const card = document.createElement("div");
    card.className = "specialty-card";
    card.setAttribute("data-specialty", specialty);

    card.innerHTML = `
      <h3>${capitalizeFirstLetter(specialty)}</h3>
      <p>Click to view doctors</p>
    `;

    card.addEventListener("click", () => {
      displayDoctors(specialties[specialty]);
      scrollToSection('doctor-selection');
    });

    container.appendChild(card);
  });
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayDoctors(doctors) {
  const doctorList = document.getElementById("doctor-list");
  const doctorSelectionSection = document.getElementById("doctor-selection");
  const doctorNameSelect = document.getElementById("doctor-name");
  const appointmentDetails = document.getElementById("appointment-details");

  doctorList.innerHTML = "";
  doctorNameSelect.innerHTML = "<option value=''>Select Doctor</option>";
  appointmentDetails.style.display = "none";

  doctors.forEach(doctor => {
    const doctorItem = document.createElement("div");
    doctorItem.classList.add("doctor-item");

    const doctorName = document.createElement("div");
    doctorName.classList.add("doctor-name");
    doctorName.textContent = doctor.name;

    const doctorDetails = document.createElement("p");
    doctorDetails.textContent = `${doctor.experience} years of experience | ${doctor.degree || doctor.education}`;

    const selectButton = document.createElement("button");
    selectButton.textContent = "Select Doctor";
    selectButton.addEventListener("click", () => {
      selectDoctor(doctor);
      scrollToSection('appointment-details');
    });

    doctorItem.appendChild(doctorName);
    doctorItem.appendChild(doctorDetails);
    doctorItem.appendChild(selectButton);

    doctorList.appendChild(doctorItem);
  });

  doctorSelectionSection.style.display = "block";
}

function selectDoctor(doctor) {
  const doctorNameSelect = document.getElementById("doctor-name");
  const appointmentDetails = document.getElementById("appointment-details");

  const option = document.createElement("option");
  option.value = doctor.id;
  option.textContent = doctor.name;

  doctorNameSelect.innerHTML = "";
  doctorNameSelect.appendChild(option);
  doctorNameSelect.value = doctor.id;

  appointmentDetails.style.display = "block";
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById("book-appointment").addEventListener("click", async function () {
  const doctorId = document.getElementById("doctor-name").value;
  const appointmentTime = document.getElementById("appointment-time").value;

  if (!doctorId || !appointmentTime) {
    alert("Please select a doctor and appointment time.");
    return;
  }

  const response = await fetch("http://localhost:5000/api/appointments", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctorId, appointmentTime })
  });

  const data = await response.json();
  alert(data.message || "Appointment booked with doctor ID " + doctorId);
});
