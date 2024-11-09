const ps = require('prompt-sync');
const prompt = ps();
const TareaNueva = require('./TareaNueva.js');

//Clase para ver Tareas

class verTareas {
  constructor(tareas) {
    this.tareas = tareas
  }
  mostrarTareas() {
    if (this.tareas.length === 0) {
      console.log('No hay tareas para mostrar.');
      return;
    }

    console.log('Qué tareas desea ver? \n' +
      ' 1. Todas \n' +
      ' 2. Pendientes \n' +
      ' 3. En curso \n' +
      ' 4. Terminadas \n' +
      ' 0. Volver \n');

    let decision = parseInt(prompt(''));
    switch (decision) {
      case 1:
        console.log('Todas las tareas \n');
        this.tareas.forEach((tarea, index) => {
          console.log(index + 1 + ".", tarea.getNombre());
        });
        let tareaGeneral = new TareaNueva();
        tareaGeneral.verDetallesTarea(this.tareas);
        break;
      case 2:
        console.log('Tareas pendientes');
        this.tareasPendientes = this.tareas.filter(tarea => tarea.getEstado() == 'Pendiente');
        if (this.tareasPendientes.length > 0) {
          this.tareasPendientes.forEach((tarea, index) => {
            console.log(index + 1 + ".", tarea.getNombre());
            console.log("\n");
          });
          let tareaGeneral = new TareaNueva();
          tareaGeneral.verDetallesTarea(this.tareasPendientes);
        } else {
          console.log('No hay tareas pendientes para mostrar.');
        }
        break;
      case 3:
        console.log('Tareas en curso');
        this.tareasEnCurso = this.tareas.filter(tarea => tarea.getEstado() == 'En curso');
        if (this.tareasEnCurso.length > 0) {
          this.tareasEnCurso.forEach((tarea, index) => {
            console.log(index + 1 + ".", tarea.getNombre());
            console.log("\n");
          });
          let tareaGeneral = new TareaNueva();
          tareaGeneral.verDetallesTarea(this.tareasEnCurso);
        } else {
          console.log('No hay tareas en curso para mostrar.');
        }
        break;
      case 4:
        console.log('Tareas terminadas');
        this.tareasTerminadas = this.tareas.filter(tarea => tarea.getEstado() == 'Terminada');
        if (this.tareasTerminadas.length > 0) {
          this.tareasTerminadas.forEach((tarea, index) => {
            console.log(index + 1 + ".", tarea.getNombre());
            console.log("\n");
          });
          let tareaGeneral = new TareaNueva();
          tareaGeneral.verDetallesTarea(this.tareasTerminadas);
        } else {
          console.log('No hay tareas terminadas para mostrar.');
        }
        break;
      case 0:
        console.log('Volver');
        return;
      default:
        console.log('Opción no válida');
        break;
    }
  }
};

module.exports = verTareas;