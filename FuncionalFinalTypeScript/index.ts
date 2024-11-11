// index.ts

import * as readline from 'readline';
import { crearTarea, cambiarEstadoTarea, modificarTarea, buscarTareaPorId, obtenerTareasPorEstado, calcularEstrellas, esFechaValida } from './models/task';
import { Estado, Dificultad } from './models/task';

// Creamos algunas tareas de ejemplo
const tareas = [
  crearTarea(1, "Estudiar TypeScript", "Estudiar los conceptos de TypeScript", Dificultad.Facil, new Date(2024, 10, 25)), // Fecha: 25 Noviembre 2024
  crearTarea(2, "Desarrollar aplicación", "Desarrollar una aplicación de ejemplo", Dificultad.Medio, new Date(2024, 11, 15)), // Fecha: 15 Diciembre 2024
  crearTarea(3, "Optimizar código", "Optimizar el rendimiento del código", Dificultad.Dificil, new Date(2024, 9, 10)), // Fecha: 10 Octubre 2024
];

// Creamos la interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú
function mostrarMenu(): void {
  console.log("\n1. Ver todas las tareas");
  console.log("2. Buscar tarea por ID");
  console.log("3. Modificar tarea");
  console.log("4. Cambiar estado de tarea");
  console.log("5. Ver tareas pendientes");
  console.log("6. Ver tareas en curso");
  console.log("7. Ver tareas terminadas");
  console.log("8. Agregar nueva tarea");
  console.log("9. Salir");
}

// Función para manejar la opción seleccionada por el usuario
function manejarOpcion(opcion: number): void {
  switch (opcion) {
    case 1:
      console.table(tareas.map(tarea => ({
        ...tarea,
        estrellas: calcularEstrellas(tarea.dificultad),
        fechaVencimiento: tarea.fechaVencimiento.toLocaleDateString(), // Mostramos la fecha de vencimiento
      })));
      break;
    case 2:
      rl.question("Ingrese el ID de la tarea a buscar: ", (idBuscar: string) => {
        const tareaEncontrada = buscarTareaPorId(Number(idBuscar), tareas);
        tareaEncontrada ? console.table([tareaEncontrada]) : console.log("Tarea no encontrada");
        menuRecursivo();
      });
      return;
    case 3:
      rl.question("Ingrese el ID de la tarea a modificar: ", (idModificar: string) => {
        const tareaAModificar = buscarTareaPorId(Number(idModificar), tareas);
        if (tareaAModificar) {
          rl.question("Ingrese el nuevo nombre: ", (nuevoNombre: string) => {
            rl.question("Ingrese la nueva descripción: ", (nuevaDescripcion: string) => {
              rl.question("Ingrese la nueva dificultad (Fácil, Medio, Difícil): ", (nuevaDificultad: string) => {
                rl.question("Ingrese la nueva fecha de vencimiento (dd/mm/yyyy): ", (fechaVencimiento: string) => {
                  const [dia, mes, año] = fechaVencimiento.split("/").map(Number);
                  const nuevaFechaVencimiento = new Date(año, mes - 1, dia);
                  if (esFechaValida(nuevaFechaVencimiento)) {
                    const tareaModificada = modificarTarea(tareaAModificar, nuevoNombre, nuevaDescripcion, Dificultad[nuevaDificultad as keyof typeof Dificultad], nuevaFechaVencimiento);
                    tareas.splice(tareas.indexOf(tareaAModificar), 1, tareaModificada);
                    console.log("Tarea modificada correctamente.");
                    menuRecursivo();
                  } else {
                    console.log("Fecha de vencimiento inválida. Debe ser después de 2024 y tener un día válido.");
                    menuRecursivo();
                  }
                });
              });
            });
          });
        } else {
          console.log("Tarea no encontrada");
          menuRecursivo();
        }
      });
      return;
    case 4:
      rl.question("Ingrese el ID de la tarea a cambiar el estado: ", (idEstado: string) => {
        const tareaAEstado = buscarTareaPorId(Number(idEstado), tareas);
        if (tareaAEstado) {
          rl.question("Ingrese el nuevo estado (Pendiente, EnCurso, Terminada): ", (nuevoEstado: string) => {
            const tareaConNuevoEstado = cambiarEstadoTarea(tareaAEstado, Estado[nuevoEstado as keyof typeof Estado]);
            tareas.splice(tareas.indexOf(tareaAEstado), 1, tareaConNuevoEstado);
            menuRecursivo();
          });
        } else {
          console.log("Tarea no encontrada");
          menuRecursivo();
        }
      });
      return;
    case 5:
      console.table(obtenerTareasPorEstado(tareas, Estado.Pendiente));
      break;
    case 6:
      console.table(obtenerTareasPorEstado(tareas, Estado.EnCurso));
      break;
    case 7:
      console.table(obtenerTareasPorEstado(tareas, Estado.Terminada));
      break;
    case 8:
      agregarTarea();
      return;
    case 9:
      rl.close();
      return;
    default:
      console.log("Opción no válida.");
  }
  menuRecursivo();
}

// Función para agregar una nueva tarea con validaciones recursivas
function agregarTarea(): void {
  rl.question("Ingrese el nombre de la tarea: ", (nombre: string) => {
    if (!nombre) {
      console.log("El nombre no puede estar vacío.");
      return agregarTarea(); // Recursividad
    }
    rl.question("Ingrese la descripción de la tarea: ", (descripcion: string) => {
      if (!descripcion) {
        console.log("La descripción no puede estar vacía.");
        return agregarTarea(); // Recursividad
      }
      rl.question("Ingrese la dificultad (Fácil, Medio, Difícil): ", (dificultad: string) => {
        if (![Dificultad.Facil, Dificultad.Medio, Dificultad.Dificil].includes(dificultad as Dificultad)) {
          console.log("Dificultad inválida. Debe ser Fácil, Medio o Difícil.");
          return agregarTarea(); // Recursividad
        }
        rl.question("Ingrese la fecha de vencimiento (dd/mm/yyyy): ", (fechaVencimiento: string) => {
          const [dia, mes, año] = fechaVencimiento.split("/").map(Number);
          const nuevaFechaVencimiento = new Date(año, mes - 1, dia);
          if (esFechaValida(nuevaFechaVencimiento)) {
            const id = tareas.length + 1; // Asignamos un nuevo ID basado en el tamaño actual de tareas
            const nuevaTarea = crearTarea(id, nombre, descripcion, Dificultad[dificultad as keyof typeof Dificultad], nuevaFechaVencimiento);
            tareas.push(nuevaTarea);
            console.log("Tarea agregada correctamente.");
            menuRecursivo();
          } else {
            console.log("Fecha de vencimiento inválida. Debe ser después de 2024 y tener un día válido.");
            agregarTarea(); // Recursividad
          }
        });
      });
    });
  });
}

// Menú recursivo
function menuRecursivo(): void {
  mostrarMenu();
  rl.question("Seleccione una opción: ", (opcion: string) => {
    manejarOpcion(Number(opcion));
  });
}

// Iniciamos el menú
menuRecursivo();
