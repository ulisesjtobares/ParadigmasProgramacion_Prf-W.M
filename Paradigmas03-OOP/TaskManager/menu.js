// menu.js
const readline = require('readline');
const { isValidDay, isValidMonth, isValidYear, isValidDifficulty, isValidStatus } = require('./validation');
const Task = require('./Task');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
            console.log("Tarea editada con éxito.");
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

      rl.question("Ingrese el año de vencimiento (<= " + new Date().getFullYear() + "): ", (year) => {
        if (!isValidYear(Number(year))) {
          console.log("Año inválido. Debe ser un año igual o mayor al actual");
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
                taskList.forEach(task => task.showTask());
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '2': // Pendientes
                console.log("\nMostrando todas las tareas pendientes...\n");
                taskList.filter(task => task.status.toLowerCase() === "pendiente").forEach(task => task.showTask());
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '3': // En curso
                console.log("\nMostrando todas las tareas en curso...\n");
                taskList.filter(task => task.status.toLowerCase() === "en curso").forEach(task => task.showTask());
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '4': // Terminadas
                console.log("\nMostrando todas las tareas terminadas...\n");
                taskList.filter(task => task.status.toLowerCase() === "terminada").forEach(task => task.showTask());
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break;

              case '5': // Volver
                mainMenu();
                break;

              default:
                console.log("Opción no válida. Volviendo al Menú Principal.");
                mainMenu();
            }
          });
          break;

        case '2':
          // Buscar tarea
          rl.question("¿Cuál es el título de la tarea que deseas buscar? ", (searchTerm) => {
            const foundTasks = taskList.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
            
            if (foundTasks.length === 0) {
              console.log("No se encontraron tareas con ese título.");
              rl.question("Presiona Enter para volver al Menú Principal.", () => {
                mainMenu();
              });
            } else {
              console.log("\nTareas encontradas:");
              foundTasks.forEach((task, index) => {
                console.log(`\nTarea ${index + 1}:`);
                task.showTask();
              });
              
              rl.question("¿Deseas editar alguna tarea? (s/n): ", (editResponse) => {
                if (editResponse.toLowerCase() === 's') {
                  rl.question("Ingresa el número de la tarea que deseas editar: ", (taskNumber) => {
                    const taskIndex = parseInt(taskNumber) - 1;

                    if (taskIndex >= 0 && taskIndex < foundTasks.length) {
                      showTaskAndEdit(foundTasks[taskIndex]); // Llama a la función de edición
                    } else {
                      console.log("Número de tarea inválido.");
                      rl.question("Presiona Enter para volver al Menú Principal.", () => {
                        mainMenu();
                      });
                    }
                  });
                } else {
                  rl.question("Presiona Enter para volver al Menú Principal.", () => {
                    mainMenu();
                  });
                }
              });
            }
          });
          break;

        case '3':
          // Crear tarea
          rl.question("Título de la tarea: ", (title) => {
            rl.question("Descripción de la tarea (opcional): ", (description) => {
              rl.question("Dificultad (baja/media/alta): ", (difficulty) => {
                if (!isValidDifficulty(difficulty)) {
                  console.log("Dificultad inválida. Debe ser baja, media o alta.");
                  return mainMenu(); // Volver al menú principal si es inválido
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
          console.log("¡Gracias por usar la aplicación!");
          rl.close();
          break;

        default:
          console.log("Opción no válida. Por favor, intente de nuevo.");
          mainMenu();
      }
    });
  });
}

module.exports = {
  mainMenu,
};
