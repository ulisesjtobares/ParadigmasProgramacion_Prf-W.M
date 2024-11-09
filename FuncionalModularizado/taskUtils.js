const readline = require('readline');

// Interfaz para leer entradas del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función de validación para verificar que la entrada esté en un conjunto de opciones válidas
const validateInput = (input, validOptions, errorMessage) => {
  if (Array.isArray(validOptions)) {
    if (validOptions.includes(parseInt(input))) {
      return true;
    }
  } else if (validOptions(input)) {
    return true;
  }
  console.log(errorMessage);
  return false;
};

// Funciones de validación para los datos
const isValidDay = (day) => {
  return day >= 1 && day <= 31;
};

const isValidMonth = (month) => {
  return month >= 1 && month <= 12;
};

const isValidYear = (year) => {
  return year >= 2024;
};

// Función para pedir la fecha de vencimiento y validarla
const askForDate = (callback) => {
  rl.question("Ingrese el día de vencimiento (1-31): ", day => {
    if (isValidDay(day)) {
      rl.question("Ingrese el mes de vencimiento (1-12): ", month => {
        if (isValidMonth(month)) {
          rl.question("Ingrese el año de vencimiento (>= 2024): ", year => {
            if (isValidYear(year)) {
              callback(`${day}/${month}/${year}`);
            } else {
              console.log("Año inválido. Intente nuevamente.");
              askForDate(callback);
            }
          });
        } else {
          console.log("Mes inválido. Intente nuevamente.");
          askForDate(callback);
        }
      });
    } else {
      console.log("Día inválido. Intente nuevamente.");
      askForDate(callback);
    }
  });
};

// Crear tarea con los datos proporcionados
const createTask = (title, description, difficulty, expireDate) => {
  return {
    title,
    description,
    difficulty,
    expireDate,
    status: 'pendiente' // Por defecto, las tareas son pendientes
  };
};

// Mostrar una tarea
const showTask = (task) => {
  console.log(`Título: ${task.title}`);
  console.log(`Descripción: ${task.description}`);
  console.log(`Dificultad: ${getDifficultyStars(task.difficulty)}`);
  console.log(`Fecha de vencimiento: ${task.expireDate}`);
  console.log(`Estado: ${task.status}`);
  console.log('-----------------------------');
};

// Obtener las estrellas de dificultad
const getDifficultyStars = (difficulty) => {
  switch (difficulty) {
    case 'facil':
      return '⭐⭐⭐';
    case 'media':
      return '⭐⭐⭐⭐';
    case 'alta':
      return '⭐⭐⭐⭐⭐';
    default:
      return 'No definida';
  }
};

module.exports = {
  validateInput,
  createTask,
  showTask,
  askForDate,
  isValidDay,
  isValidMonth,
  isValidYear,
  getDifficultyStars
};
