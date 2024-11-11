// utils/starCalculator.ts

import { Dificultad } from '../models/task';

/**
 * Función pura para calcular el número de estrellas basado en la dificultad
 * No tiene efectos secundarios y devuelve siempre el mismo resultado para los mismos argumentos
 * 
 * @param dificultad - La dificultad de la tarea (Fácil, Medio, Difícil)
 * @returns El número de estrellas correspondientes a la dificultad
 */
export function calcularEstrellas(dificultad: Dificultad): number {
  const estrellasPorDificultad: Record<Dificultad, number> = {
    [Dificultad.Facil]: 1,
    [Dificultad.Medio]: 3,
    [Dificultad.Dificil]: 5,
  };
  
  return estrellasPorDificultad[dificultad] || 0;
}
