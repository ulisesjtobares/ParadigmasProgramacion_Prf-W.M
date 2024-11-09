"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------IMPORTES------------------------
var readline = require("readline-sync");
var prompt = require("prompt-sync");
//------------------------IMPORTES------------------------
//------------------------FUNCIONES------------------------
function buscarPorTitulo(a, b) {
    var tareasCoincidentes = [];
    for (var _i = 0, tareas_1 = tareas; _i < tareas_1.length; _i++) {
        var tarea = tareas_1[_i];
        if (tarea.titulo.toLowerCase().includes(b.toLowerCase())) {
            console.log("Titulo: ", tarea.titulo, "\nDescripcion: ", tarea.descripcion, "\nEstado:", tarea.estado, "\nFecha de Creacion: ", tarea.fecha_creacion.toLocaleDateString(), "\nVencimiento: ", tarea.vencimiento.toLocaleDateString(), "\nDificultad: ", tarea.dificultad);
        }
    }
    return tareasCoincidentes;
}
//------------------------FUNCIONES------------------------
//------------------------CODIGO MAIN------------------------
var nombre = "";
var descripcion = "";
var fecha_creacion = new Date();
var vencimiento = null;
var dificultad = 0;
var tareas = [];
var lector = prompt();
var menu;
//------------------------MENU------------------------
console.log("Cual es tu nombre?");
var nombreUsuario = lector();
console.clear();
do {
    console.log("Bienvenidx ".concat(nombreUsuario, "... Que deseas hacer? \n"));
    console.log(" [1] Ver mis tareas \n [2] Buscar una tarea \n [3] Agregar una tarea \n [4] Salir");
    menu = lector();
    switch (menu) {
        case "1":
            console.clear();
            var i = void 0;
            console.log("Que tareas deseas ver?\n");
            console.log(" [1] Todas \n [2] Pendientes \n [3] En curso \n [4] Terminadas \n");
            var opcionTask = lector();
            opcionTask = parseInt(opcionTask);
            if (opcionTask == 1) {
                console.clear();
                for (i = 0; i < tareas.length; i++) {
                    console.log("[".concat(i + 1, "] ").concat(tareas[i].titulo));
                }
                console.log("¿Deseas ver los detalles de alguna? \n Introduce el numero para verla o 0 para volver");
                var TaskOption = lector();
                if (TaskOption != 0) {
                    console.clear();
                    console.log("Titulo : ".concat(tareas[TaskOption - 1].titulo));
                    console.log("descripcion : ".concat(tareas[TaskOption - 1].descripcion));
                    console.log("estado : ".concat(tareas[TaskOption - 1].estado));
                    console.log("Fecha de creacion : ".concat(tareas[TaskOption - 1].fecha_creacion.toLocaleDateString()));
                    console.log("Fecha de vencimiento: ".concat(tareas[TaskOption - 1].vencimiento.toLocaleDateString()));
                    console.log("Dificultad: ".concat(tareas[TaskOption - 1].dificultad));
                    console.log("\n\nSi deseas editarla ,presiona E , o presiona 0 para volver ");
                    var editTask = readline.prompt();
                    if (editTask == "E") {
                        console.clear();
                        console.log("Estas editando la tarea ".concat(tareas[TaskOption - 1].titulo));
                        console.log("\n");
                        console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco.");
                        console.log("-Si deseas mantener en blanco un atributo, escribe un espacio.");
                        console.log("\n");
                        console.log("Ingrese la descripcion nueva: ");
                        /* if(tareas[TaskOption - 1].descripcion == ""){
                          console.log("Se mantendra la descripcion")
                            }
                            Else {*/
                        tareas[TaskOption - 1].descripcion = readline.prompt();
                        ("Estado ([P]endiente , [E]n curso , [T]erminada , [C]ancelada) ");
                        tareas[TaskOption - 1].estado = lector();
                        switch (tareas[TaskOption - 1].estado) {
                            case "P":
                                tareas[TaskOption - 1].estado = "pendiente";
                                break;
                            case "E":
                                tareas[TaskOption - 1].estado = "En curso";
                                break;
                            case "T":
                                tareas[TaskOption - 1].estado = "Terminadas";
                                break;
                            case "C":
                                tareas[TaskOption - 1].estado = "Cancelada";
                                break;
                        }
                        //modificacion de la dificultad
                        console.log("SELECCIONE LA DIFICULTAD");
                        console.log("1 =  ☆ , 2 =  ☆ ☆ ☆ , 3 =  ☆ ☆ ☆ ☆ ☆ ☆");
                        var NewDifficult = lector();
                        NewDifficult = NewDifficult.toString();
                        console.log(NewDifficult);
                        switch (NewDifficult) {
                            case "1":
                                tareas[TaskOption - 1].dificultad = "☆";
                                break;
                            case "2":
                                tareas[TaskOption - 1].dificultad = "☆ ☆ ☆";
                                break;
                            case "3":
                                tareas[TaskOption - 1].dificultad = "☆ ☆ ☆ ☆ ☆";
                                break;
                        }
                        //modificacion de la FECHA DE VENCIMIENTO
                        console.log("Ingrese la nueva fecha de vencimiento");
                        var nuevafecha = void 0;
                        nuevafecha = lector();
                        var regex = /^\d{4}-\d{2}-\d{2}$/;
                        if (!regex.test(nuevafecha)) {
                            console.log("La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD.");
                            nuevafecha = lector();
                        }
                        var nuevoVencimiento = new Date("".concat(nuevafecha, "T00:00:00"));
                        tareas[TaskOption - 1].vencimiento = nuevoVencimiento;
                    }
                    else if (editTask == 0) {
                        console.clear();
                        console.log("Volviendo al menu inicial...");
                    }
                }
            }
            break;
        case "2":
            console.clear();
            console.log("Introduce el titulo de la tarea a buscar");
            var tareaAbuscar = readline.prompt(">");
            buscarPorTitulo(tareas, tareaAbuscar);
            break;
        case "3":
            console.clear();
            console.log("Ingrese el titulo de la tarea");
            var tarea_titulo = lector();
            console.log("Ingrese la descripcion de la tarea, en caso de tenerla. Sino presione ENTER", { length: 500 });
            var tarea_descripcion = readline.prompt();
            if (tarea_descripcion === "") {
                tarea_descripcion = "+--";
            }
            console.log("Ingrese fecha de Vencimiento en el formato de YYYY-MM-DD, en caso de tener , sino PRESIONE ENTER para continuar");
            var fecha_Vencimiento = void 0;
            var fecha_Vencimiento1 = lector();
            if (!fecha_Vencimiento1) {
                fecha_Vencimiento = new Date();
            }
            else {
                var regex = /^\d{4}-\d{2}-\d{2}$/;
                while (!regex.test(fecha_Vencimiento1)) {
                    console.log("La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD.");
                    fecha_Vencimiento1 = lector();
                }
                fecha_Vencimiento = new Date("".concat(fecha_Vencimiento1, "T00:00:00"));
            }
            console.log("Que dificultad tendra la tarea?");
            console.log("1 =  ☆ , 2 =  ☆ ☆ ☆ , 3 =  ☆ ☆ ☆ ☆ ☆ ☆");
            var tarea_dificultad = lector();
            if (tarea_dificultad === "1") {
                tarea_dificultad = "☆";
            }
            else if (tarea_dificultad === "2") {
                tarea_dificultad = " ☆ ☆ ☆";
            }
            else if (tarea_dificultad === "3") {
                tarea_dificultad = " ☆ ☆ ☆ ☆ ☆";
            }
            if (tarea_dificultad == "") {
                tarea_dificultad = " ☆";
            }
            var tarea = {
                titulo: tarea_titulo,
                descripcion: tarea_descripcion,
                estado: "pendiente",
                fecha_creacion: new Date(),
                vencimiento: fecha_Vencimiento,
                dificultad: tarea_dificultad,
            };
            tareas.push(tarea);
            break;
        case "4":
            console.log("Muchas gracias por interactuar con el sistema. 🙂");
            break;
    }
} while (menu != 4);
//------------------------MENU------------------------
//------------------------CODIGO MAIN------------------------
