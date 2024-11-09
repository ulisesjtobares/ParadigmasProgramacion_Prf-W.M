// validation.js
function isValidDay(day) {
  return day >= 1 && day <= 31;
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= currentYear && year <= currentYear + 100; // Ejemplo simple no puede ser mayor al año corriente por 100 años
}

function isValidDifficulty(difficulty) {
  const validDifficulties = ['baja', 'media', 'alta'];
  return validDifficulties.includes(difficulty.toLowerCase());
}

function isValidStatus(status) {
  const validStatuses = ['pendiente', 'en curso', 'terminada'];
  return validStatuses.includes(status.toLowerCase());
}

module.exports = {
  isValidDay,
  isValidMonth,
  isValidYear,
  isValidDifficulty,
  isValidStatus,
};
