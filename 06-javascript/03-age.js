// Add your code here

const calculateAge = function calculateAgeFromBirthDate(birthDate) {
  if (isNaN(Date.parse(birthDate))) {
    return "Error: Invalid date format";
  }
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();

  if (age === 1) {
    return `You are ${age} year old`;
  }

  if (age > 125) {
    return "Are you sure you are more than 125 years old?";
  }
  if (age < 0) {
    return "Error: Birth date cannot be in the future";
  }
  return `You are ${age} years old`;
};

console.log(calculateAge("2000-07-01"));
// You are 25 years old
console.log(calculateAge("1988-05-18"));
// You are 38 years old
console.log(calculateAge("2190-01-01"));
// Error: Birth date cannot be in the future
console.log(calculateAge("1800-01-01"));
// Are you sure you are more than 125 years old?
console.log(calculateAge("invalid-date"));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
