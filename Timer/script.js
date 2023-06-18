const selectors = {
  minutesEl: "#minutes",
  secondsEl: "#seconds",
  millisecondsEl: "#milliseconds",
  startBtn: "#startBtn",
  pauseBtn: "#pauseBtn",
  resumeBtn: "#resumeBtn",
  resetBtn: "#resetBtn",
};

const minutesEl = document.querySelector(selectors.minutesEl);
const secondsEl = document.querySelector(selectors.secondsEl);
const millisecondsEl = document.querySelector(selectors.millisecondsEl);
const startBtn = document.querySelector(selectors.startBtn);
const pauseBtn = document.querySelector(selectors.pauseBtn);
const resumeBtn = document.querySelector(selectors.resumeBtn);
const resetBtn = document.querySelector(selectors.resetBtn);

let interval;
let milisseconds = 0;
let seconds = 0;
let minutes = 0;
let isPaused = false;

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  interval = setInterval(() => {
    if (!isPaused) {
      milisseconds += 10;

      if (milisseconds === 1000) {
        seconds++;
        milisseconds = 0;
      }

      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      millisecondsEl.textContent = formatMilisseconds(milisseconds);
    }
  }, 10);

  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  resetBtn.style.display = "block";
}

function pauseTimer() {
  isPaused = true;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";

  minutesEl.style.color = "#767a83";
  secondsEl.style.color = "#767a83";
  millisecondsEl.style.color = "#767a83"
}

function resumeTimer() {
  isPaused = false;
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "block";

  minutesEl.style.color = "#f1f1f1";
  secondsEl.style.color = "#f1f1f1";
  millisecondsEl.style.color = "#f1f1f1";
}

function resetTimer() {
  clearInterval(interval);

  milisseconds = 0;
  seconds = 0;
  minutes = 0;

  minutesEl.textContent = `00`;
  secondsEl.textContent = `00`;
  millisecondsEl.textContent = `000`;

  resetBtn.style.display = "none";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
  startBtn.style.display = "block";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilisseconds(time) {
  return time < 100 ? `${time}`.padStart(3, "0") : time;
}
