// script.js
// Using ES6 Modules and Classes for better organization

// Calculator Module
class Calculator {
    constructor(num1, num2, operation) {
        this.num1 = num1;
        this.num2 = num2;
        this.operation = operation;
    }

    calculate() {
        return new Promise((resolve, reject) => {
            if (isNaN(this.num1) || isNaN(this.num2)) {
                return reject("Both inputs must be valid numbers.");
            }

            switch (this.operation) {
                case '+':
                    resolve(this.num1 + this.num2);
                    break;
                case '-':
                    resolve(this.num1 - this.num2);
                    break;
                case '*':
                    resolve(this.num1 * this.num2);
                    break;
                case '/':
                    if (this.num2 === 0) {
                        reject("Division by zero is not allowed.");
                    } else {
                        resolve(this.num1 / this.num2);
                    }
                    break;
                default:
                    reject("Invalid operation selected.");
            }
        });
    }
}

// Square Iterator Module
class SquareIterator {
    constructor(numbers) {
        this.numbers = numbers;
    }

    *[Symbol.iterator]() {
        for (const num of this.numbers) {
            yield num ** 2;
        }
    }

    getSquares() {
        const squares = [];
        for (const square of this) {
            squares.push(square);
        }
        return squares;
    }
}

// Prime Generator Module
class PrimeGenerator {
    constructor(limit) {
        this.limit = limit;
    }

    static isPrime(num) {
        if (num < 2) return false;
        for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    *generatePrimes() {
        for (let num = 2; num <= this.limit; num++) {
            if (PrimeGenerator.isPrime(num)) {
                yield num;
            }
        }
    }

    getPrimes() {
        const primes = [];
        for (const prime of this.generatePrimes()) {
            primes.push(prime);
        }
        return primes;
    }
}

// DOM Elements
const calculateBtn = document.getElementById('calculate-btn');
const generateSquaresBtn = document.getElementById('generate-squares-btn');
const generatePrimesBtn = document.getElementById('generate-primes-btn');

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculatorResult = document.getElementById('calculator-result');

const squaresResult = document.getElementById('squares-result');

const primeLimitInput = document.getElementById('prime-limit');
const primesResult = document.getElementById('primes-result');

// Event Listeners
calculateBtn.addEventListener('click', async () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    const calculator = new Calculator(num1, num2, operation);

    try {
        const result = await calculator.calculate();
        calculatorResult.textContent = `Result: ${result}`;
        calculatorResult.style.borderLeftColor = '#28a745'; // Green
    } catch (error) {
        calculatorResult.textContent = `Error: ${error}`;
        calculatorResult.style.borderLeftColor = '#dc3545'; // Red
    }
});

generateSquaresBtn.addEventListener('click', () => {
    // For demonstration, using a predefined array. Can be modified to take user input.
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const squareIterator = new SquareIterator(numbers);
    const squares = squareIterator.getSquares();
    squaresResult.textContent = `Squares: ${squares.join(', ')}`;
});

generatePrimesBtn.addEventListener('click', () => {
    const limit = parseInt(primeLimitInput.value);
    if (isNaN(limit) || limit < 2) {
        primesResult.textContent = "Please enter a valid number greater than or equal to 2.";
        primesResult.style.borderLeftColor = '#dc3545'; // Red
        return;
    }

    const primeGenerator = new PrimeGenerator(limit);
    const primes = primeGenerator.getPrimes();
    primesResult.textContent = `Primes up to ${limit}: ${primes.join(', ')}`;
});
