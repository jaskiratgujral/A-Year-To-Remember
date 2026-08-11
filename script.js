const calendarGrid = document.getElementById('calendarGrid');
const calendarTitle = document.getElementById('calendarTitle');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const landingScreen = document.getElementById('landingScreen');
const archiveShell = document.getElementById('archiveShell');
const enterButton = document.getElementById('enterButton');
const todayCard = document.getElementById('todayCard');
const memoryModal = document.getElementById('memoryModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const bows = document.getElementById('bows');
const gameMessage = document.getElementById('gameMessage');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthStarts = [];
for (let year = 2025; year <= 2026; year += 1) {
  for (let month = 0; month < 12; month += 1) {
    if (year === 2025 && month < 4) continue;
    if (year === 2026 && month > 4) break;
    monthStarts.push(new Date(year, month, 1));
  }
}

const memoryEntries = {
  '2025-08-03': {
    icon: '🥰',
    title: 'Our favourite photo of you',
    text: 'You went to the mall and "stole" make up from nykaa and sephora, and looked gorgeous doing it, and after it.',
    littleThing: 'The beauty of all 10/10 humans who live and have ever lived will never surpass the beauty that is you',
    quote: 'Darling you have no competition here. She never will.',
    photos: ['photos/aug-03-2025/IMG-20260317-WA0047.jpg'],
    type: 'The perfect photo'
  },
  '2025-05-17': {
    icon: '🎀',
    title: 'A memory worth keeping',
    text: 'Kept for five years, this memory became the planted seed of our beautiful relationship. We did not realise it then, but you discovering that card while cleaning your room changed our lives completely.',
    littleThing: 'The card now sits with new memories it helped create.',
    quote: 'Heart Of Gold',
    photos: ['photos/may-17-2025/17 May 2025.jpg'],
    type: 'The beginning'
  },
  '2026-02-14': {
    icon: '💌',
    title: 'A day of love',
    text: 'A day about love, gestures, fixing things, and loving over everything else',
    littleThing: 'I can never forget the photo you put up on your story, and the happiness on your face when you saw the crochet flowers, the chips, the choccy, the golden rose, and everything I sent you <3 ',
    quote: "Happy Valentine's Day, my darling <3",
    photos: ['photos/Feb-14-26/IMG-20260214-WA0025 (1).jpg'],
    type: 'Long distance anniversaries'
  },
  '2025-06-04': {
    icon: '📸',
    title: 'The first photo I took of you on gmee',
    text: 'It didn\'t feel grand or big at the moment I took it, but this photo became the first in so many I would cherish, love and save to keep coming back to ',
    littleThing: 'The way you look at me, the little smile growing on your lips, the hand under your chin, make this photo adorable',
    quote: '“Freeze, i\'m taking a photo”',
    photos: ['photos/jun-04-2025/IMG20250604011347.jpg'],
    type: 'small everyday moments that make history'
  },
  '2025-05-18': {
    icon: '📷',
    title: 'A memory preserved in a photograph',
    text: 'You sent this photograph to me after I told you about the dress you were wearing on the night of a Diwali party, and how you left my mouth open and left me a blubbering idiot with how beautiful you looked',
    littleThing: 'You sent this photo to try and help me identify the dress, and it became a memory because you wanted me to see a view that I have always cherished in my memory, again.',
    quote: '“You left me speechless”',
    photos: ['photos/may 18 2025/IMG-20250518-WA0056.jpg'],
    type: 'small everyday moments that make history'
  },
  '2025-12-08': {
    icon: '🎓',
    title: 'The day you graduated',
    text: 'I sat a quarterway across the world, watching you get decorated for your landmark achievement. You sent the link for the video from amizone, and I watched, mesmerised as I saw you looking gorgeous and discover that you had won gold. I will always be proud of your achievements, my darling.',
    littleThing: 'Even though I had the tiniest view of you, I felt like I was in that auditorium with you. They probably would have kicked me out and called a noise complaint on me if I was actually there.',
    quote: '“My baby will always get gold, all her life. You attract gold, my darling”',
    photos: ['photos/dec-08-2025/IMG-20251217-WA0004.jpg'],
    type: 'Milestones and achievements'
  },
  '2025-05-20': {
    icon: '📷',
    title: 'Your first ever gallery showcase',
    text: 'Your first burst of photographs that filled my gallery and my heart with you. It was your housewarming ceremony in my life and my heart, and it manifests physically in my phone\'s gallery as a transition from a boring life without you to the most adventurous life i\'ve ever had.',
    littleThing: 'The way you looked in each photo, how gorgeous, how beautiful, how perfect, pretty and happy you looked, made you cemented in my heart as the most perfect person on the whole planet.',
    quote: '“I could stare at these photos forever”',
    photos: ['photos/may-20-2025/IMG-20251018-WA0004.jpg'],
    type: 'small everyday moments that make history'
  },
  '2026-01-01': {
    icon: '🎉',
    title: 'A New and better year',
    text: 'Fighting my dad to come to your house, drinking whiskey and vodka getting ready to dance, looking our best and spraying your hair with golden glitter, you in that beautiful studded netting dress and gorgeous skirt with stockings, carrying your flats with me for when your feet hurt, accidentally revealing our relationship to random NCS people, you having fun while Nandini scolded me, sleeping together after the longest night, mcdonalds for breakfast. I can never, ever froget this day.',
    littleThing: 'Kissing you at midnight.',
    quote: '“Happy New Year, my darling.”',
    photos: ['photos/may-20-2025/jan-01-2026/IMG-20260101-WA0101.jpg'],
    type: 'Short distance anniversaries'
  },
  '2026-03-21': {
    icon: '🎀',
    title: 'A little spring promise',
    text: 'You were carrying so much, and still there was this tender brightness that peeked through. It felt important to keep.',
    littleThing: 'A small thing said in passing that felt like a promise not to disappear.',
    quote: '“I want to remember this feeling.”',
    photos: ['photos/mar-21-2026/IMG-20260321-WA0001.jpg'],
    type: 'special milestone'
  },
  '2026-04-30': {
    icon: '📷',
    title: 'The last evening before May',
    text: 'The light was soft and the air felt kind. The day held a quiet sort of tenderness that didn’t need to be explained.',
    littleThing: 'The way the evening seemed to slow down just enough for us to notice it.',
    quote: '“It felt like a soft place to land.”',
    photos: ['photos/apr-30-2026/IMG-20260430-WA0001.jpg'],
    type: 'photograph memory'
  },
  '2026-05-02': {
    icon: '🌷',
    title: 'A gentle beginning to the month',
    text: 'The beginning of a new month felt tender and calm. It was one of those small thresholds that quietly mattered.',
    littleThing: 'A brief pause where everything felt still enough to breathe.',
    quote: '“I think I want to keep this one.”',
    photos: ['photos/may-02-01.svg'],
    type: 'special milestone'
  }
};

let currentMonthIndex = 0;
let selectedDate = null;
const earliestClickableDate = new Date(2025, 4, 17);

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function updateNavigationButtons() {
  prevMonthButton.disabled = currentMonthIndex === 0;
  nextMonthButton.disabled = currentMonthIndex === monthStarts.length - 1;
}

function renderCalendar() {
  calendarGrid.innerHTML = '';
  const currentDate = monthStarts[currentMonthIndex];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startDay = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarTitle.textContent = `${monthNames[month]} ${year}`;

  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

  for (let index = 0; index < totalCells; index += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-day';

    const dayNumber = index - startDay + 1;
    if (index < startDay || dayNumber > daysInMonth) {
      cell.classList.add('inactive');
      cell.disabled = true;
      calendarGrid.appendChild(cell);
      continue;
    }

    const cellDate = new Date(year, month, dayNumber);
    const dayKey = formatDateKey(cellDate);
    const isBeforeLaunch = cellDate < earliestClickableDate;
    const memory = isBeforeLaunch ? null : memoryEntries[dayKey];
    const iconHtml = memory && memory.icon ? `<span class="day-icon">${memory.icon}</span>` : '';

    cell.innerHTML = `<span class="day-number">${dayNumber}</span>${iconHtml}`;

    if (memory) {
      cell.classList.add('has-memory');
    }

    if (selectedDate && isSameDay(cellDate, selectedDate)) {
      cell.classList.add('selected');
    }

    if (isBeforeLaunch) {
      cell.classList.add('before-launch');
      cell.disabled = true;
    } else {
      cell.addEventListener('click', () => {
        if (!memory) return;
        selectedDate = cellDate;
        openMemory(cellDate, memory);
        renderCalendar();
      });
    }

    calendarGrid.appendChild(cell);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function openMemory(date, entry) {
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const photoMarkup = entry.photos && entry.photos.length > 0
    ? `
      <div class="memory-gallery">
        <img class="memory-image" src="${entry.photos[0]}" alt="${escapeHtml(entry.title)}" />
        ${entry.photos.length > 1 ? `<div class="thumb-row">${entry.photos.map((photo, index) => `<button class="thumb-button" type="button" data-photo="${photo}" aria-label="View photo ${index + 1}"><img src="${photo}" alt="${escapeHtml(entry.title)} ${index + 1}" /></button>`).join('')}</div>` : ''}
      </div>
    `
    : '';

  const quoteMarkup = entry.quote ? `<blockquote>“${escapeHtml(entry.quote)}”</blockquote>` : '';
  const littleThingMarkup = entry.littleThing ? `<div class="memory-block"><h4>A little thing I kept</h4><p class="memory-note">${escapeHtml(entry.littleThing)}</p></div>` : '';
  const noteMarkup = entry.note ? `<div class="memory-block"><h4>A note for you</h4><p class="memory-note">${escapeHtml(entry.note)}</p></div>` : '';
  const callMarkup = entry.callInfo ? `<p class="memory-call">${escapeHtml(entry.callInfo)}</p>` : '';

  modalContent.innerHTML = `
    <article class="memory-card">
      <p class="memory-label">${escapeHtml(dateLabel)}</p>
      <h3 class="memory-title">${escapeHtml(entry.title)}</h3>
      <p class="memory-text">${escapeHtml(entry.text)}</p>
      ${photoMarkup}
      ${littleThingMarkup}
      ${quoteMarkup}
      ${noteMarkup}
      ${callMarkup}
    </article>
  `;

  memoryModal.classList.remove('hidden');

  modalContent.querySelectorAll('.thumb-button').forEach((button) => {
    button.addEventListener('click', () => {
      const image = modalContent.querySelector('.memory-image');
      if (image) {
        image.src = button.dataset.photo;
      }
    });
  });
}

function closeMemory() {
  memoryModal.classList.add('hidden');
}

function renderTodayCard() {
  const today = new Date();
  const todayKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const onThisDayEntries = Object.entries(memoryEntries)
    .filter(([key]) => key.slice(5) === todayKey && Number(key.slice(0, 4)) < today.getFullYear())
    .sort(([left], [right]) => Number(right.slice(0, 4)) - Number(left.slice(0, 4)));

  if (onThisDayEntries.length === 0) {
    todayCard.innerHTML = '<h3>On this day</h3><p>There is no archive memory for this date from a previous year yet, but there is always room for one more.</p>';
    return;
  }

  const [matchKey, matchEntry] = onThisDayEntries[0];
  const matchDate = new Date(`${matchKey.slice(0, 4)}-${matchKey.slice(5, 7)}-${matchKey.slice(8, 10)}`);
  todayCard.innerHTML = `
    <h3>On this day</h3>
    <p>${matchDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} — ${escapeHtml(matchEntry.title)}.</p>
    <p>${escapeHtml(matchEntry.text)}</p>
  `;
}

function renderBows() {
  const messages = [
    'You will always be my north star',
    'You are my favourite person',
    'You taught me what love feels like',
    'You have the cutest mannerisms in the world, my darling'
  ];

  bows.innerHTML = '';
  messages.forEach((message, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'bow-button';
    button.textContent = ['🎀', '🌷', '💌', '✨'][index];
    button.addEventListener('click', () => {
      document.querySelectorAll('.bow-button').forEach((bow) => bow.classList.remove('is-active'));
      button.classList.add('is-active');
      gameMessage.textContent = message;
    });
    bows.appendChild(button);
  });
}

enterButton.addEventListener('click', () => {
  landingScreen.classList.add('is-hidden');
  archiveShell.classList.remove('hidden');
  setTimeout(() => {
    landingScreen.style.display = 'none';
  }, 600);
});

prevMonthButton.addEventListener('click', () => {
  if (currentMonthIndex > 0) {
    currentMonthIndex -= 1;
    updateNavigationButtons();
    renderCalendar();
  }
});

nextMonthButton.addEventListener('click', () => {
  if (currentMonthIndex < monthStarts.length - 1) {
    currentMonthIndex += 1;
    updateNavigationButtons();
    renderCalendar();
  }
});

closeModal.addEventListener('click', closeMemory);
memoryModal.addEventListener('click', (event) => {
  if (event.target === memoryModal) {
    closeMemory();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !memoryModal.classList.contains('hidden')) {
    closeMemory();
  }
});

function createEmojiRain() {
  const rainContainer = document.getElementById('emojiRain');
  if (!rainContainer) return;

  const emojis = ['💝', '💖', '🎀', '❤️', '🥰'];
  const count = 36;
  rainContainer.innerHTML = '';

  for (let i = 0; i < count; i += 1) {
    const emoji = document.createElement('span');
    emoji.textContent = emojis[i % emojis.length];
    const size = 0.9 + Math.random() * 0.9;
    emoji.style.fontSize = `${size}rem`;
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDuration = `${6 + Math.random() * 6}s`;
    emoji.style.animationDelay = `${-Math.random() * 8}s`;
    emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
    emoji.style.opacity = `${0.55 + Math.random() * 0.25}`;
    emoji.style.top = `${-Math.random() * 30}vh`;
    emoji.style.animationTimingFunction = 'linear';
    rainContainer.appendChild(emoji);
  }
}

renderTodayCard();
renderBows();
updateNavigationButtons();
renderCalendar();
createEmojiRain();
