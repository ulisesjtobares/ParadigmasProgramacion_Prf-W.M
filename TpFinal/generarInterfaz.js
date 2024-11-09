
//Funcion para generar interfaz
// Función pura que genera la interfaz como una cadena de texto (Funcion pura porque no tiene efectos secundarios)
function generarTextoInterfaz() {
    return 'Hola Olivia \n'
        + ' Que deberías hacer? \n'
        + ' 1. Ver mis Tareas \n'
        + ' 2. Buscar una Tarea \n'
        + ' 3. Agregar una Tarea \n'
        + ' 4. Salir \n';
}

// Función impura que imprime la cadena de texto en la consola
function mostrarInterfaz() {
    console.log(generarTextoInterfaz());
}

module.exports = mostrarInterfaz;