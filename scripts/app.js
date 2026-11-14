const els = {
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  ampm: document.getElementById('ampm'),
  dayName: document.getElementById('day-name'),
  fullDate: document.getElementById('full-date'),
  timezone: document.getElementById('timezone'),
  toggle: document.getElementById('format-toggle'),
};

let is24Hour = true;

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (is24Hour) {
    els.hours.textContent = pad(hours);
    els.ampm.classList.add('hidden');
  } else {
    const am = hours < 12;
    const displayHours = hours % 12 || 12;
    els.hours.textContent = pad(displayHours);
    els.ampm.textContent = am ? 'AM' : 'PM';
    els.ampm.classList.remove('hidden');
  }

  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  els.dayName.textContent = days[now.getDay()];
  els.fullDate.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  els.timezone.textContent = tz.replace(/_/g, ' ');
}

els.toggle.addEventListener('click', () => {
  is24Hour = !is24Hour;
  els.toggle.textContent = is24Hour ? '24H' : '12H';
  els.toggle.setAttribute('aria-pressed', String(!is24Hour));
  updateClock();
});

updateClock();
setInterval(updateClock, 1000);
