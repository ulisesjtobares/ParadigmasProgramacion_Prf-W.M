// models/taskManager.ts

import { Tarea } from './task';
import { Estado, Dificultad } from './task';
import { calcularEstrellas } from '../utils/starCalculator';

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
export function crearTarea(id: number, nombre: string, descripcion: string, dificultad: Dificultad): Tarea {
  const tarea = new Tarea(id, nombre, descripcion, dificultad);
  tarea.estrellas = calcularEstrellas(dificultad);  // Asignamos las estrellas según la dificultad
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
export function cambiarEstadoTarea(tarea: Tarea, estado: Estado): Tarea {
  const tareaModificada = new Tarea(tarea.id, tarea.nombre, tarea.descripcion, tarea.dificultad);
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
export function modificarTarea(tarea: Tarea, nombre: string, descripcion: string, dificultad: Dificultad): Tarea {
  const tareaModificada = new Tarea(tarea.id, nombre, descripcion, dificultad);
  tareaModificada.estrellas = calcularEstrellas(dificultad);  // Recalculamos las estrellas
  return tareaModificada;
}

/**
 * Función pura para buscar una tarea por su ID
 * 
 * @param id - El ID de la tarea a buscar
 * @param tareas - El arreglo de tareas
 * @returns La tarea con el ID dado o null si no se encuentra
 */
export function buscarTareaPorId(id: number, tareas: Tarea[]): Tarea | null {
  return tareas.find(tarea => tarea.id === id) || null;
}

/**
 * Función pura para obtener todas las tareas filtradas por estado
 * 
 * @param tareas - El arreglo de tareas
 * @param estado - El estado de las tareas que queremos filtrar
 * @returns Un arreglo de tareas con el estado dado
 */
export function obtenerTareasPorEstado(tareas: Tarea[], estado: Estado): Tarea[] {
  return tareas.filter(tarea => tarea.estado === estado);
}
