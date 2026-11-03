/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SitPanda Tools - Core Calculation Engines
 */

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxYear?: number;
  homeInsuranceYear?: number;
  pmiMonthly?: number;
}

export interface MortgageResult {
  principal: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  totalMonthly: number;
  totalPayment: number;
  totalInterest: number;
  payoffDateYears: number;
  schedule: Array<{
    year: number;
    interest: number;
    principal: number;
    balance: number;
  }>;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const principal = Math.max(0, input.homePrice - input.downPayment);
  const numPayments = Math.max(1, input.loanTermYears * 12);
  const monthlyRate = (input.interestRate / 100) / 12;

  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = principal / numPayments;
  } else {
    monthlyPI =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyTax = (input.propertyTaxYear || 0) / 12;
  const monthlyInsurance = (input.homeInsuranceYear || 0) / 12;
  const monthlyPMI = input.pmiMonthly || 0;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;

  const totalInterest = monthlyPI * numPayments - principal;
  const totalPayment = totalMonthly * numPayments;

  // Yearly schedule projection
  const schedule: Array<{ year: number; interest: number; principal: number; balance: number }> = [];
  let currentBalance = principal;

  for (let y = 1; y <= input.loanTermYears; y++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      if (currentBalance <= 0) break;
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = Math.min(currentBalance, monthlyPI - interestPayment);
      yearInterest += interestPayment;
      yearPrincipal += principalPayment;
      currentBalance = Math.max(0, currentBalance - principalPayment);
    }
    schedule.push({
      year: y,
      interest: Math.round(yearInterest),
      principal: Math.round(yearPrincipal),
      balance: Math.round(currentBalance),
    });
    if (currentBalance <= 0) break;
  }

  return {
    principal: Math.round(principal * 100) / 100,
    monthlyPI: Math.round(monthlyPI * 100) / 100,
    monthlyTax: Math.round(monthlyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyPMI: Math.round(monthlyPMI * 100) / 100,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    payoffDateYears: input.loanTermYears,
    schedule,
  };
}

export interface LoanInput {
  amount: number;
  interestRate: number;
  termMonths: number;
  extraMonthly?: number;
}

export function calculateLoan(input: LoanInput) {
  const principal = Math.max(0, input.amount);
  const n = Math.max(1, input.termMonths);
  const r = (input.interestRate / 100) / 12;
  const extra = Math.max(0, input.extraMonthly || 0);

  let monthlyPayment = 0;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    monthlyPayment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }

  let balance = principal;
  let totalInterest = 0;
  let monthsCount = 0;

  while (balance > 0.01 && monthsCount < 600) {
    monthsCount++;
    const interest = balance * r;
    totalInterest += interest;
    const principalPaid = monthlyPayment - interest + extra;
    balance = Math.max(0, balance - principalPaid);
  }

  const effectiveMonthly = monthlyPayment + extra;
  const totalPaid = principal + totalInterest;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    effectiveMonthly: Math.round(effectiveMonthly * 100) / 100,
    totalPayment: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    actualMonths: monthsCount,
    savedInterest: extra > 0 ? Math.max(0, Math.round((monthlyPayment * n - principal - totalInterest) * 100) / 100) : 0,
  };
}

export interface CompoundInterestInput {
  initialDeposit: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compoundFrequency?: 'monthly' | 'annually' | 'quarterly' | 'daily';
}

export function calculateCompoundInterest(input: CompoundInterestInput) {
  const P = Math.max(0, input.initialDeposit);
  const PMT = Math.max(0, input.monthlyContribution);
  const r = input.annualRate / 100;
  const t = Math.max(1, input.years);

  let m = 12; // compound frequency per year
  if (input.compoundFrequency === 'annually') m = 1;
  else if (input.compoundFrequency === 'quarterly') m = 4;
  else if (input.compoundFrequency === 'daily') m = 365;

  let balance = P;
  let totalContributed = P;
  const yearlyData: Array<{ year: number; balance: number; contributions: number; interest: number }> = [];

  for (let y = 1; y <= t; y++) {
    for (let month = 0; month < 12; month++) {
      balance += PMT;
      totalContributed += PMT;
      // Monthly compounding approximation aligned with standard banking
      const monthlyRate = r / 12;
      balance += balance * monthlyRate;
    }
    yearlyData.push({
      year: y,
      balance: Math.round(balance),
      contributions: Math.round(totalContributed),
      interest: Math.round(balance - totalContributed),
    });
  }

  const totalInterest = Math.max(0, balance - totalContributed);

  return {
    endBalance: Math.round(balance * 100) / 100,
    totalPrincipal: P,
    totalContributions: totalContributed - P,
    totalInterest: Math.round(totalInterest * 100) / 100,
    yearlyData,
  };
}

export function calculateSimpleInterest(principal: number, annualRatePercent: number, years: number) {
  const interest = principal * (annualRatePercent / 100) * years;
  const total = principal + interest;
  return {
    interest: Math.round(interest * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function calculateSalary(amount: number, fromPeriod: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual', hoursPerWeek = 40) {
  let annual = 0;
  const weeksPerYear = 52;
  const hoursPerYear = weeksPerYear * hoursPerWeek;

  switch (fromPeriod) {
    case 'hourly':
      annual = amount * hoursPerYear;
      break;
    case 'daily':
      annual = amount * (hoursPerWeek / 8) * weeksPerYear;
      break;
    case 'weekly':
      annual = amount * weeksPerYear;
      break;
    case 'monthly':
      annual = amount * 12;
      break;
    case 'annual':
      annual = amount;
      break;
  }

  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / 52;
  const daily = annual / (52 * (hoursPerWeek / 8));
  const hourly = annual / hoursPerYear;

  return {
    annual: Math.round(annual),
    monthly: Math.round(monthly),
    biweekly: Math.round(biweekly),
    weekly: Math.round(weekly),
    daily: Math.round(daily * 100) / 100,
    hourly: Math.round(hourly * 100) / 100,
  };
}

export function calculateInflation(amount: number, avgAnnualRatePercent: number, years: number) {
  const futureValue = amount * Math.pow(1 + avgAnnualRatePercent / 100, years);
  const purchasingPower = amount / Math.pow(1 + avgAnnualRatePercent / 100, years);
  const cumulativeInflationPercent = (Math.pow(1 + avgAnnualRatePercent / 100, years) - 1) * 100;

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    purchasingPower: Math.round(purchasingPower * 100) / 100,
    cumulativeInflationPercent: Math.round(cumulativeInflationPercent * 100) / 100,
  };
}

export function calculateBMI(weightKg: number, heightCm: number) {
  if (heightCm <= 0 || weightKg <= 0) {
    return {
      bmi: 0,
      category: 'Unknown',
      categoryColor: 'slate',
      minNormalWeight: 0,
      maxNormalWeight: 0,
      healthyRange: '18.5 - 24.9',
    };
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(bmi * 10) / 10;

  let category = 'Normal weight';
  let categoryColor = 'emerald';
  if (roundedBmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'sky';
  } else if (roundedBmi < 25.0) {
    category = 'Normal weight';
    categoryColor = 'emerald';
  } else if (roundedBmi < 30.0) {
    category = 'Overweight';
    categoryColor = 'amber';
  } else if (roundedBmi < 35.0) {
    category = 'Obesity Class I';
    categoryColor = 'orange';
  } else if (roundedBmi < 40.0) {
    category = 'Obesity Class II';
    categoryColor = 'rose';
  } else {
    category = 'Obesity Class III';
    categoryColor = 'red';
  }

  const minNormalWeight = Math.round(18.5 * (heightM * heightM) * 10) / 10;
  const maxNormalWeight = Math.round(24.9 * (heightM * heightM) * 10) / 10;

  return {
    bmi: roundedBmi,
    category,
    categoryColor,
    minNormalWeight,
    maxNormalWeight,
    healthyRange: '18.5 - 24.9',
  };
}

export function calculateCalorie(
  gender: 'male' | 'female',
  age: number,
  weightKg: number,
  heightCm: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extraActive'
) {
  // Mifflin-St Jeor formula
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extraActive: 1.9,
  };

  const maintenance = Math.round(bmr * (multipliers[activityLevel] || 1.2));

  return {
    bmr: Math.round(bmr),
    maintenance,
    mildWeightLoss: Math.round(maintenance - 250),
    weightLoss: Math.round(maintenance - 500),
    extremeLoss: Math.round(maintenance - 1000),
    mildWeightGain: Math.round(maintenance + 250),
    weightGain: Math.round(maintenance + 500),
  };
}

export function calculateBodyFat(
  gender: 'male' | 'female',
  heightCm: number,
  waistCm: number,
  neckCm: number,
  hipCm = 0,
  weightKg = 70
) {
  // U.S. Navy Body Fat Formula
  let bodyFatPercent = 0;
  if (gender === 'male') {
    bodyFatPercent =
      495 /
        (1.0324 - 0.19077 * Math.log10(Math.max(1, waistCm - neckCm)) + 0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    bodyFatPercent =
      495 /
        (1.29579 - 0.35004 * Math.log10(Math.max(1, waistCm + hipCm - neckCm)) + 0.221 * Math.log10(heightCm)) -
      450;
  }

  const bfClamped = Math.max(3, Math.min(65, Math.round(bodyFatPercent * 10) / 10));
  const fatMass = Math.round((weightKg * (bfClamped / 100)) * 10) / 10;
  const leanMass = Math.round((weightKg - fatMass) * 10) / 10;

  let category = 'Fitness';
  if (gender === 'male') {
    if (bfClamped < 6) category = 'Essential fat';
    else if (bfClamped < 14) category = 'Athletes';
    else if (bfClamped < 18) category = 'Fitness';
    else if (bfClamped < 25) category = 'Average';
    else category = 'Obese';
  } else {
    if (bfClamped < 14) category = 'Essential fat';
    else if (bfClamped < 21) category = 'Athletes';
    else if (bfClamped < 25) category = 'Fitness';
    else if (bfClamped < 32) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercentage: bfClamped,
    fatMassKg: fatMass,
    leanMassKg: leanMass,
    category,
  };
}

export function calculateIdealWeight(gender: 'male' | 'female', heightCm: number) {
  const heightInches = heightCm / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);

  // Robinson (1983)
  const robinson = gender === 'male' ? 52 + 1.9 * inchesOver5Feet : 49 + 1.7 * inchesOver5Feet;
  // Miller (1983)
  const miller = gender === 'male' ? 56.2 + 1.41 * inchesOver5Feet : 53.1 + 1.36 * inchesOver5Feet;
  // Devine (1974)
  const devine = gender === 'male' ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet;
  // Hamwi (1964)
  const hamwi = gender === 'male' ? 48 + 2.7 * inchesOver5Feet : 45.5 + 2.2 * inchesOver5Feet;

  const average = Math.round(((robinson + miller + devine + hamwi) / 4) * 10) / 10;

  return {
    averageKg: average,
    robinson: Math.round(robinson * 10) / 10,
    miller: Math.round(miller * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    hamwi: Math.round(hamwi * 10) / 10,
  };
}

export function calculatePace(distanceKm: number, hours: number, minutes: number, seconds: number) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (distanceKm <= 0 || totalSeconds <= 0) return { paceKm: '0:00', paceMile: '0:00', speedKmh: 0, speedMph: 0 };

  const secPerKm = totalSeconds / distanceKm;
  const secPerMile = secPerKm * 1.60934;

  const fmtPace = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speedKmh = Math.round((distanceKm / (totalSeconds / 3600)) * 100) / 100;
  const speedMph = Math.round((speedKmh / 1.60934) * 100) / 100;

  return {
    paceKm: fmtPace(secPerKm),
    paceMile: fmtPace(secPerMile),
    speedKmh,
    speedMph,
  };
}

export function calculateAge(birthDateStr: string, targetDateStr = '') {
  const birth = new Date(birthDateStr);
  const target = targetDateStr ? new Date(targetDateStr) : new Date();

  if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
    return { years: 0, months: 0, days: 0, totalDays: 0, totalHours: 0, nextBirthdayDays: 0 };
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = Math.abs(target.getTime() - birth.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;

  // Next birthday calculation
  let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday < target) {
    nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const nextBirthdayDays = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    nextBirthdayDays,
  };
}

export function calculateDateDiff(startDateStr: string, endDateStr: string) {
  const d1 = new Date(startDateStr);
  const d2 = new Date(endDateStr);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return { days: 0, weeks: 0, months: 0, businessDays: 0 };

  const start = d1 < d2 ? d1 : d2;
  const end = d1 < d2 ? d2 : d1;

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Business days (Mon-Fri)
  let businessDays = 0;
  const cur = new Date(start);
  while (cur < end) {
    cur.setDate(cur.getDate() + 1);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) businessDays++;
  }

  return {
    days: totalDays,
    weeks,
    remainingDays,
    businessDays,
  };
}

export function calculateFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
  operation: '+' | '-' | '*' | '/'
) {
  if (d1 === 0 || d2 === 0) throw new Error('Denominator cannot be zero');
  if (operation === '/' && n2 === 0) throw new Error('Cannot divide by zero');

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : gcd(b, a % b);
  };

  let resN = 0;
  let resD = 1;

  switch (operation) {
    case '+':
      resN = n1 * d2 + n2 * d1;
      resD = d1 * d2;
      break;
    case '-':
      resN = n1 * d2 - n2 * d1;
      resD = d1 * d2;
      break;
    case '*':
      resN = n1 * n2;
      resD = d1 * d2;
      break;
    case '/':
      resN = n1 * d2;
      resD = d1 * n2;
      break;
  }

  if (resD < 0) {
    resN = -resN;
    resD = -resD;
  }

  const common = gcd(resN, resD);
  const simpN = resN / common;
  const simpD = resD / common;

  const whole = Math.floor(Math.abs(simpN) / simpD);
  const remN = Math.abs(simpN) % simpD;
  const sign = simpN < 0 ? '-' : '';

  let mixed = `${simpN}/${simpD}`;
  if (simpD === 1) {
    mixed = `${simpN}`;
  } else if (whole > 0 && remN > 0) {
    mixed = `${sign}${whole} ${remN}/${simpD}`;
  }

  return {
    numerator: simpN,
    denominator: simpD,
    rawNumerator: resN,
    rawDenominator: resD,
    mixedString: mixed,
    decimal: Math.round((simpN / simpD) * 10000) / 10000,
  };
}

export function calculateStatistics(nums: number[]) {
  if (!nums || nums.length === 0) {
    return { count: 0, sum: 0, mean: 0, median: 0, mode: [], variance: 0, stdDev: 0, min: 0, max: 0, range: 0 };
  }

  const sorted = [...nums].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;

  // Median
  let median = 0;
  if (count % 2 === 1) {
    median = sorted[Math.floor(count / 2)];
  } else {
    median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
  }

  // Mode
  const freqs: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of sorted) {
    freqs[n] = (freqs[n] || 0) + 1;
    if (freqs[n] > maxFreq) maxFreq = freqs[n];
  }
  const mode = maxFreq > 1 ? Object.keys(freqs).filter((k) => freqs[Number(k)] === maxFreq).map(Number) : [];

  // Variance & Sample Standard Deviation
  const variance = count > 1 ? sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (count - 1) : 0;
  const stdDev = Math.sqrt(variance);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  return {
    count,
    sum: Math.round(sum * 100) / 100,
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    mode,
    variance: Math.round(variance * 1000) / 1000,
    stdDev: Math.round(stdDev * 1000) / 1000,
    min,
    max,
    range: Math.round(range * 100) / 100,
  };
}

export function calculateGCFandLCM(a: number, b: number) {
  const absA = Math.abs(Math.round(a));
  const absB = Math.abs(Math.round(b));

  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const gcf = gcd(absA, absB);
  const lcm = gcf === 0 ? 0 : (absA * absB) / gcf;

  return {
    gcf,
    lcm,
  };
}

export function calculateTip(bill: number, tipPercent: number, splitCount = 1) {
  const people = Math.max(1, splitCount);
  const tipTotal = bill * (tipPercent / 100);
  const total = bill + tipTotal;
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = total / people;

  return {
    tipTotal: Math.round(tipTotal * 100) / 100,
    total: Math.round(total * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100,
  };
}

export function generatePassword(options: {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}) {
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789';
  const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let pool = '';
  if (options.uppercase) pool += uppers;
  if (options.lowercase) pool += lowers;
  if (options.numbers) pool += nums;
  if (options.symbols) pool += syms;

  if (!pool) pool = lowers + nums;

  const len = Math.max(4, Math.min(64, options.length));
  let result = '';
  for (let i = 0; i < len; i++) {
    result += pool.charAt(Math.floor(Math.random() * pool.length));
  }

  // Calculate entropy
  const entropy = len * Math.log2(pool.length);
  let strength = 'Weak';
  if (entropy > 75) strength = 'Very Strong';
  else if (entropy > 50) strength = 'Strong';
  else if (entropy > 35) strength = 'Moderate';

  return {
    password: result,
    entropy: Math.round(entropy),
    strength,
  };
}

export function calculateZakat(
  cash: number,
  goldGrams: number,
  silverGrams: number,
  otherAssets: number,
  debts: number,
  goldPricePerGram = 85,
  silverPricePerGram = 1.05
) {
  const goldValue = goldGrams * goldPricePerGram;
  const silverValue = silverGrams * silverPricePerGram;
  const totalWealth = cash + goldValue + silverValue + otherAssets;
  const netWealth = Math.max(0, totalWealth - debts);

  // Nisab threshold (typically 87.48 grams of gold or 612.36 grams of silver)
  const silverNisabThreshold = 612.36 * silverPricePerGram;
  const isEligible = netWealth >= silverNisabThreshold;
  const zakatDue = isEligible ? netWealth * 0.025 : 0;

  return {
    totalWealth: Math.round(totalWealth * 100) / 100,
    netWealth: Math.round(netWealth * 100) / 100,
    nisabThreshold: Math.round(silverNisabThreshold * 100) / 100,
    isEligible,
    zakatDue: Math.round(zakatDue * 100) / 100,
  };
}

export function calculateConcrete(
  type: 'slab' | 'column' | 'footing',
  lengthFt: number,
  widthFt: number,
  depthInches: number
) {
  let volumeCubicFt = 0;
  if (type === 'slab' || type === 'footing') {
    volumeCubicFt = lengthFt * widthFt * (depthInches / 12);
  } else {
    // Round column (diameter in widthFt)
    const radius = widthFt / 2;
    volumeCubicFt = Math.PI * radius * radius * lengthFt;
  }

  const cubicYards = volumeCubicFt / 27;
  const bags60lb = Math.ceil(cubicYards * 60);
  const bags80lb = Math.ceil(cubicYards * 45);

  return {
    cubicFeet: Math.round(volumeCubicFt * 100) / 100,
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicMeters: Math.round(cubicYards * 0.764555 * 100) / 100,
    bags60lb,
    bags80lb,
  };
}

export function convertUnits(value: number, fromUnit: string, toUnit: string, category: 'length' | 'weight' | 'temp' | 'speed' | 'digital') {
  if (isNaN(value)) return 0;
  if (fromUnit === toUnit) return value;

  if (category === 'temp') {
    let celsius = value;
    if (fromUnit === 'f') celsius = (value - 32) * (5 / 9);
    else if (fromUnit === 'k') celsius = value - 273.15;

    if (toUnit === 'c') return Math.round(celsius * 100) / 100;
    if (toUnit === 'f') return Math.round((celsius * (9 / 5) + 32) * 100) / 100;
    if (toUnit === 'k') return Math.round((celsius + 273.15) * 100) / 100;
  }

  const lengthRates: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };

  const weightRates: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
    ton: 1000,
  };

  const speedRates: Record<string, number> = {
    mps: 1,
    kmh: 0.277778,
    mph: 0.44704,
    knot: 0.514444,
  };

  const digitalRates: Record<string, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
  };

  let rates = lengthRates;
  if (category === 'weight') rates = weightRates;
  else if (category === 'speed') rates = speedRates;
  else if (category === 'digital') rates = digitalRates;

  if (rates[fromUnit] && rates[toUnit]) {
    const baseVal = value * rates[fromUnit];
    const converted = baseVal / rates[toUnit];
    return Math.round(converted * 10000) / 10000;
  }

  return value;
}
