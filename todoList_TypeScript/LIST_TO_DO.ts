
//------------------------IMPORTES------------------------
import * as readline from "readline-sync";
import * as prompt from "prompt-sync";
//------------------------IMPORTES------------------------

//------------------------FUNCIONES------------------------
function buscarPorTitulo(a: Tarea[], b: string) {
  const tareasCoincidentes = [];
  for (const tarea of tareas) {
    if (tarea.titulo.toLowerCase().includes(b.toLowerCase())) {
      console.log(
        "Titulo: ",
        tarea.titulo,
        "\nDescripcion: ",
        tarea.descripcion,
        "\nEstado:",
        tarea.estado,
        "\nFecha de Creacion: ",
        tarea.fecha_creacion.toLocaleDateString(),
        "\nVencimiento: ",
        tarea.vencimiento.toLocaleDateString(),
        "\nDificultad: ",
        tarea.dificultad
      );
    }
  }
  return tareasCoincidentes;
}
//------------------------FUNCIONES------------------------

//------------------------CODIGO MAIN------------------------

let nombre: string = "";
let descripcion: string = "";
const fecha_creacion = new Date();
type estado = "pendiente" | "En curso" | "Terminada" | "Cancelada";
let vencimiento: Date | null = null;
let dificultad: number = 0;

//PROTOTIPO
interface Tarea {
  titulo: string;
  descripcion: string;
  estado: string;
  fecha_creacion: Date;
  vencimiento: Date;
  dificultad: string;
}

let tareas: Tarea[] = [];
const lector = prompt();
let menu;
//------------------------MENU------------------------
console.log("Cual es tu nombre?");
let nombreUsuario = lector();
console.clear();
do {
  console.log(`Bienvenidx ${nombreUsuario}... Que deseas hacer? \n`);
  console.log(
    " [1] Ver mis tareas \n [2] Buscar una tarea \n [3] Agregar una tarea \n [4] Salir"
  );
  menu = lector();
  switch (menu) {
    case "1":
      console.clear();
      let i: number;
      console.log("Que tareas deseas ver?\n");
      console.log(
        " [1] Todas \n [2] Pendientes \n [3] En curso \n [4] Terminadas \n"
      );
      let opcionTask = lector();
      opcionTask = parseInt(opcionTask);
      if (opcionTask == 1) {
        console.clear();
        for (i = 0; i < tareas.length; i++) {
          console.log(`[${i + 1}] ${tareas[i].titulo}`);
        }
        console.log(
          "¿Deseas ver los detalles de alguna? \n Introduce el numero para verla o 0 para volver"
        );
        let TaskOption = lector();
        if (TaskOption != 0) {
          console.clear();
          console.log(`Titulo : ${tareas[TaskOption - 1].titulo}`);
          console.log(`descripcion : ${tareas[TaskOption - 1].descripcion}`);
          console.log(`estado : ${tareas[TaskOption - 1].estado}`);
          console.log(
            `Fecha de creacion : ${tareas[
              TaskOption - 1
            ].fecha_creacion.toLocaleDateString()}`
          );
          console.log(
            `Fecha de vencimiento: ${tareas[
              TaskOption - 1
            ].vencimiento.toLocaleDateString()}`
          );
          console.log(`Dificultad: ${tareas[TaskOption - 1].dificultad}`);
          console.log(
            "\n\nSi deseas editarla ,presiona E , o presiona 0 para volver "
          );
          let editTask = readline.prompt();
          if (editTask == "E") {
            console.clear();
            console.log(
              `Estas editando la tarea ${tareas[TaskOption - 1].titulo}`
            );
            console.log("\n");
            console.log(
              "-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco."
            );
            console.log(
              "-Si deseas mantener en blanco un atributo, escribe un espacio."
            );
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
            let NewDifficult = lector();
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
            let nuevafecha;
            nuevafecha = lector();
            let regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(nuevafecha)) {
              console.log(
                "La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD."
              );
              nuevafecha = lector();
            }
            let nuevoVencimiento = new Date(`${nuevafecha}T00:00:00`);
            tareas[TaskOption - 1].vencimiento = nuevoVencimiento;
          } else if (editTask == 0) {
            console.clear();
            console.log("Volviendo al menu inicial...");
          }
        }
      }

      break;
    case "2":
      console.clear();
      console.log("Introduce el titulo de la tarea a buscar");
      let tareaAbuscar = readline.prompt(">");
      buscarPorTitulo(tareas, tareaAbuscar);
      break;
    case "3":
      console.clear();

      console.log("Ingrese el titulo de la tarea");
      let tarea_titulo = lector();
      console.log(
        "Ingrese la descripcion de la tarea, en caso de tenerla. Sino presione ENTER",
        { length: 500 }
      );
      let tarea_descripcion = readline.prompt();
      if (tarea_descripcion === "") {
        tarea_descripcion = "+--";
      }
      console.log(
        "Ingrese fecha de Vencimiento en el formato de YYYY-MM-DD, en caso de tener , sino PRESIONE ENTER para continuar"
      );
      let fecha_Vencimiento;
      let fecha_Vencimiento1 = lector();
      if (!fecha_Vencimiento1) {
        fecha_Vencimiento = new Date();
      } else {
        let regex = /^\d{4}-\d{2}-\d{2}$/;
        while (!regex.test(fecha_Vencimiento1)) {
          console.log(
            "La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD."
          );
          fecha_Vencimiento1 = lector();
        }
        fecha_Vencimiento = new Date(`${fecha_Vencimiento1}T00:00:00`);
      }

      console.log("Que dificultad tendra la tarea?");
      console.log("1 =  ☆ , 2 =  ☆ ☆ ☆ , 3 =  ☆ ☆ ☆ ☆ ☆ ☆");
      let tarea_dificultad = lector();
      if (tarea_dificultad === "1") {
        tarea_dificultad = "☆";
      } else if (tarea_dificultad === "2") {
        tarea_dificultad = " ☆ ☆ ☆";
      } else if (tarea_dificultad === "3") {
        tarea_dificultad = " ☆ ☆ ☆ ☆ ☆";
      }
      if (tarea_dificultad == "") {
        tarea_dificultad = " ☆";
      }
      const tarea: Tarea = {
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
