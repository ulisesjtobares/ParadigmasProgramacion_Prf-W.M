const ps = require('prompt-sync');
const prompt = ps();


//Clase que genera una nueva tarea con sus atributos y metodo correspondiente para ver detalles y editarlos
class TareaNueva {
  constructor(nombre, estado, vencimiento, dificultad) {
    this.nombrePrivado = '' || nombre;
    this.descripcionPrivada = '';
    this.estadoPrivado = '' || estado;
    this.creacion = new Date();
    this.ultimaEdicion = this.creacion || ultimaEdicion;
    this.vencimientoPrivado = '' || vencimiento;
    this.dificultadPrivada = '' || dificultad;
  }

  // Getter y Setter para el Nombre
  //Los Setters que son condicionados (osea que pueden usar X valores o que no pueden ser vacios) se encuentran con una funcion recursiva que controla las entradas
  getNombre() {
    return this.nombrePrivado;
  };

  setNombre() {
    const ingresarNombre = () => {
      let nuevoNombre = prompt('Ingrese el nombre de la tarea: ');

      if (nuevoNombre.trim() === '') {
        console.log('El nombre no puede estar vacío.');
        ingresarNombre(); // Llamada recursiva si el nombre está vacío
      } else {
        this.nombrePrivado = nuevoNombre;
        this.ultimaEdicion = new Date();
      }
    }
    ingresarNombre();
  };


  // Getter y Setter para el Estado
  getEstado() {
    return this.estadoPrivado;
  };

  setEstado() {
    const ingresarEstado = () => {
      let nuevoEstado = prompt('Ingrese el estado de la tarea (Pendiente/En curso/Terminada): ');

      if (nuevoEstado !== 'Pendiente' && nuevoEstado !== 'En curso' && nuevoEstado !== 'Terminada') {
        console.log('Estado no válido. Debe ser Pendiente, En curso o Terminada.');
        ingresarEstado(); // Llamada recursiva si el estado no es válido
      } else {
        this.estadoPrivado = nuevoEstado;
        this.ultimaEdicion = new Date();
      }
    };

    ingresarEstado();
  }

  // Getter y Setter para la Descripción
  getDescripcion() {
    return this.descripcionPrivada;
  };

  setDescripcion() {
    let nuevaDescripcion = prompt('Ingrese la descripción de la tarea: ');
    this.descripcionPrivada = nuevaDescripcion;
    this.ultimaEdicion = new Date();
  };

  // Getter y Setter para la Creación
  getCreacion() {
    return this.creacion;
  };

  // Getter y Setter para la Última Edición
  getUltimaEdicion() {
    return this.ultimaEdicion;
  };

  // Getter y Setter para el Vencimiento
  getVencimiento() {
    return this.vencimientoPrivado;
  };

  setVencimiento() {
    let nuevoVencimiento = prompt('Ingrese el vencimiento de la tarea: ');
    this.vencimientoPrivado = nuevoVencimiento;
    this.ultimaEdicion = new Date();
  };

  // Getter y Setter para la Dificultad
  getDificultad() {
    return this.dificultadPrivada;
  };

  setDificultad() {
    const ingresarDificultad = () => {
      let nuevaDificultad = prompt('Ingrese la dificultad de la tarea (Alta/Media/Baja): ');

      if (nuevaDificultad !== 'Alta' && nuevaDificultad !== 'Media' && nuevaDificultad !== 'Baja') {
        console.log('Dificultad no válida. Debe ser Alta, Media o Baja.');
        ingresarDificultad(); // Llamada recursiva si la dificultad no es válida
      } else {
        this.dificultadPrivada = nuevaDificultad;
        this.ultimaEdicion = new Date();
      }
    };

    ingresarDificultad();
  };

  //Metodo de la clase TareaNueva para ver detalles de la tarea (como vamos a ver las tareas mediante un array se llama a este metodo en verTareas y buscarTareas) y cambiar algun atributo de la tarea de ser posible

  verDetallesTarea = function (tareas) {
    let indiceTarea = parseInt(prompt('Selecciona el número de la tarea para ver detalles: '));

    if (indiceTarea < 1 || indiceTarea > tareas.length) {
      console.log('Opción no válida.');
      return;
    } else {

      indiceTarea = indiceTarea - 1;
      let tareaSeleccionada = tareas[indiceTarea];
      console.log('\n Detalles de la Tarea:');
      console.log(`  Título: ${tareaSeleccionada.getNombre()}`);
      console.log(`  Descripción: ${tareaSeleccionada.getDescripcion()}`);
      console.log(`  Estado: ${tareaSeleccionada.getEstado()}`);
      console.log(`  Creación: ${tareaSeleccionada.getCreacion()}`);
      console.log(`  Última Edición: ${tareaSeleccionada.getUltimaEdicion()}`);
      console.log(`  Vencimiento: ${tareaSeleccionada.getVencimiento()}`);
      console.log(`  Dificultad: ${tareaSeleccionada.getDificultad()}`);

      console.log('\n');
      console.log('¿Desea Editar un dato? S / N \n');

      let decision = prompt('');

      if (decision == 'S') {
        console.log('¿Que desea editar? (Nombre,Descripcion,Estado,Vencimiento,Dificultad,0 para volver) \n');
        decision = prompt('');

        switch (decision) {
          case 'Nombre':
            tareaSeleccionada.setNombre();
            tareaSeleccionada.ultimaEdicion = new Date();
            break;
          case 'Descripcion':
            tareaSeleccionada.setDescripcion();
            tareaSeleccionada.ultimaEdicion = new Date();
            break;
          case 'Estado':
            tareaSeleccionada.setEstado();
            tareaSeleccionada.ultimaEdicion = new Date();
            break;
          case 'Vencimiento':
            tareaSeleccionada.setVencimiento();
            tareaSeleccionada.ultimaEdicion = new Date();
            break;
          case 'Dificultad':
            tareaSeleccionada.setDificultad();
            tareaSeleccionada.ultimaEdicion = new Date();
            break;
          case 0:
            return;
          default:
            console.log('Opcion no valida');
            break;
        }

      } else if (decision == 'N') {
        return;
      } else {
        console.log('Opcion no valida');
        return;
      }
    }
  }
}

module.exports = TareaNueva;