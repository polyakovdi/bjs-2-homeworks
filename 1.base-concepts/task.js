"use strict"
function solveEquation(a, b, c) {
  let discriminant = b * b - 4 * a * c;
  let arr = [];
  if (discriminant < 0) {
    return arr; // пустой массив, если дискриминант меньше нуля
  }

  if (discriminant === 0) {
    arr.push(-b / (2 * a)); // один корень, если дискриминант равен нулю
  } else {
    arr.push((-b + Math.sqrt(discriminant)) / (2 * a)); // первый корень
    arr.push((-b - Math.sqrt(discriminant)) / (2 * a)); // второй корень
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  for (let arg of arguments) {
    if (typeof arg === 'string') {
      arg = Number(arg);
      if (!arg) {
        return false;
      }
    } else if (typeof arg !== 'number') {
      return false;
    }
  }

  percent = percent / 100;
  let body = amount - contribution;
  let p = percent / 12;
  let payment = body * (p + p / ((1 + p) ** countMonths - 1));
  let totalAmount = payment * countMonths;

  return Number(totalAmount.toFixed(2));
}