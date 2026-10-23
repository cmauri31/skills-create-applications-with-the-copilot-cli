'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

test('addition calculates the image example and handles negative and decimal values', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-2, 3), 1);
  assert.equal(add(0.1, 0.2), 0.30000000000000004);
});

test('subtraction calculates the image example and handles negative values', () => {
  assert.equal(subtract(10, 4), 6);
  assert.equal(subtract(4, 10), -6);
  assert.equal(subtract(-4, -10), 6);
});

test('multiplication calculates the image example and handles zero and negative values', () => {
  assert.equal(multiply(45, 2), 90);
  assert.equal(multiply(-3, 4), -12);
  assert.equal(multiply(0, 8), 0);
});

test('division calculates the image example and handles fractions and zero numerators', () => {
  assert.equal(divide(20, 5), 4);
  assert.equal(divide(7, 2), 3.5);
  assert.equal(divide(0, 5), 0);
});

test('division by positive or negative zero throws a RangeError', () => {
  assert.throws(() => divide(10, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.'
  });
  assert.throws(() => divide(10, -0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.'
  });
});

test('modulo returns the remainder for positive and negative values', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
  assert.equal(modulo(10, -3), 1);
});

test('modulo by positive or negative zero throws a RangeError', () => {
  assert.throws(() => modulo(10, 0), {
    name: 'RangeError',
    message: 'Cannot modulo by zero.'
  });
  assert.throws(() => modulo(10, -0), {
    name: 'RangeError',
    message: 'Cannot modulo by zero.'
  });
});

test('power calculates integer, zero, negative, and fractional exponents', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(2, 0), 1);
  assert.equal(power(2, -2), 0.25);
  assert.equal(power(9, 0.5), 3);
});

test('power throws a RangeError when its result is not finite', () => {
  assert.throws(() => power(0, -1), {
    name: 'RangeError',
    message: 'Result must be a finite number.'
  });
});

test('square root calculates zero and positive values', () => {
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(9), 3);
});

test('square root of a negative value throws a RangeError', () => {
  assert.throws(() => squareRoot(-1), {
    name: 'RangeError',
    message: 'Cannot calculate the square root of a negative number.'
  });
});

test('all operations reject non-finite and non-number operands', () => {
  const operations = [add, subtract, multiply, divide, modulo, power];

  for (const operation of operations) {
    assert.throws(() => operation('2', 3), {
      name: 'TypeError',
      message: 'Operands must be finite numbers.'
    });
    assert.throws(() => operation(2, Number.NaN), {
      name: 'TypeError',
      message: 'Operands must be finite numbers.'
    });
    assert.throws(() => operation(Number.POSITIVE_INFINITY, 2), {
      name: 'TypeError',
      message: 'Operands must be finite numbers.'
    });
  }
});

test('square root rejects non-finite and non-number operands', () => {
  for (const value of ['2', Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => squareRoot(value), {
      name: 'TypeError',
      message: 'Operand must be a finite number.'
    });
  }
});
