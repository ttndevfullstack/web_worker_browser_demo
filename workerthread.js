// Function to determine if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const { start, end } = event.data;
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
  }

  // Send the result back to the main thread
  self.postMessage(primes);
});
