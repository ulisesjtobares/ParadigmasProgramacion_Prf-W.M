const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const taskList = [];

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

// Función para validar día, mes y año
const isValidDay = day => day >= 1 && day <= 31;
const isValidMonth = month => month >= 1 && month <= 12;
const isValidYear = year => year <= 2100 && year >= new Date().getFullYear();
const isValidDifficulty = difficulty => ['baja', 'media', 'alta'].includes(difficulty.toLowerCase());
const isValidStatus = status => ['pendiente', 'en curso', 'terminada'].includes(status.toLowerCase());

// Función para solicitar y validar fecha
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

// Función para mostrar y editar tarea
const showTaskAndEdit = task => {
  showTask(task);
  rl.question("\nPresione 'E' para editar, '0' para volver: ", response => {
    if (response.toLowerCase() === 'e') {
      editTaskPrompt(task);
    } else if (response === '0') {
      mainMenu();
    } else {
      console.log("Opción no válida.");
      mainMenu();
    }
  });
};

// Función para editar tarea con validaciones
const editTaskPrompt = task => {
  rl.question("Nuevo título (Enter para mantener): ", newTitle => {
    rl.question("Nueva descripción (Enter para mantener): ", newDescription => {
      askForValidStatus(task.status, newStatus => {
        askForValidDifficulty(task.difficulty, newDifficulty => {
          askForDate(newExpireDate => {
            const updatedTask = editTask(task, {
              title: newTitle || task.title,
              description: newDescription || task.description,
              status: newStatus,
              difficulty: newDifficulty,
              expireDate: newExpireDate || task.expireDate
            });
            taskList[taskList.indexOf(task)] = updatedTask;
            console.log("Tarea editada.");
            mainMenu();
          });
        });
      });
    });
  });
};

// Función para solicitar y validar estado
const askForValidStatus = (defaultStatus, callback) => {
  rl.question("Ingrese el estado (pendiente/en curso/terminada): ", status => {
    if (isValidStatus(status)) {
      callback(status);
    } else {
      console.log("Estado no válido. Debe ser 'pendiente', 'en curso' o 'terminada'.");
      askForValidStatus(defaultStatus, callback);
    }
  });
};

// Función para solicitar y validar dificultad
const askForValidDifficulty = (defaultDifficulty, callback) => {
  rl.question("Ingrese la dificultad (baja/media/alta): ", difficulty => {
    if (isValidDifficulty(difficulty)) {
      callback(difficulty);
    } else {
      console.log("Dificultad no válida. Debe ser 'baja', 'media' o 'alta'.");
      askForValidDifficulty(defaultDifficulty, callback);
    }
  });
};

// Función para buscar una tarea por palabra clave en título o descripción
const buscar = () => {
  rl.question("Ingrese palabra o letra para buscar en las tareas: ", query => {
    const results = taskList.filter(task =>
      task.title.includes(query) || task.description.includes(query)
    );

    if (results.length > 0) {
      console.log(`Se encontraron ${results.length} coincidencias:`);
      results.forEach((task, index) => {
        console.log(`\nResultado ${index + 1}:`);
        showTask(task);
      });

      rl.question("\nSeleccione el número de la tarea que desea editar o presione 0 para volver: ", choice => {
        const taskIndex = parseInt(choice) - 1;
        if (taskIndex >= 0 && taskIndex < results.length) {
          showTaskAndEdit(results[taskIndex]);
        } else if (choice === '0') {
          mainMenu();
        } else {
          console.log("Opción no válida.");
          mainMenu();
        }
      });
    } else {
      console.log("No se encontraron coincidencias.");
      mainMenu();
    }
  });
};

// Menú principal
const mainMenu = () => {
  console.log("\n1. Ver tareas\n2. Crear tarea\n3. Buscar tarea\n0. Salir\n");
  rl.question("Seleccione una opción: ", choice => {
    if (choice === '1') displayTasksMenu();
    else if (choice === '2') createTaskPrompt();
    else if (choice === '3') buscar();
    else if (choice === '0') rl.close();
    else mainMenu();
  });
};

// Función para mostrar menú de tareas y filtrar
const displayTasksMenu = () => {
  console.log("\n1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Volver\n");
  rl.question("Seleccione una opción: ", choice => {
    const filteredTasks = 
      choice === '1' ? taskList :
      choice === '2' ? taskList.filter(t => t.status === 'pendiente') :
      choice === '3' ? taskList.filter(t => t.status === 'en curso') :
      choice === '4' ? taskList.filter(t => t.status === 'terminada') : [];
      
    filteredTasks.forEach(showTask);
    rl.question("Presiona Enter para volver al Menú Principal.", mainMenu);
  });
};

// Función para crear nueva tarea con entradas del usuario
const createTaskPrompt = () => {
  rl.question("Ingrese el título de la tarea: ", title => {
    rl.question("Ingrese la descripción: ", description => {
      askForValidDifficulty('baja', difficulty => {
        askForDate(expireDate => {
          const newTask = createTask(title, description, difficulty, expireDate);
          taskList.push(newTask);
          console.log("Tarea creada.");
          mainMenu();
        });
      });
    });
  });
};

// Inicia el programa
mainMenu();
