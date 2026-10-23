'use strict';

// Supported operations: addition (+), subtraction (-), multiplication (×),
// division (÷), modulo (%), exponentiation (^), and square root (sqrt).

function validateOperand(value) {
  if (!Number.isFinite(value)) {
    throw new TypeError('Operands must be finite numbers.');
  }
}

function validateOperands(a, b) {
  validateOperand(a);
  validateOperand(b);
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

function modulo(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new RangeError('Cannot calculate modulo with zero.');
  }
  return a % b;
}

function power(base, exponent) {
  validateOperands(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  validateOperand(n);
  if (n < 0) {
    throw new RangeError('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(n);
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
  '÷': divide,
  modulo,
  '%': modulo,
  power,
  '^': power
};

const unaryOperations = {
  squareRoot,
  sqrt: squareRoot,
  '√': squareRoot
};

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operation> [number]');
  console.error('Operations: add (+), subtract (-), multiply (* or ×), divide (/ or ÷), modulo (%), power (^), squareRoot (sqrt or √)');
  console.error('Example: node src/calculator.js 12 + 3');
  console.error('Example: node src/calculator.js 9 sqrt');
}

function runCli(args) {
  if (args.length !== 2 && args.length !== 3) {
    printUsage();
    return 1;
  }

  const [leftInput, operation, rightInput] = args;
  const isUnary = args.length === 2;
  const left = Number(leftInput);
  const right = isUnary ? undefined : Number(rightInput);
  const calculate = isUnary ? unaryOperations[operation] : operations[operation];

  if (
    leftInput.trim() === '' ||
    !Number.isFinite(left) ||
    (!isUnary && (rightInput.trim() === '' || !Number.isFinite(right)))
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
    console.log(isUnary ? calculate(left) : calculate(left, right));
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 1;
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}
