'use strict';

// Supported operations: addition (+), subtraction (-), multiplication (×),
// division (÷), modulo (%), power (^), and square root (sqrt).

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

function modulo(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new RangeError('Cannot modulo by zero.');
  }
  return a % b;
}

function power(base, exponent) {
  validateOperands(base, exponent);
  const result = base ** exponent;
  if (!Number.isFinite(result)) {
    throw new RangeError('Result must be a finite number.');
  }
  return result;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new TypeError('Operand must be a finite number.');
  }
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
  '^': power,
  '**': power
};

const unaryOperations = {
  sqrt: squareRoot,
  squareRoot
};

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operation> <number>');
  console.error('   or: node src/calculator.js <operation> <number>');
  console.error('Operations: add (+), subtract (-), multiply (* or ×), divide (/ or ÷), modulo (%), power (^ or **), sqrt');
  console.error('Example: node src/calculator.js 12 + 3');
}

function runCli(args) {
  if (args.length === 2 && unaryOperations[args[0]]) {
    const [operation, input] = args;
    const value = Number(input);

    if (input.trim() === '' || !Number.isFinite(value)) {
      console.error('Error: operand must be a finite number.');
      return 1;
    }

    try {
      console.log(unaryOperations[operation](value));
      return 0;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
  }

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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}
