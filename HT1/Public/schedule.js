document.addEventListener("DOMContentLoaded", () => {
  const scheduleContainer = document.getElementById("schedule");

  async function fetchClasses() {
    const response = await fetch('/api/classes');
    return response.json();
  }

  async function enroll(classId) {
    await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classId }),
    });
    renderSchedule();
  }

  async function cancel(classId) {
    await fetch('/api/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classId }),
    });
    renderSchedule();
  }

  async function renderSchedule() {
    const classes = await fetchClasses();
    scheduleContainer.innerHTML = '';

    classes.forEach((classItem) => {
      const isFull = classItem.currentParticipants >= classItem.maxParticipants;

      const card = document.createElement('div');
      card.className = 'col-md-4';

      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${classItem.name}</h5>
            <p class="card-text">Время: ${classItem.time}</p>
            <p class="card-text">Записано: ${classItem.currentParticipants} из ${classItem.maxParticipants}</p>
            <button class="btn btn-primary w-100 mb-2" ${
              isFull ? 'disabled' : ''
            } onclick="enroll(${classItem.id})">Записаться</button>
            <button class="btn btn-danger w-100" ${
              classItem.currentParticipants === 0 ? 'disabled' : ''
            } onclick="cancel(${classItem.id})">Отменить запись</button>
          </div>
        </div>
      `;

      scheduleContainer.append(card);
    });
  }

  window.enroll = enroll;
  window.cancel = cancel;

  renderSchedule();
});
