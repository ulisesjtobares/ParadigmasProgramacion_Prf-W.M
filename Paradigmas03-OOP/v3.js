const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Task(title, description = '', difficulty, expireDate) {
  this.title = title;
  this.description = description;
  this.status = "pendiente"; // Valor predeterminado
  this.creationDate = new Date();
  this.lastEditDate = new Date();
  this.expireDate = expireDate;
  this.difficulty = difficulty;
}

Task.prototype.changeStatus = function(newStatus) {
  this.status = newStatus;
};

Task.prototype.showTask = function() {
  console.log("\nTitulo:", this.title);
  console.log("Estado:", this.status);
  console.log("Descripción:", this.description);
  console.log("Fecha de creación:", this.creationDate);
  console.log("Fecha de vencimiento:", this.expireDate);
  console.log("Dificultad:", this.getDifficultyStars());
  console.log("Última edición:", this.lastEditDate);
};

Task.prototype.getDifficultyStars = function() {
  switch (this.difficulty.toLowerCase()) {
    case 'baja':
      return '★☆☆';
    case 'media':
      return '★★☆';
    case 'alta':
      return '★★★';
    default:
      return 'Dificultad inválida';
  }
};

Task.prototype.editTask = function(newTitle, newDescription, newStatus, newDifficulty, newExpireDate) {
  this.title = newTitle || this.title;
  this.description = newDescription || this.description;
  this.status = newStatus || this.status;
  this.difficulty = newDifficulty || this.difficulty;
  this.expireDate = newExpireDate || this.expireDate;
  this.lastEditDate = new Date();

  console.log("Tarea editada con éxito.");
};

// Función para validar día, mes y año
function isValidDay(day) {
  return day >= 1 && day <= 31;
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  return year >= 1900 && year <= new Date().getFullYear();
}

// Función para validar dificultad
function isValidDifficulty(difficulty) {
  const validDifficulties = ['baja', 'media', 'alta'];
  return validDifficulties.includes(difficulty.toLowerCase());
}

// Función para validar estado
function isValidStatus(status) {
  const validStatuses = ['pendiente', 'en curso', 'terminada'];
  return validStatuses.includes(status.toLowerCase());
}

const taskList = [];

function createTask(title, description, difficulty, expireDate) {
  const task = new Task(title, description, difficulty, expireDate);
  taskList.push(task);
}

function showTaskAndEdit(task) {
  task.showTask();

  rl.question("\nPresione 'E' para editar la tarea, '0' para volver: \n", (response) => {
    if (response.toLowerCase() === 'e') {
      editTask(task);
    } else if (response === '0') {
      mainMenu();
    } else {
      console.log("Opción no válida. Volviendo al Menú Principal.");
      mainMenu();
    }
  });
}

function editTask(task) {
  rl.question("Nuevo título (Enter para mantener el actual): ", (newTitle) => {
    rl.question("Nueva descripción (Enter para mantener la actual): ", (newDescription) => {
      rl.question("Nuevo estado (pendiente/en curso/terminada) (Enter para mantener el actual): ", (newStatus) => {
        if (newStatus && !isValidStatus(newStatus)) {
          console.log("Estado inválido. Ingrese pendiente, en curso o terminada.");
          return editTask(task); // Volver a la edición si es inválido
        }

        rl.question("Nueva dificultad (baja/media/alta) (Enter para mantener la actual): ", (newDifficulty) => {
          if (newDifficulty && !isValidDifficulty(newDifficulty)) {
            console.log("Dificultad inválida. Ingrese baja, media o alta.");
            return editTask(task); // Volver a la edición si es inválido
          }

          askForDate((newExpireDate) => {
            task.editTask(newTitle, newDescription, newStatus, newDifficulty, newExpireDate);
            rl.question("Presiona Enter para volver al Menú Principal.", () => {
              mainMenu();
            });
          });
        });
      });
    });
  });
}

// Función para solicitar y validar fecha
function askForDate(callback) {
  rl.question("Ingrese el día de vencimiento (1-31): ", (day) => {
    if (!isValidDay(Number(day))) {
      console.log("Día inválido. Debe estar entre 1 y 31.");
      return askForDate(callback); // Reintentar
    }

    rl.question("Ingrese el mes de vencimiento (1-12): ", (month) => {
      if (!isValidMonth(Number(month))) {
        console.log("Mes inválido. Debe estar entre 1 y 12.");
        return askForDate(callback); // Reintentar
      }

      rl.question("Ingrese el año de vencimiento (>= 1900 y <= " + new Date().getFullYear() + "): ", (year) => {
        if (!isValidYear(Number(year))) {
          console.log("Año inválido. Debe ser un año entre 1900 y el actual.");
          return askForDate(callback); // Reintentar
        }

        // Si todos los valores son válidos, combinamos la fecha en un formato adecuado
        const expireDate = `${day}/${month}/${year}`;
        callback(expireDate);
      });
    });
  });
}

function displayMainMenu() {
  console.log("\nMenú principal");
  console.log("1. Ver mis tareas\n2. Buscar una tarea\n3. Crear tarea\n0. Salir \n");
}

function displaySubMenu() {
  console.log("\n¿Qué tareas deseas ver?");
  console.log("1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Volver\n");
}

function mainMenu() {
  rl.question("\nPresiona Enter para mostrar el Menú Principal.", () => {
    displayMainMenu();

    rl.question("?", (main_menu) => {
      switch (main_menu) {
        case '1':
          displaySubMenu();

          rl.question("?", (sub_menu) => {
            switch (sub_menu) {
              case '1': // Todas
                console.log("\nMostrando todas las tareas...\n");

                taskList.sort((a, b) => a.title.localeCompare(b.title));

                for (let i = 0; i < taskList.length; i++) {
                  taskList[i].showTask();
                }

                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '2': // Pendientes
                console.log("\nMostrando todas las tareas pendientes...\n");

                for (let i = 0; i < taskList.length; i++) {
                  if (taskList[i].status.toLowerCase() === "pendiente") {
                    taskList[i].showTask();
                  }
                }
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '3': // En curso
                console.log("\nMostrando todas las tareas en curso...\n");

                for (let i = 0; i < taskList.length; i++) {
                  if (taskList[i].status.toLowerCase() === "en curso") {
                    taskList[i].showTask();
                  }
                }
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '4': // Terminadas
                console.log("\nMostrando todas las tareas terminadas...\n");

                for (let i = 0; i < taskList.length; i++) {
                  if (taskList[i].status.toLowerCase() === "terminada") {
                    taskList[i].showTask();
                  }
                }
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              default:
                console.log("Respuesta inválida. Vuelva a intentarlo.\n");
                displaySubMenu(); // Reintentar
                break;
            }
          });
          break;

        case '2':
          rl.question("Ingrese el título de la tarea a buscar: ", (taskTitle) => {
            let taskFound = false;
            for (let i = 0; i < taskList.length; i++) {
              if (taskList[i].title === taskTitle) {
                showTaskAndEdit(taskList[i]);
                taskFound = true;
                break;
              }
            }

            if (!taskFound) {
              console.log("Tarea no encontrada.");
            }

            rl.question("Presiona Enter para volver al Menú Principal.", () => {
              mainMenu();
            });
          });
          break;

        case '3':
          rl.question("Ingrese el título de la tarea: ", (title) => {
            rl.question("Ingrese la descripción de la tarea: ", (description) => {
              rl.question("Ingrese la dificultad (baja/media/alta): ", (difficulty) => {
                if (!isValidDifficulty(difficulty)) {
                  console.log("Dificultad inválida. Ingrese baja, media o alta.");
                  return mainMenu(); // Volver al menú principal
                }

                askForDate((expireDate) => {
                  createTask(title, description, difficulty, expireDate);
                  console.log("Tarea creada con éxito.");
                  rl.question("Presiona Enter para volver al Menú Principal.", () => {
                    mainMenu();
                  });
                });
              });
            });
          });
          break;

        case '0':
          rl.close();
          console.log("Saliendo del programa. ¡Adiós!");
          break;

        default:
          console.log("Opción no válida. Intente nuevamente.\n");
          mainMenu();
      }
    });
  });
}

mainMenu();
