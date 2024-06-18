var isRunning = false;
var timerType = 'pomodoro';
var duration = 25 * 60;
var intervalId;
// DOM elements
var timerDisplay = document.getElementById('timer');
var timerBtn = document.getElementById('timerBtn');
var shortBreakBtn = document.getElementById('shortBreakBtn');
var longBreakBtn = document.getElementById('longBreakBtn');
var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
// Update timer display
function updateDisplay(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    timerDisplay.textContent = "".concat(minutes, ":").concat(remainingSeconds < 10 ? '0' : '').concat(remainingSeconds);
}
var state;
(function (state) {
    state["pomodoro"] = "pomodoro";
    state["shortBreak"] = "shortBreak";
    state["longBreak"] = "longBreak";
})(state || (state = {}));
var currentState = state.pomodoro;
function updateButtonStyles() {
    // First, remove the hover style class from all buttons
    var selectClass = 'bg-gray-600';
    [timerBtn, shortBreakBtn, longBreakBtn].forEach(function (btn) {
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
        intervalId = window.setInterval(function () {
            if (duration > 0) {
                duration--;
                updateDisplay(duration);
            }
            else {
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
function setTimerType(type) {
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
    }
    else {
        startTimer();
    }
}
// Event listeners
timerBtn.addEventListener('click', function () { return setTimerType('pomodoro'); });
shortBreakBtn.addEventListener('click', function () { return setTimerType('shortBreak'); });
longBreakBtn.addEventListener('click', function () { return setTimerType('longBreak'); });
startBtn.addEventListener('click', startSwag);
resetBtn.addEventListener('click', resetTimer);
// Initialize
updateDisplay(duration);
