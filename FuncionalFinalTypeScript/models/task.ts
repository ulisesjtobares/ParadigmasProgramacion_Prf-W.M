// models/task.ts

export enum Estado {
  Pendiente = "Pendiente",
  EnCurso = "EnCurso",
  Terminada = "Terminada",
}

export enum Dificultad {
  Facil = "Facil",
  Medio = "Medio",
  Dificil = "Dificil",
}

// Interfaz Tarea
export class Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  estado: Estado;
  dificultad: Dificultad;
  fechaCreacion: Date;
  fechaVencimiento: Date;

  // Constructor para inicializar los valores Puede considerarse pura
  constructor(
      id: number,
      nombre: string,
      descripcion: string,
      estado: Estado,
      dificultad: Dificultad,
      fechaCreacion: Date,
      fechaVencimiento: Date
  ) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.estado = estado;
      this.dificultad = dificultad;
      this.fechaCreacion = fechaCreacion;
      this.fechaVencimiento = fechaVencimiento;
  }
}
// Función para calcular estrellas según la dificultad
export function calcularEstrellas(dificultad: Dificultad): string {
  switch (dificultad) {
    case Dificultad.Facil:
      return "★"; // 1 estrella para fácil
    case Dificultad.Medio:
      return "★★★"; // 3 estrellas para medio
    case Dificultad.Dificil:
      return "★★★★★☆"; // 4 estrellas para difícil
    default:
      return "★";
  }
}

// Función para crear una tarea con fecha de vencimiento
export function crearTarea(id: number, nombre: string, descripcion: string, dificultad: Dificultad, fechaVencimiento: Date): Tarea {
  return {
    id,
    nombre,
    descripcion,
    estado: Estado.Pendiente,
    dificultad,
    fechaCreacion: new Date(),
    fechaVencimiento,
  };
}

// Función para cambiar el estado de una tarea
export function cambiarEstadoTarea(tarea: Tarea, nuevoEstado: Estado): Tarea {
  return {
    ...tarea,
    estado: nuevoEstado,
  };
}

// Función para modificar una tarea (incluyendo la fecha de vencimiento)
export function modificarTarea(tarea: Tarea, nuevoNombre: string, nuevaDescripcion: string, nuevaDificultad: Dificultad, nuevaFechaVencimiento: Date): Tarea {
  return {
    ...tarea,
    nombre: nuevoNombre,
    descripcion: nuevaDescripcion,
    dificultad: nuevaDificultad,
    fechaVencimiento: nuevaFechaVencimiento,
  };
}

// Función para buscar tarea por ID
export function buscarTareaPorId(id: number, tareas: Tarea[]): Tarea | undefined {
  return tareas.find(tarea => tarea.id === id);
}

// Función para obtener tareas por estado
export function obtenerTareasPorEstado(tareas: Tarea[], estado: Estado): Tarea[] {
  return tareas.filter(tarea => tarea.estado === estado);
}

// Función para validar fecha de vencimiento
export function esFechaValida(fecha: Date): boolean {
  const hoy = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; // Mes empieza desde 0
  const dia = fecha.getDate();

  // Validamos que el año sea >= 2024, mes entre 1 y 12 y día entre 1 y 31
  return año >= 2024 && mes >= 1 && mes <= 12 && dia >= 1 && dia <= 31 && fecha >= hoy;
}
