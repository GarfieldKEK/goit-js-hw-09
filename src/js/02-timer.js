import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startDateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date();
    if (selectedDates[0] < now) {
      alert("Please choose a future date.");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownInterval;

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function updateCountdown(endDate) {
  const totalMs = endDate - new Date();

  if (totalMs < 0) {
    clearInterval(countdownInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(totalMs);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);

  if (totalMs <= 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
  }
}

function startCountdown() {
    startButton.disabled = true
  const selectedDate = startDateInput._flatpickr.selectedDates[0];
  if (!selectedDate) return;
  countdownInterval = setInterval(() => {
    updateCountdown(selectedDate);
  }, 1000);
}

flatpickr(startDateInput, options);
startDateInput.addEventListener("change", () => {
  const now = new Date();
  if (startDateInput._flatpickr.selectedDates[0] < now) {
    alert("Please choose a future date.");
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
});
startButton.addEventListener("click", startCountdown);
