const readline = require('readline'); 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función pura para crear una tarea
const createTask = (title, description = '', difficulty, expireDate) => ({
  title,
  description,
  status: "pendiente",
  creationDate: new Date(),
  lastEditDate: new Date(),
  expireDate,
  difficulty
});

// Función pura para cambiar el estado de la tarea
const changeStatus = (task, newStatus) => ({
  ...task,
  status: newStatus
});

// Función pura para mostrar una tarea
const showTask = task => {
  console.log("\nTitulo:", task.title);
  console.log("Estado:", task.status);
  console.log("Descripción:", task.description);
  console.log("Fecha de creación:", task.creationDate);
  console.log("Fecha de vencimiento:", task.expireDate);
  console.log("Dificultad:", getDifficultyStars(task.difficulty));
  console.log("Última edición:", task.lastEditDate);
};

// Función pura para obtener la dificultad en estrellas
const getDifficultyStars = difficulty => 
  difficulty === 'baja' ? '★☆☆' :
  difficulty === 'media' ? '★★☆' :
  difficulty === 'alta' ? '★★★' : 'Dificultad inválida';

// Función pura para editar una tarea
const editTask = (task, updates) => ({
  ...task,
  ...updates,
  lastEditDate: new Date()
});

// Funciones puras de validación
const isValidDay = day => day >= 1 && day <= 31;
const isValidMonth = month => month >= 1 && month <= 12;
const isValidYear = year => year <= 2100 && year >= new Date().getFullYear();
const isValidDifficulty = difficulty => ['baja', 'media', 'alta'].includes(difficulty.toLowerCase());
const isValidStatus = status => ['pendiente', 'en curso', 'terminada'].includes(status.toLowerCase());

// Solicitar y validar parámetros recursivamente
const askForDate = callback => {
  rl.question("Ingrese el día de vencimiento (1-31): ", day => {
    if (!isValidDay(Number(day))) {
      console.log("Día inválido.");
      return askForDate(callback);
    }
    rl.question("Ingrese el mes de vencimiento (1-12): ", month => {
      if (!isValidMonth(Number(month))) {
        console.log("Mes inválido.");
        return askForDate(callback);
      }
      rl.question("Ingrese el año de vencimiento (>= 2024): ", year => {
        if (!isValidYear(Number(year))) {
          console.log("Año inválido.");
          return askForDate(callback);
        }
        callback(`${day}/${month}/${year}`);
      });
    });
  });
};

const askForValidStatus = callback => {
  rl.question("Ingrese el estado (pendiente/en curso/terminada): ", status => {
    if (isValidStatus(status)) {
      callback(status);
    } else {
      console.log("Estado no válido. Debe ser 'pendiente', 'en curso' o 'terminada'.");
      askForValidStatus(callback);
    }
  });
};

const askForValidDifficulty = callback => {
  rl.question("Ingrese la dificultad (baja/media/alta): ", difficulty => {
    if (isValidDifficulty(difficulty)) {
      callback(difficulty);
    } else {
      console.log("Dificultad no válida. Debe ser 'baja', 'media' o 'alta'.");
      askForValidDifficulty(callback);
    }
  });
};

// Función para buscar una tarea
const searchTasks = (tasks, query) => tasks.filter(task => 
  task.title.includes(query) || task.description.includes(query)
);

// Función para manejar las opciones del menú
const handleOption = (tasks, updateTasks) => {
  console.log("\n1. Ver tareas\n2. Crear tarea\n3. Buscar tarea\n0. Salir\n");
  rl.question("Seleccione una opción: ", choice => {
    if (choice === '1') displayTasks(tasks, updateTasks);
    else if (choice === '2') createTaskPrompt(tasks, updateTasks);
    else if (choice === '3') searchTaskPrompt(tasks, updateTasks);
    else if (choice === '0') rl.close();
    else handleOption(tasks, updateTasks);
  });
};

// Función para crear nueva tarea
const createTaskPrompt = (tasks, updateTasks) => {
  rl.question("Ingrese el título de la tarea: ", title => {
    rl.question("Ingrese la descripción: ", description => {
      askForValidDifficulty(difficulty => {
        askForDate(expireDate => {
          const newTask = createTask(title, description, difficulty, expireDate);
          console.log("Tarea creada con éxito.");
          // Actualizamos las tareas y regresamos al menú
          updateTasks([...tasks, newTask]);
        });
      });
    });
  });
};

// Función para mostrar tareas con filtro por estado
const displayTasks = (tasks, updateTasks) => {
  rl.question("\n¿Desea ver todas las tareas o filtrar por estado? (todas/pendientes/en curso/terminadas): ", filter => {
    let filteredTasks = tasks;
    if (filter === 'pendientes') {
      filteredTasks = tasks.filter(task => task.status === 'pendiente');
    } else if (filter === 'en curso') {
      filteredTasks = tasks.filter(task => task.status === 'en curso');
    } else if (filter === 'terminadas') {
      filteredTasks = tasks.filter(task => task.status === 'terminada');
    }
    if (filteredTasks.length === 0) {
      console.log("No hay tareas para mostrar.");
    } else {
      console.log("\nTareas:\n");
      filteredTasks.forEach(showTask);
    }
    handleOption(tasks, updateTasks);
  });
};

// Función para buscar y mostrar tareas por palabra clave
const searchTaskPrompt = (tasks, updateTasks) => {
  rl.question("Ingrese palabra o letra para buscar en las tareas: ", query => {
    const results = searchTasks(tasks, query);
    if (results.length > 0) {
      console.log(`Se encontraron ${results.length} coincidencias:`);
      results.forEach((task, index) => {
        console.log(`${index + 1}:`);
        showTask(task);
      });
      // Preguntar si quiere editar alguna tarea
      rl.question("¿Quieres editar alguna tarea? Ingrese el número de tarea o 'no' para volver: ", choice => {
        if (choice.toLowerCase() === 'no') {
          handleOption(tasks, updateTasks);
        } else {
          const taskIndex = parseInt(choice) - 1;
          if (taskIndex >= 0 && taskIndex < results.length) {
            editTaskPrompt(results[taskIndex], updatedTask => {
              tasks = tasks.map(task => task === results[taskIndex] ? updatedTask : task);
              updateTasks(tasks);
            });
          } else {
            console.log("Número de tarea inválido.");
            handleOption(tasks, updateTasks);
          }
        }
      });
    } else {
      console.log("No se encontraron coincidencias.");
      handleOption(tasks, updateTasks);
    }
  });
};

// Función para editar una tarea
const editTaskPrompt = (task, updateTask) => {
  console.log("\nEditando tarea:");
  showTask(task);
  
  rl.question("¿Deseas cambiar el título? (Deja vacío para no cambiar): ", newTitle => {
    rl.question("¿Deseas cambiar la descripción? (Deja vacío para no cambiar): ", newDescription => {
      askForValidStatus(newStatus => {
        askForValidDifficulty(newDifficulty => {
          askForDate(newExpireDate => {
            const updatedTask = editTask(task, {
              title: newTitle || task.title,
              description: newDescription || task.description,
              status: newStatus || task.status,
              difficulty: newDifficulty || task.difficulty,
              expireDate: newExpireDate || task.expireDate
            });
            console.log("Tarea editada con éxito.");
            updateTask(updatedTask);
          });
        });
      });
    });
  });
};

// Inicia el programa con el menú principal y una lista de tareas vacía
let tasks = [];  // Lista de tareas inicial vacía
const updateTasks = (newTasks) => {
  tasks = newTasks;  // Actualiza la lista de tareas
  handleOption(tasks, updateTasks);  // Regresa al menú principal
};

handleOption(tasks, updateTasks);
