const readline = require('readline-sync');
const Tarea = require('./Tarea');
const kleur = require('kleur'); /// cambia de color texto en terminal 
const emoji = require('node-emoji'); /// poner emojis
let lista = []; /// lista que contendrá las tareas

function mostrar_encontrados(lista) { ///Muestra los encontrados a través de la búsqueda

    if (lista.length>0) { //Si el tamaño de la lista > 0
        lista.forEach((elemento, index) => { //Para cada elemento de la lista (elemento, indice) se muestra la consola
            console.log(`${index + 1}. ${elemento.titulo}`); ///Se muestra el índice y el título del elemento
        });
    } else {
        console.clear();
        console.log("No se encontro un elemento");
        
    }
}

// Función para ver la lista de tareas en estado "Todo".
function verLista_todo(lista) {
    if (lista.length > 0) { //Si el tamaño de la lista > 0
        lista.forEach((elemento, index) => { //Para cada elemento de la lista (elemento, indice) se muestra la consola
            console.log(`${index + 1}. ${elemento.titulo}`); //Se muestra el índice y el título del elemento
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "Pendiente".
function verLista_pendiente(lista) {
    if (lista.length > 0) { //Si el tamaño de la lista > 0
        lista.forEach((elemento, index) => { //Para cada elemento de la lista, se muestra la consola
            if (elemento.estado === 1) { //Si el estado de la tarea = 1, le corresponde "Pendiente"
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "En Curso".
function verLista_curso(lista) {
    if (lista.length > 0) { //Si el tamaño de la lista > 0
        lista.forEach((elemento, index) => { //Para cada elemento de la lista, se muestra la consola
            if (elemento.estado === 2) { //Si el estado de la tarea = 2, le corresponde "En curso"
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "Finalizado".
function verLista_terminado(lista) {
    if (lista.length > 0) {
        lista.forEach((elemento, index) => { //Para cada elemento de la lista, se muestra la consola
            if (elemento.estado === 3) { //Si el estado de la tarea = 3, le corresponde "Terminada"
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para editar los detalles de una tarea.
function editar_detalle(lista, indice) {
    const esIndiceValido = indice !== -1; //Si la lista tiene algo

    //Si el indice es válido, se procede a preguntar al usuario si quiere editar o no
    if (esIndiceValido) {
        const seleccion = readline.question(`Si deseas modificar esta tarea ${kleur.blue('presiona e')}. Si no, presiona cualquier otra tecla.\n`);
        
        // Verificación de la selección
        if (esSeleccionE(seleccion)) {
            Tarea.editar(lista[indice - 1]);
        }
    }
}

// Función para verificar si la selección es "e"
function esSeleccionE(s) {
    return s.toLowerCase() === "e";
}



// Función para ver los detalles de una tarea, le retorna el índice de la tarea seleccionada a la función editar_detalle
// El complemento se da en index.js, donde se llama mediante Lista.editar_detalle(Lista.lista,Lista.detalle_tarea(Lista.lista))

function detalle_tarea(lista) {
    //Lee la entrada del usuario y la convierte en un número entero
    const seleccion = parseInt(readline.question("Si deseas ver en detalle una de estas tareas, selecciona su índice. Si no, presiona 0 u otra tecla distinta de los índices existentes\n"), 10);

    // Verifica si la selección es válida utilizando una función pura
    if (esSeleccionValida(seleccion, lista.length)) {
        // Si la selección es válida, muestra detalles de la tarea seleccionada
        detalle_tarea_complemento(lista, seleccion);
        return seleccion;
    } else {
        return -1;
    }
}

// Función pura que complementa a la función detalle_tarea y comprueba si la selección es válida
// Es pura porque siempre tendrá el mismo resultado para los mismos argumentos, y porque es libre de efectos secundarios
function esSeleccionValida(seleccion, longitudLista) { 
    return !isNaN(seleccion) && seleccion > 0 && seleccion <= longitudLista;
}



// Función para mostrar los detalles de una tarea.
function detalle_tarea_complemento(lista, indice) {
    const elemento = lista[indice - 1];
    //separadorLength obtiene l longitud de la terminal, si no lo deja en 80
    const separadorLength = process.stdout.columns || 80; 
    ///uso separadorLength para saber la cantidad de veses que voy a repetir '-', para adaptarse a cuaquier teminal
    const separador = "-".repeat(separadorLength);
     // Función para obtener el texto correspondiente al estado
     function obtenerTextoEstado(estado) {
        switch (estado) {
            case 1:
                return kleur.red(`Pendiente ${emoji.get('tada')}`);
            case 2:
                return kleur.yellow(`En curso  ${emoji.get('hourglass')}`);
            case 3:
                return kleur.green(`Finalizado ${emoji.get('white_check_mark')}`);
            default:
                return 'Desconocido';
        }
    }
    console.log(separador);
    console.log("Detalles de la tarea:");
    console.log(`Título: ${elemento.titulo}`);
    console.log(`Descripción: ${elemento.descripcion}`);
    console.log(`Estado: ${obtenerTextoEstado(elemento.estado)}`);
    console.log(`Dificultad: ${obtenerTextoDificultad(elemento.dificultad)}`);
    console.log(`Fecha de Creación: ${formatDate(elemento.creacion)}`);
    console.log(`Última Edición: ${formatDate(elemento.ultima_edicion)}`);
    console.log(`Fecha de Vencimiento: ${formatDate(elemento.vencimiento) || 'No especificada'}`);
    console.log(separador);
}



// Función para obtener el texto correspondiente a la dificultad
function obtenerTextoDificultad(dificultad) {
    switch (dificultad) {
        case 1:
            return kleur.green(`Facil ${emoji.get('smile')}`);
        case 2:
            return kleur.yellow(`Medio ${emoji.get('neutral_face')}`);
             
        case 3:
            return kleur.red(`Dificil ${emoji.get('rage')}`);
        default:
            return 'Desconocido';
    }
}
// Función para formatear una fecha.
function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

module.exports = {
    lista,
    verLista_todo,
    verLista_pendiente,
    verLista_curso,
    verLista_terminado,
    detalle_tarea,
    editar_detalle,
    detalle_tarea_complemento,
    formatDate,
    mostrar_encontrados
};
