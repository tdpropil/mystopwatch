let timer;
let milliseconds = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsContainer = document.getElementById('laps');
const lapSection = document.getElementById('lapSection');

// Update the display with the current time in hours, minutes, seconds, and milliseconds
function updateDisplay() {
    const hours = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    const ms = String(milliseconds % 1000).padStart(3, '0');
    display.textContent = `${hours}:${minutes}:${seconds}.${ms}`;
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        lapResetBtn.textContent = 'Lap';

        timer = setInterval(() => {
            milliseconds += 10; // Increment by 10 milliseconds
            updateDisplay();
        }, 10);
    }
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    lapResetBtn.textContent = 'Reset';
});

// Add a new lap
function addLap(lapTime) {
    lapCount++;
    const totalTime = display.textContent; // Current total time
    const lapRow = document.createElement('tr');
    lapRow.innerHTML = `
        <td>${lapCount}</td>
        <td>${lapTime}</td>
        <td>${totalTime}</td>
    `;
    lapsContainer.appendChild(lapRow);
    lapSection.style.display = 'block'; // Show lap section
}

// Handle the lap and reset button functionality
lapResetBtn.addEventListener('click', () => {
    if (isRunning) {
        // Record lap time
        const lapTime = display.textContent;
        addLap(lapTime);
    } else {
        // Reset stopwatch
        milliseconds = 0;
        updateDisplay();
        lapsContainer.innerHTML = ''; // Clear laps
        lapCount = 0; // Reset lap count
        lapSection.style.display = 'none'; // Hide lap section
        lapResetBtn.textContent = 'Lap'; // Reset button text
    }
});

// Initial display setup
updateDisplay();
