const calendarGrid = document.getElementById('calendarGrid');
const monthLabel = document.getElementById('monthLabel');
const selectedLabel = document.getElementById('selectedLabel');
const selectedNote = document.getElementById('selectedNote');
const anniversaryList = document.getElementById('anniversaryList');
const memoryModal = document.getElementById('memoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

const memoryEntries = {
  '2024-08-09': ['Started the memory calendar project.'],
  '2025-08-09': ['Visited a museum with friends.', 'Tried a new recipe.'],
  '2023-12-25': ['Holiday celebration with family.'],
  '2022-07-04': ['Summer picnic and fireworks.'],
  '2021-10-31': ['Halloween costume party.'],
  '2020-01-01': ['New Year goals written down.'],
  '2026-05-01': ['Wrapped up the pink memory calendar run.']
};

const anniversaryEntries = {
  '08-09': ['2024 — Project began', '2025 — Friends trip', '2026 — Demo opened'],
  '12-25': ['2023 — Holiday celebration'],
  '07-04': ['2022 — Summer picnic and fireworks'],
  '10-31': ['2021 — Halloween costume party'],
  '01-01': ['2020 — New Year goals written down']
};

const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 4, 1);
let currentDate = new Date(2025, 4, 1);
let selectedDate = new Date(2025, 4, 1);

function updateNavigationButtons() {
  prevMonth.disabled = currentDate.getFullYear() === minDate.getFullYear() && currentDate.getMonth() === minDate.getMonth();
  nextMonth.disabled = currentDate.getFullYear() === maxDate.getFullYear() && currentDate.getMonth() === maxDate.getMonth();
}

function setScreenReaderDate(date) {
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  selectedLabel.textContent = dateLabel;
}

function renderCalendar(date) {
  calendarGrid.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthLabel.textContent = firstOfMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });

  const totalCells = startDay + daysInMonth;
  const rows = Math.ceil(totalCells / 7);
  const calendarDays = rows * 7;

  for (let i = 0; i < calendarDays; i += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'day-cell';
    const dayNumber = i - startDay + 1;

    if (i < startDay || dayNumber > daysInMonth) {
      cell.classList.add('inactive');
      cell.disabled = true;
      calendarGrid.appendChild(cell);
      continue;
    }

    const cellDate = new Date(year, month, dayNumber);
    cell.textContent = dayNumber;

    if (isSameDay(cellDate, new Date())) {
      cell.classList.add('today');
    }

    if (isSameDay(cellDate, selectedDate)) {
      cell.classList.add('selected');
    }

    cell.addEventListener('click', () => {
      selectedDate = cellDate;
      setScreenReaderDate(cellDate);
      refreshSelectedInfo();
      showMemoryModal(cellDate);
      renderCalendar(currentDate);
    });

    calendarGrid.appendChild(cell);
  }
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function showMemoryModal(date) {
  const isoKey = date.toISOString().slice(0, 10);
  const memories = memoryEntries[isoKey] || [];
  modalTitle.textContent = `Memories for ${date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`;
  modalBody.innerHTML = '';

  if (memories.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No memories saved for this date yet. Feel free to remember something special.';
    modalBody.appendChild(empty);
  } else {
    memories.forEach((memory, index) => {
      const item = document.createElement('div');
      item.className = 'memory-item';
      item.innerHTML = `<strong>Memory ${index + 1}</strong><span>${memory}</span>`;
      modalBody.appendChild(item);
    });
  }

  memoryModal.classList.remove('hidden');
}

function closeMemoryModal() {
  memoryModal.classList.add('hidden');
}

function refreshSelectedInfo() {
  setScreenReaderDate(selectedDate);
  const subText = `Tap a date to open its memory popup.`;
  selectedNote.textContent = subText;
  renderAnniversaryList(selectedDate);
}

function renderAnniversaryList(date) {
  anniversaryList.innerHTML = '';
  const monthDay = date.toISOString().slice(5, 10);
  const anniversaries = anniversaryEntries[monthDay] || [];

  if (anniversaries.length === 0) {
    const listItem = document.createElement('li');
    listItem.textContent = 'No past anniversaries found for this day yet.';
    anniversaryList.appendChild(listItem);
    return;
  }

  anniversaries.forEach((entry) => {
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    anniversaryList.appendChild(listItem);
  });
}

prevMonth.addEventListener('click', () => {
  const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  if (nextDate >= minDate) {
    currentDate = nextDate;
    renderCalendar(currentDate);
    updateNavigationButtons();
  }
});

nextMonth.addEventListener('click', () => {
  const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  if (nextDate <= maxDate) {
    currentDate = nextDate;
    renderCalendar(currentDate);
    updateNavigationButtons();
  }
});

closeModal.addEventListener('click', closeMemoryModal);
memoryModal.addEventListener('click', (event) => {
  if (event.target === memoryModal) {
    closeMemoryModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !memoryModal.classList.contains('hidden')) {
    closeMemoryModal();
  }
});

function createHeartBackground(count = 40) {
  const container = document.querySelector('.heart-background');
  if (!container) return;
  container.innerHTML = '';
  const hearts = ['💖', '💝'];
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const size = 1.4 + Math.random() * 1.8;
    heart.style.fontSize = `${size}rem`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 8}s`;
    heart.style.animationDelay = `-${Math.random() * 10}s`;
    heart.style.opacity = `${0.24 + Math.random() * 0.2}`;
    container.appendChild(heart);
  }
}

window.addEventListener('resize', () => createHeartBackground(40));

selectedDate = new Date(currentDate.getTime());
refreshSelectedInfo();
renderCalendar(currentDate);
updateNavigationButtons();
createHeartBackground(40);
