// Function to check if a number is prime
export const isPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    if (num <= 3) {
      return true;
    }
    if (num % 2 === 0 || num % 3 === 0) {
      return false;
    }
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }
    return true;
  };
  
  // Function to get the nth Fibonacci number
  export const getFibonacciNumber = (n) => {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    let prev = 0;
    let current = 1;
    for (let i = 2; i <= n; i++) {
      const next = prev + current;
      prev = current;
      current = next;
    }
    return current;
  };
  