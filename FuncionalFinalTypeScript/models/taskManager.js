"use strict";
// models/taskManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = crearTarea;
exports.cambiarEstadoTarea = cambiarEstadoTarea;
exports.modificarTarea = modificarTarea;
exports.buscarTareaPorId = buscarTareaPorId;
exports.obtenerTareasPorEstado = obtenerTareasPorEstado;
var task_1 = require("./task");
var starCalculator_1 = require("../utils/starCalculator");
/**
 * Función pura para agregar una nueva tarea al arreglo de tareas
 * No tiene efectos secundarios, simplemente devuelve una nueva tarea con sus propiedades
 *
 * @param id - El ID de la tarea
 * @param nombre - El nombre de la tarea
 * @param descripcion - La descripción de la tarea
 * @param dificultad - La dificultad de la tarea
 * @returns La tarea creada
 */
function crearTarea(id, nombre, descripcion, dificultad) {
    var tarea = new task_1.Tarea(id, nombre, descripcion, dificultad);
    tarea.estrellas = (0, starCalculator_1.calcularEstrellas)(dificultad); // Asignamos las estrellas según la dificultad
    return tarea;
}
/**
 * Función pura para cambiar el estado de una tarea sin modificar el estado global
 * Retorna una nueva tarea con el estado actualizado
 *
 * @param tarea - La tarea a modificar
 * @param estado - El nuevo estado para la tarea
 * @returns La tarea con el estado actualizado
 */
function cambiarEstadoTarea(tarea, estado) {
    var tareaModificada = new task_1.Tarea(tarea.id, tarea.nombre, tarea.descripcion, tarea.dificultad);
    tareaModificada.cambiarEstado(estado);
    return tareaModificada;
}
/**
 * Función pura para modificar una tarea, retornando una nueva tarea con los datos modificados
 *
 * @param tarea - La tarea a modificar
 * @param nombre - El nuevo nombre de la tarea
 * @param descripcion - La nueva descripción de la tarea
 * @param dificultad - La nueva dificultad de la tarea
 * @returns La tarea modificada
 */
function modificarTarea(tarea, nombre, descripcion, dificultad) {
    var tareaModificada = new task_1.Tarea(tarea.id, nombre, descripcion, dificultad);
    tareaModificada.estrellas = (0, starCalculator_1.calcularEstrellas)(dificultad); // Recalculamos las estrellas
    return tareaModificada;
}
/**
 * Función pura para buscar una tarea por su ID
 *
 * @param id - El ID de la tarea a buscar
 * @param tareas - El arreglo de tareas
 * @returns La tarea con el ID dado o null si no se encuentra
 */
function buscarTareaPorId(id, tareas) {
    return tareas.find(function (tarea) { return tarea.id === id; }) || null;
}
/**
 * Función pura para obtener todas las tareas filtradas por estado
 *
 * @param tareas - El arreglo de tareas
 * @param estado - El estado de las tareas que queremos filtrar
 * @returns Un arreglo de tareas con el estado dado
 */
function obtenerTareasPorEstado(tareas, estado) {
    return tareas.filter(function (tarea) { return tarea.estado === estado; });
}
