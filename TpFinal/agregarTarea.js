const ps = require('prompt-sync');
const prompt = ps();
const TareaNueva = require('./TareaNueva.js');

//Clase para Agregar Tarea Nueva

class AgregarTarea {
  constructor(tareas) {
    this.tareas = tareas
  }
  // Método para agregar una nueva tarea
  agregarNuevaTarea() {
    let nuevaTarea = new TareaNueva();
    nuevaTarea.setNombre();
    nuevaTarea.setDescripcion();
    nuevaTarea.setEstado();
    nuevaTarea.setVencimiento();
    nuevaTarea.setDificultad();

    // Agrega la nueva tarea al arreglo de tareas
    this.tareas.push(nuevaTarea);

    console.log('Tarea agregada con éxito.');
  }
}

module.exports = AgregarTarea;