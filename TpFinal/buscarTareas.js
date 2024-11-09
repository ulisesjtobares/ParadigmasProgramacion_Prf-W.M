const ps = require('prompt-sync');
const prompt = ps();
const TareaNueva = require('./TareaNueva.js');

//Clase para buscar las Tareas por nombre

class buscarTareas {
  constructor(tareas) {
    this.tareas = tareas
  }
  buscadorTareas() {
    if (this.tareas.length === 0) {
      console.log('No hay tareas para buscar.');
      return;
    }

    let cadenaBusqueda = prompt('Ingrese el título o parte del título de la tarea: ');

    // Filtrar las tareas cuyos títulos contienen la cadena de búsqueda
    this.tareasEncontradas = this.tareas.filter(tarea => tarea.getNombre().includes(cadenaBusqueda));

    if (this.tareasEncontradas.length === 0) {
      console.log(`No se encontraron tareas con el título que contiene "${cadenaBusqueda}".`);
      return;
    }

    console.log(`Estas son las tareas relacionadas con el titulo "${cadenaBusqueda}":`);
    console.log("\n \n");
    this.tareasEncontradas.forEach((tarea, index) => {
      console.log(index + 1 + ".", tarea.getNombre());
    });
    let tareaGeneral = new TareaNueva();
    tareaGeneral.verDetallesTarea(this.tareasEncontradas);
  }
};
module.exports = buscarTareas;