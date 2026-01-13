const backendURL = "http://localhost:5000/api/courses";

document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const semester = localStorage.getItem("semester");

  // Hide admin forms
  if (role !== "admin") {
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");
  }

  fetch(`${backendURL}?role=${role}&branch=${branch}&semester=${semester}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#courseTable tbody");
      tbody.innerHTML = "";

      data.forEach((course, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${course.course_code}</td>
          <td>${course.course_name}</td>
          <td>${course.L}</td>
          <td>${course.T}</td>
          <td>${course.P}</td>
          <td>${course.credits}</td>
          ${role === "admin" ? `<td><button onclick="deleteCourse(${course.id})">Delete</button></td>` : ""}
        `;

        tbody.appendChild(row);
      });
    });
});

// DELETE
function deleteCourse(id) {
  if (confirm("Delete this course?")) {
    fetch(`${backendURL}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => location.reload());
  }
}

// ADD COURSE (ADMIN)
const addForm = document.getElementById("addCourseForm");
if (addForm) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const branch = localStorage.getItem("branch");
    const semester = localStorage.getItem("semester");

    const newCourse = {
      course_code: document.getElementById("course_code").value,
      course_name: document.getElementById("course_name").value,
      L: document.getElementById("L").value,
      T: document.getElementById("T").value,
      P: document.getElementById("P").value,
      credits: document.getElementById("credits").value,
      branch,
      semester
    };

    fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse)
    })
      .then(res => res.json())
      .then(() => location.reload());
  });
}
