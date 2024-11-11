"use strict";
// index.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var task_1 = require("./models/task");
var task_2 = require("./models/task");
// Creamos algunas tareas de ejemplo
var tareas = [
    (0, task_1.crearTarea)(1, "Estudiar TypeScript", "Estudiar los conceptos de TypeScript", task_2.Dificultad.Facil, new Date(2024, 10, 25)), // Fecha: 25 Noviembre 2024
    (0, task_1.crearTarea)(2, "Desarrollar aplicación", "Desarrollar una aplicación de ejemplo", task_2.Dificultad.Medio, new Date(2024, 11, 15)), // Fecha: 15 Diciembre 2024
    (0, task_1.crearTarea)(3, "Optimizar código", "Optimizar el rendimiento del código", task_2.Dificultad.Dificil, new Date(2024, 9, 10)), // Fecha: 10 Octubre 2024
];
// Creamos la interfaz de readline
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para mostrar el menú
function mostrarMenu() {
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
function manejarOpcion(opcion) {
    switch (opcion) {
        case 1:
            console.table(tareas.map(function (tarea) { return (__assign(__assign({}, tarea), { estrellas: (0, task_1.calcularEstrellas)(tarea.dificultad), fechaVencimiento: tarea.fechaVencimiento.toLocaleDateString() })); }));
            break;
        case 2:
            rl.question("Ingrese el ID de la tarea a buscar: ", function (idBuscar) {
                var tareaEncontrada = (0, task_1.buscarTareaPorId)(Number(idBuscar), tareas);
                tareaEncontrada ? console.table([tareaEncontrada]) : console.log("Tarea no encontrada");
                menuRecursivo();
            });
            return;
        case 3:
            rl.question("Ingrese el ID de la tarea a modificar: ", function (idModificar) {
                var tareaAModificar = (0, task_1.buscarTareaPorId)(Number(idModificar), tareas);
                if (tareaAModificar) {
                    rl.question("Ingrese el nuevo nombre: ", function (nuevoNombre) {
                        rl.question("Ingrese la nueva descripción: ", function (nuevaDescripcion) {
                            rl.question("Ingrese la nueva dificultad (Fácil, Medio, Difícil): ", function (nuevaDificultad) {
                                rl.question("Ingrese la nueva fecha de vencimiento (dd/mm/yyyy): ", function (fechaVencimiento) {
                                    var _a = fechaVencimiento.split("/").map(Number), dia = _a[0], mes = _a[1], año = _a[2];
                                    var nuevaFechaVencimiento = new Date(año, mes - 1, dia);
                                    if ((0, task_1.esFechaValida)(nuevaFechaVencimiento)) {
                                        var tareaModificada = (0, task_1.modificarTarea)(tareaAModificar, nuevoNombre, nuevaDescripcion, task_2.Dificultad[nuevaDificultad], nuevaFechaVencimiento);
                                        tareas.splice(tareas.indexOf(tareaAModificar), 1, tareaModificada);
                                        console.log("Tarea modificada correctamente.");
                                        menuRecursivo();
                                    }
                                    else {
                                        console.log("Fecha de vencimiento inválida. Debe ser después de 2024 y tener un día válido.");
                                        menuRecursivo();
                                    }
                                });
                            });
                        });
                    });
                }
                else {
                    console.log("Tarea no encontrada");
                    menuRecursivo();
                }
            });
            return;
        case 4:
            rl.question("Ingrese el ID de la tarea a cambiar el estado: ", function (idEstado) {
                var tareaAEstado = (0, task_1.buscarTareaPorId)(Number(idEstado), tareas);
                if (tareaAEstado) {
                    rl.question("Ingrese el nuevo estado (Pendiente, EnCurso, Terminada): ", function (nuevoEstado) {
                        var tareaConNuevoEstado = (0, task_1.cambiarEstadoTarea)(tareaAEstado, task_2.Estado[nuevoEstado]);
                        tareas.splice(tareas.indexOf(tareaAEstado), 1, tareaConNuevoEstado);
                        menuRecursivo();
                    });
                }
                else {
                    console.log("Tarea no encontrada");
                    menuRecursivo();
                }
            });
            return;
        case 5:
            console.table((0, task_1.obtenerTareasPorEstado)(tareas, task_2.Estado.Pendiente));
            break;
        case 6:
            console.table((0, task_1.obtenerTareasPorEstado)(tareas, task_2.Estado.EnCurso));
            break;
        case 7:
            console.table((0, task_1.obtenerTareasPorEstado)(tareas, task_2.Estado.Terminada));
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
function agregarTarea() {
    rl.question("Ingrese el nombre de la tarea: ", function (nombre) {
        if (!nombre) {
            console.log("El nombre no puede estar vacío.");
            return agregarTarea(); // Recursividad
        }
        rl.question("Ingrese la descripción de la tarea: ", function (descripcion) {
            if (!descripcion) {
                console.log("La descripción no puede estar vacía.");
                return agregarTarea(); // Recursividad
            }
            rl.question("Ingrese la dificultad (Fácil, Medio, Difícil): ", function (dificultad) {
                if (![task_2.Dificultad.Facil, task_2.Dificultad.Medio, task_2.Dificultad.Dificil].includes(dificultad)) {
                    console.log("Dificultad inválida. Debe ser Fácil, Medio o Difícil.");
                    return agregarTarea(); // Recursividad
                }
                rl.question("Ingrese la fecha de vencimiento (dd/mm/yyyy): ", function (fechaVencimiento) {
                    var _a = fechaVencimiento.split("/").map(Number), dia = _a[0], mes = _a[1], año = _a[2];
                    var nuevaFechaVencimiento = new Date(año, mes - 1, dia);
                    if ((0, task_1.esFechaValida)(nuevaFechaVencimiento)) {
                        var id = tareas.length + 1; // Asignamos un nuevo ID basado en el tamaño actual de tareas
                        var nuevaTarea = (0, task_1.crearTarea)(id, nombre, descripcion, task_2.Dificultad[dificultad], nuevaFechaVencimiento);
                        tareas.push(nuevaTarea);
                        console.log("Tarea agregada correctamente.");
                        menuRecursivo();
                    }
                    else {
                        console.log("Fecha de vencimiento inválida. Debe ser después de 2024 y tener un día válido.");
                        agregarTarea(); // Recursividad
                    }
                });
            });
        });
    });
}
// Menú recursivo
function menuRecursivo() {
    mostrarMenu();
    rl.question("Seleccione una opción: ", function (opcion) {
        manejarOpcion(Number(opcion));
    });
}
// Iniciamos el menú
menuRecursivo();
