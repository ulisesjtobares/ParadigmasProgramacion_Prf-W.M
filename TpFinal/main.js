let AgregarTarea = require('./agregarTarea.js');
let VerTareas = require('./verTareas.js');
let BuscarTareas = require('./buscarTareas.js');
let prompt = require('prompt-sync')();
let mostrarInterfaz = require('./generarInterfaz.js');
let ps = require('prompt-sync');
let tareas = [];

// Funcion para mostrar el menu y elegir una opcion
function elegirOpcion() {
    console.clear();
    mostrarInterfaz();
    const opcion = parseInt(prompt('Ingrese su opción (1-4): '));

    const ejecutarOpcion = () => {
        switch (opcion) {
            case 1:
                const verTareas = new VerTareas(tareas);
                verTareas.mostrarTareas();
                break;
            case 2:
                const buscarTareas = new BuscarTareas(tareas);
                buscarTareas.buscadorTareas();
                break;
            case 3:
                const agregarTarea = new AgregarTarea(tareas);
                agregarTarea.agregarNuevaTarea();
                break;
            case 4:
                console.log('Salir');
                break;
            default:
                console.log('Opción no válida');
                break;
        }

        if (opcion !== 4) {
            elegirOpcion(); // Llamada recursiva si la opción no es salir (4)
        }
    };

    ejecutarOpcion();
}

// Llamada a la función impura para elegir una opción del menu

elegirOpcion();