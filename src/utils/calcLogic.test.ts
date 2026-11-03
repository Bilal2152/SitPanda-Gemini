import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMortgage,
  calculateLoan,
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateSalary,
  calculateInflation,
  calculateBMI,
  calculateCalorie,
  calculateBodyFat,
  calculatePace,
  calculateAge,
  calculateDateDiff,
  calculateFractions,
  calculateStatistics,
  calculateGCFandLCM,
  calculateTip,
  generatePassword,
  calculateZakat,
  convertUnits,
} from './calcLogic';

test('calculateMortgage returns valid monthly P&I, total interest and taxes', () => {
  const result = calculateMortgage({
    homePrice: 400000,
    downPayment: 80000, // 320,000 principal
    interestRate: 6.5,
    loanTermYears: 30,
    propertyTaxYear: 4800,
    homeInsuranceYear: 1200,
    pmiMonthly: 0,
  });

  assert.equal(result.principal, 320000);
  assert.ok(result.monthlyPI > 2000 && result.monthlyPI < 2050, `monthlyPI should be ~2022.62, got ${result.monthlyPI}`);
  assert.equal(result.monthlyTax, 400);
  assert.equal(result.monthlyInsurance, 100);
  assert.ok(result.totalMonthly > 2500);
  assert.ok(result.totalInterest > 400000);
  assert.equal(result.schedule.length, 30);
});

test('calculateLoan calculates correct payment and extra amortization savings', () => {
  const baseLoan = calculateLoan({
    amount: 25000,
    interestRate: 5.0,
    termMonths: 60,
  });

  assert.ok(baseLoan.monthlyPayment > 470 && baseLoan.monthlyPayment < 475);
  assert.equal(baseLoan.actualMonths, 60);

  const extraLoan = calculateLoan({
    amount: 25000,
    interestRate: 5.0,
    termMonths: 60,
    extraMonthly: 100,
  });

  assert.ok(extraLoan.actualMonths < 60);
  assert.ok(extraLoan.savedInterest > 500);
});

test('calculateCompoundInterest calculates expected growth', () => {
  const result = calculateCompoundInterest({
    initialDeposit: 10000,
    monthlyContribution: 500,
    annualRate: 8,
    years: 10,
    compoundFrequency: 'monthly',
  });

  assert.equal(result.totalPrincipal, 10000);
  assert.equal(result.totalContributions, 60000);
  assert.ok(result.endBalance > 110000);
  assert.ok(result.totalInterest > 40000);
  assert.equal(result.yearlyData.length, 10);
});

test('calculateSimpleInterest calculates accurate interest', () => {
  const result = calculateSimpleInterest(5000, 7.5, 3);
  assert.equal(result.interest, 1125);
  assert.equal(result.total, 6125);
});

test('calculateSalary converts hourly to annual and weekly accurately', () => {
  const salary = calculateSalary(30, 'hourly', 40);
  assert.equal(salary.annual, 62400);
  assert.equal(salary.weekly, 1200);
  assert.equal(salary.monthly, 5200);
});

test('calculateInflation computes purchasing power loss', () => {
  const infl = calculateInflation(1000, 3.5, 10);
  assert.ok(infl.futureValue > 1400);
  assert.ok(infl.purchasingPower < 750);
});

test('calculateBMI identifies underweight, normal, overweight and obesity thresholds', () => {
  const normal = calculateBMI(70, 175);
  assert.equal(normal.bmi, 22.9);
  assert.equal(normal.category, 'Normal weight');

  const overweight = calculateBMI(85, 175);
  assert.equal(overweight.bmi, 27.8);
  assert.equal(overweight.category, 'Overweight');

  const obese = calculateBMI(110, 175);
  assert.equal(obese.category, 'Obesity Class II');
});

test('calculateCalorie returns BMR and deficit targets', () => {
  const calories = calculateCalorie('male', 30, 80, 180, 'moderate');
  assert.ok(calories.bmr > 1700 && calories.bmr < 1850);
  assert.ok(calories.maintenance > 2700);
  assert.equal(calories.weightLoss, calories.maintenance - 500);
});

test('calculateBodyFat returns realistic US Navy body fat percentage', () => {
  const bf = calculateBodyFat('male', 178, 85, 40, 0, 75);
  assert.ok(bf.bodyFatPercentage > 10 && bf.bodyFatPercentage < 22);
  assert.ok(bf.leanMassKg > 55);
});

test('calculatePace computes min/km and speed', () => {
  const pace = calculatePace(10, 0, 50, 0); // 10k in 50 minutes = 5:00 min/km, 12 km/h
  assert.equal(pace.paceKm, '5:00');
  assert.equal(pace.speedKmh, 12);
});

test('calculateAge computes exact elapsed time and next birthday', () => {
  const age = calculateAge('1995-05-15', '2025-05-15');
  assert.equal(age.years, 30);
  assert.equal(age.months, 0);
  assert.equal(age.days, 0);
});

test('calculateDateDiff calculates days and weeks', () => {
  const diff = calculateDateDiff('2025-01-01', '2025-01-15');
  assert.equal(diff.days, 14);
  assert.equal(diff.weeks, 2);
  assert.ok(diff.businessDays === 10);
});

test('calculateFractions reduces and simplifies operations', () => {
  const add = calculateFractions(1, 2, 1, 3, '+'); // 1/2 + 1/3 = 5/6
  assert.equal(add.numerator, 5);
  assert.equal(add.denominator, 6);

  const mult = calculateFractions(2, 3, 3, 4, '*'); // 2/3 * 3/4 = 1/2
  assert.equal(mult.numerator, 1);
  assert.equal(mult.denominator, 2);
});

test('calculateStatistics computes mean, median, range, and standard deviation', () => {
  const stats = calculateStatistics([10, 20, 20, 40, 50, 60, 80]);
  assert.equal(stats.count, 7);
  assert.equal(stats.sum, 280);
  assert.equal(stats.mean, 40);
  assert.equal(stats.median, 40);
  assert.deepEqual(stats.mode, [20]);
  assert.equal(stats.range, 70);
  assert.ok(stats.stdDev > 23);
});

test('calculateGCFandLCM handles positive integers', () => {
  const res = calculateGCFandLCM(24, 36);
  assert.equal(res.gcf, 12);
  assert.equal(res.lcm, 72);
});

test('calculateTip splits tip and total bill', () => {
  const tip = calculateTip(100, 20, 2);
  assert.equal(tip.tipTotal, 20);
  assert.equal(tip.total, 120);
  assert.equal(tip.tipPerPerson, 10);
  assert.equal(tip.totalPerPerson, 60);
});

test('generatePassword creates strong password with correct length', () => {
  const pwd = generatePassword({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  assert.equal(pwd.password.length, 16);
  assert.ok(pwd.entropy > 50);
});

test('calculateZakat calculates 2.5% when above nisab threshold', () => {
  const zakat = calculateZakat(10000, 0, 0, 0, 0, 85, 1.05);
  assert.equal(zakat.isEligible, true);
  assert.equal(zakat.zakatDue, 250);
});

test('convertUnits accurately converts length, temperature, and weight', () => {
  assert.equal(convertUnits(1, 'km', 'm', 'length'), 1000);
  assert.equal(convertUnits(100, 'c', 'f', 'temp'), 212);
  assert.equal(convertUnits(0, 'c', 'f', 'temp'), 32);
  assert.equal(convertUnits(1, 'kg', 'g', 'weight'), 1000);
});
