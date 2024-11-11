"use strict";
// utils/starCalculator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularEstrellas = calcularEstrellas;
var task_1 = require("../models/task");
/**
 * Función pura para calcular el número de estrellas basado en la dificultad
 * No tiene efectos secundarios y devuelve siempre el mismo resultado para los mismos argumentos
 *
 * @param dificultad - La dificultad de la tarea (Fácil, Medio, Difícil)
 * @returns El número de estrellas correspondientes a la dificultad
 */
function calcularEstrellas(dificultad) {
    var _a;
    var estrellasPorDificultad = (_a = {},
        _a[task_1.Dificultad.Facil] = 1,
        _a[task_1.Dificultad.Medio] = 3,
        _a[task_1.Dificultad.Dificil] = 5,
        _a);
    return estrellasPorDificultad[dificultad] || 0;
}
