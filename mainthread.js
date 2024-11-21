const EHeader = document.getElementById('header');

if (window.Worker) {
  if (EHeader) {
    EHeader.innerHTML = ' Web Worker is working';
    console.log(Worker);
  }
} else {
  EHeader.innerHTML = 'Web Workers are not supported in this browser.';
}

// Main thread
const worker = new Worker('./workerthread.js');

// Elements for input and output
const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const output = document.getElementById('output');

// Start the worker
startBtn.addEventListener('click', () => {
  const range = { start: 2, end: 1_000_000 };
  worker.postMessage(range);
  output.textContent = 'Calculating...';
});

// Cancel the worker
cancelBtn.addEventListener('click', () => {
  worker.terminate();
  output.textContent = 'Calculation cancelled.';
});

// Listen to worker messages
worker.addEventListener('message', (event) => {
  output.textContent = `Found ${event.data.length} primes.`;
});

// Handle errors
worker.addEventListener('error', (error) => {
  console.error('Worker error:', error.message);
  output.textContent = 'Error occurred in the worker.';
});

