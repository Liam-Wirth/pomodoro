let isRunning = false;
let timerType = 'pomodoro';
let duration = 25 * 60;

let intervalId: number | undefined;

// DOM elements
const timerDisplay = document.getElementById('timer') as HTMLElement;
const timerBtn = document.getElementById('timerBtn') as HTMLElement;
const shortBreakBtn = document.getElementById('shortBreakBtn') as HTMLElement;
const longBreakBtn = document.getElementById('longBreakBtn') as HTMLElement;
const startBtn = document.getElementById('startBtn') as HTMLElement;
const resetBtn = document.getElementById('resetBtn') as HTMLElement;

// Update timer display
function updateDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
enum state {
    pomodoro = 'pomodoro',
    shortBreak = 'shortBreak',
    longBreak = 'longBreak'
}

let currentState: state = state.pomodoro;

function updateButtonStyles() {
    // First, remove the hover style class from all buttons
    const selectClass= 'bg-gray-600'; 
    [timerBtn, shortBreakBtn, longBreakBtn].forEach(btn => {
      btn.classList.remove(selectClass);
    });
  
    // Then, add the hover style class to the button matching the current state
    switch (currentState) {
      case state.pomodoro:
        timerBtn.classList.add(selectClass);
        break;
      case state.shortBreak:
        shortBreakBtn.classList.add(selectClass);
        break;
      case state.longBreak:
        longBreakBtn.classList.add(selectClass);
        break;
    }
  }

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    intervalId = window.setInterval(() => {
      if (duration > 0) {
        duration--;
        updateDisplay(duration);
      } else {
        stopTimer();
        alert('Time is up!');
      }
    }, 1000);
  }
}

// Stop timer
function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
    isRunning = false;
  }
}

// Reset timer
function resetTimer() {
  stopTimer();
  switch (timerType) {
    case 'pomodoro':
      duration = 25 * 60;
      break;
    case 'shortBreak':
      duration = 5 * 60;
      break;
    case 'longBreak':
      duration = 15 * 60;
      break;
  }
  updateDisplay(duration);
}

// Set timer type
function setTimerType(type: string) {
  timerType = type;
  resetTimer();
  updateButtonStyles();
}

function startSwag() {
    // Fade out the button text

    // Wait for the fade-out animation to complete
        // Change the button text
        startBtn.textContent = startBtn.textContent === 'Start' ? 'Pause' : 'Start';

        // Fade the button text back in
        startBtn.classList.remove('opacity-0');

        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
}

// Event listeners
timerBtn.addEventListener('click', () => setTimerType('pomodoro'));
shortBreakBtn.addEventListener('click', () => setTimerType('shortBreak'));
longBreakBtn.addEventListener('click', () => setTimerType('longBreak'));
startBtn.addEventListener('click', startSwag);
resetBtn.addEventListener('click', resetTimer);

// Initialize
updateDisplay(duration);