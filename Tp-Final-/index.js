const readline = require('readline-sync'); //Módulo que permite leer la entrada del usuario de manera síncrona, bloqueando la ejecución del programa hasta que se recibe la entrada del usuario.
const Tarea = require('./Tarea');
const Lista = require('./Lista');
const kleur = require('kleur');/// Cambia de color texto en terminal 
const emoji = require('node-emoji');/// Habilita el uso de emojis

/// Ejecucion del menu principal con recursividad
function menu(){

    //Muestra el menú principal
    introduccion(); 
    // Se le asigna la función de primer orden IngresoOpción a la const opción
    // Esta función toma el valor ingresado y lo convierte en entero
    const opcion= ingresoOpcion();
    // procesarOpcion procesa las opciones del menú principal mediante un switch que lleva al case correspondiente
    procesarOpcion(opcion);
    if(opcion!==4){
        menu();
    }
}

function introduccion() {
    console.log(`${kleur.green('1')} Ver tarea `);
    console.log(`${kleur.green('2')} Buscar Tarea`);
    console.log(`${kleur.green('3')} Agregar Tarea`);
    console.log(`${kleur.green('4')} Cerrar `);
}

/// Validación que pide un dato tipo entero y lo devuelve 
function ingresoOpcion() {
    try {
        const x = readline.question("Ingresa una de estas opciones:\n");
        
        if (isNaN(x)) {
            console.log("Error, el valor ingresado no es un numero");
            return ingresoOpcion();  // Llamada recursiva
        } else {
            const z = parseInt(x);
            return z;
        }
        
    } catch (error) {
        console.log("Ha surgido un error, inténtalo de nuevo");
        return ingresoOpcion();  // Llamada recursiva en caso de error
    }
}

/// Función procesarOpcion, va a servir para procesar las opciones del menu principal 
function procesarOpcion(opcion) {
    switch (opcion) {
        case 1:
                MenuCasoUno();// Ejecuta sub menu con recursividad, para evitar uso de bucle do-while
            break;
        case 2:
                // Buscar crea una sub-lista "encontrados" con los objetos encontrados
                const encontrados = Tarea.buscar(Lista.lista);
                // La función mostrar_encontrados muestra los elementos de esta sub-lista
                Lista.mostrar_encontrados(encontrados);
                // Verifica que la sub-lista no esté vacía
                if (encontrados.length > 0) {
                // La función detalle_tarea muestra los detalles de la tarea que selecciona el usuario, si es que selecciona
                    Lista.detalle_tarea(encontrados);
                }
             break;
        case 3:
                // Agrega una tarea al array lista
                 Lista.lista.push(Tarea.ingresar());
            break;
        case 4:
                console.log('\x1b[36mGracias por usar \x1b[35mAgenda\x1b[0m: no olvides organizar tus tareas');
                break;
        default:
                console.log("Opcion incorrecta");
                break;
        }
    }

/// Ejecución del sub-menu del caso uno con recursividad 
function MenuCasoUno(){
    //Menú principal del caso 1 (selección de tareas por estado)
    CasoUno();
    // Se le asigna la función de primer orden IngresoOpción a la const opción
    // Esta función toma el valor ingresado y lo convierte en entero
    const opcion=ingresoOpcion(); 
    console.clear();
    // procesarCasoUno procesa las opciones del menú principal mediante un switch que lleva al case correspondiente
    procesarCasoUno(opcion);
    if(opcion!==5){
        MenuCasoUno();
    }
}
  
function CasoUno() {
    console.log(`${kleur.bgMagenta('1')} Todas `);
    console.log(`${kleur.bgMagenta('2')} Pendientes`);
    console.log(`${kleur.bgMagenta('3')} Tareas en Curso`);
    console.log(`${kleur.bgMagenta('4')} Tareas Finalizadas`);
    console.log(`${kleur.bgMagenta('5')} Volver`);
}

///Funcion procesarCasoUno, ésta sirve para procesar las opciones del sub-menu del caso uno
function procesarCasoUno(opcion){
    
    switch (opcion) {
        case 1:
            // Muestra todas las tareas mediante la función verLista_todo, pasando lista por referencia
            Lista.verLista_todo(Lista.lista);
            // Si la lista no está vacía
            if (Lista.lista.length > 0) {
                // Se llama a la función editar_detalle, que a su vez toma como parámetros a lista y al índice que obtendrá devuelto por detalle_tarea
                Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
            }
            break;
        case 2:
            //Muestra todas las tareas pendientes mediante la función verLista_pendiente, pasando lista por referencia
            Lista.verLista_pendiente(Lista.lista);
            // Si la lista no está vacía
            if (Lista.lista.length > 0) {
                // Se llama a la función editar_detalle, que a su vez toma como parámetros a lista y al índice que obtendrá devuelto por detalle_tarea
                Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
            }
            break;
        case 3:
            // Muestra todas las tareas en curso mediante la función verLista_curso, pasando lista por referencia
            Lista.verLista_curso(Lista.lista);
            // Si la lista no está vacía
            if (Lista.lista.length > 0) {
                // Se llama a la función editar_detalle, que a su vez toma como parámetros a lista y al índice que obtendrá devuelto por detalle_tarea
                Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
            }
            break;
        case 4:
            //Muestra todas las tareas terminadas mediante la función verLista_terminado, pasando lista por referencia
            Lista.verLista_terminado(Lista.lista);
            // Si la lista no está vacía
            if (Lista.lista.length > 0) {
                // Se llama a la función editar_detalle, que a su vez toma como parámetros a lista y al índice que obtendrá devuelto por detalle_tarea
                Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
            }
            break;
         case 5:
                ///No se hace nada, sin embargo es necesario que exista el caso 5
            break;
        default:
            console.log("El valor Ingresado es incorrecto, inténtelo de nuevo \n");
            break;
    }

}

let botonS;
let boton = 0;
let condicion = 2;
let condicion_caso_uno = 0;
console.log('\x1b[36mBienvenido al proyecto \x1b[35mAgenda\x1b[0m: aquí podrás organizar tus tareas ');
menu();




