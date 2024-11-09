const readline = require('readline');
const { createTask, showTask, askForDate, validateInput, getDifficultyStars } = require('./taskUtils');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Función para mostrar todas las tareas
const displayTasks = (tasks, updateTasks) => {
  rl.question("\n¿Desea ver todas las tareas o filtrar por estado? (todas/pendientes/en curso/terminadas): ", filter => {
    const filteredTasks = filter === 'todas' ? tasks :
                          filter === 'pendientes' ? tasks.filter(task => task.status === 'pendiente') :
                          filter === 'en curso' ? tasks.filter(task => task.status === 'en curso') :
                          filter === 'terminadas' ? tasks.filter(task => task.status === 'terminada') : tasks;

    if (filteredTasks.length === 0) {
      console.log("No hay tareas para mostrar.");
    } else {
      console.log("\nTareas:\n");
      filteredTasks.forEach(showTask);
    }
    handleOption(tasks, updateTasks);
  });
};

// Función para crear tarea
const createTaskPrompt = (tasks, updateTasks) => {
  rl.question("Ingrese el título de la tarea: ", title => {
    rl.question("Ingrese la descripción: ", description => {
      rl.question("Ingrese la dificultad (fácil/media/alta): ", difficulty => {
        askForDate(expireDate => {
          const newTask = createTask(title, description, difficulty, expireDate);
          console.log("Tarea creada con éxito.");
          updateTasks([...tasks, newTask]);
          handleOption(tasks, updateTasks);
        });
      });
    });
  });
};

// Función para buscar tarea por título
const searchTaskPrompt = (tasks, updateTasks) => {
  rl.question("Ingrese el título de la tarea a buscar: ", searchTitle => {
    const foundTask = tasks.find(task => task.title.toLowerCase() === searchTitle.toLowerCase());
    if (foundTask) {
      showTask(foundTask);
      rl.question("\n¿Desea editar esta tarea? (sí/no): ", response => {
        if (response.toLowerCase() === 'si') {
          editTask(foundTask, tasks, updateTasks);
        } else {
          handleOption(tasks, updateTasks);
        }
      });
    } else {
      console.log("No se encontró ninguna tarea con ese título.");
      handleOption(tasks, updateTasks);
    }
  });
};

// Función para editar una tarea
const editTask = (task, tasks, updateTasks) => {
  rl.question("Ingrese el nuevo título de la tarea (deje vacío para no cambiar): ", newTitle => {
    if (newTitle) task.title = newTitle;
    rl.question("Ingrese la nueva descripción (deje vacío para no cambiar): ", newDescription => {
      if (newDescription) task.description = newDescription;
      rl.question("Ingrese la nueva dificultad (fácil/media/alta, deje vacío para no cambiar): ", newDifficulty => {
        if (newDifficulty) task.difficulty = newDifficulty;
        askForDate(newExpireDate => {
          if (newExpireDate) task.expireDate = newExpireDate;
          console.log("Tarea actualizada con éxito.");
          updateTasks([...tasks]);
          handleOption(tasks, updateTasks);
        });
      });
    });
  });
};

// Lógica inicial
let tasks = [];
const updateTasks = newTasks => {
  tasks = newTasks;
  handleOption(tasks, updateTasks);
};

handleOption(tasks, updateTasks);
