"use strict";
// models/task.ts
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
exports.Tarea = exports.Dificultad = exports.Estado = void 0;
exports.calcularEstrellas = calcularEstrellas;
exports.crearTarea = crearTarea;
exports.cambiarEstadoTarea = cambiarEstadoTarea;
exports.modificarTarea = modificarTarea;
exports.buscarTareaPorId = buscarTareaPorId;
exports.obtenerTareasPorEstado = obtenerTareasPorEstado;
exports.esFechaValida = esFechaValida;
var Estado;
(function (Estado) {
    Estado["Pendiente"] = "Pendiente";
    Estado["EnCurso"] = "EnCurso";
    Estado["Terminada"] = "Terminada";
})(Estado || (exports.Estado = Estado = {}));
var Dificultad;
(function (Dificultad) {
    Dificultad["Facil"] = "Facil";
    Dificultad["Medio"] = "Medio";
    Dificultad["Dificil"] = "Dificil";
})(Dificultad || (exports.Dificultad = Dificultad = {}));
// Interfaz Tarea
var Tarea = /** @class */ (function () {
    // Constructor para inicializar los valores
    function Tarea(id, nombre, descripcion, estado, dificultad, fechaCreacion, fechaVencimiento) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.dificultad = dificultad;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
    }
    return Tarea;
}());
exports.Tarea = Tarea;
// Función para calcular estrellas según la dificultad
function calcularEstrellas(dificultad) {
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
function crearTarea(id, nombre, descripcion, dificultad, fechaVencimiento) {
    return {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        estado: Estado.Pendiente,
        dificultad: dificultad,
        fechaCreacion: new Date(),
        fechaVencimiento: fechaVencimiento,
    };
}
// Función para cambiar el estado de una tarea
function cambiarEstadoTarea(tarea, nuevoEstado) {
    return __assign(__assign({}, tarea), { estado: nuevoEstado });
}
// Función para modificar una tarea (incluyendo la fecha de vencimiento)
function modificarTarea(tarea, nuevoNombre, nuevaDescripcion, nuevaDificultad, nuevaFechaVencimiento) {
    return __assign(__assign({}, tarea), { nombre: nuevoNombre, descripcion: nuevaDescripcion, dificultad: nuevaDificultad, fechaVencimiento: nuevaFechaVencimiento });
}
// Función para buscar tarea por ID
function buscarTareaPorId(id, tareas) {
    return tareas.find(function (tarea) { return tarea.id === id; });
}
// Función para obtener tareas por estado
function obtenerTareasPorEstado(tareas, estado) {
    return tareas.filter(function (tarea) { return tarea.estado === estado; });
}
// Función para validar fecha de vencimiento
function esFechaValida(fecha) {
    var hoy = new Date();
    var año = fecha.getFullYear();
    var mes = fecha.getMonth() + 1; // Mes empieza desde 0
    var dia = fecha.getDate();
    // Validamos que el año sea >= 2024, mes entre 1 y 12 y día entre 1 y 31
    return año >= 2024 && mes >= 1 && mes <= 12 && dia >= 1 && dia <= 31 && fecha >= hoy;
}
