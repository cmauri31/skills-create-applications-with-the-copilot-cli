'use strict';

// Supported operations: addition (+), subtraction (-), multiplication (×),
// and division (÷).

function validateOperands(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Operands must be finite numbers.');
  }
}

function add(a, b) {
  validateOperands(a, b);
  return a + b;
}

function subtract(a, b) {
  validateOperands(a, b);
  return a - b;
}

function multiply(a, b) {
  validateOperands(a, b);
  return a * b;
}

function divide(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new RangeError('Cannot divide by zero.');
  }
  return a / b;
}

const operations = {
  add,
  '+': add,
  subtract,
  '-': subtract,
  multiply,
  '*': multiply,
  '×': multiply,
  divide,
  '/': divide,
  '÷': divide
};

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operation> <number>');
  console.error('Operations: add (+), subtract (-), multiply (* or ×), divide (/ or ÷)');
  console.error('Example: node src/calculator.js 12 + 3');
}

function runCli(args) {
  if (args.length !== 3) {
    printUsage();
    return 1;
  }

  const [leftInput, operation, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);
  const calculate = operations[operation];

  if (
    leftInput.trim() === '' ||
    rightInput.trim() === '' ||
    !Number.isFinite(left) ||
    !Number.isFinite(right)
  ) {
    console.error('Error: operands must be finite numbers.');
    return 1;
  }

  if (!calculate) {
    console.error(`Error: unsupported operation "${operation}".`);
    printUsage();
    return 1;
  }

  try {
    console.log(calculate(left, right));
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 1;
  }
}

module.exports = { add, subtract, multiply, divide };

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}
