//-------------------TODOS LOS MODULOS Y FUNCIONES NECESARIAS-------------------
const prompt = require("prompt-sync")();
const readline = require("readline-sync");
const console = require("console");
//-------------------TODOS LOS MODULOS Y FUNCIONES NECESARIAS-------------------

//----------------------------------FUNCION BUSCAR----------------------------------

function buscarPorTitulo(tareas, titulo) {
  // Crea un nuevo arreglo para almacenar las tareas coincidentes.
  const tareasCoincidentes = [];

  // Itera sobre todas las tareas.
  for (const tarea of tareas) {
    // Si el título de la tarea coincide con la consulta, imprime la tarea con sus características.
    if (tarea.titulo.toLowerCase().includes(titulo.toLowerCase())) {
      console.log(
        "Título:",
        tarea.titulo,
        "\nDescripción:",
        tarea.descripcion,
        "\nEstado:",
        tarea.estado,
        "\nFecha de creación:",
        tarea.fechaCreacion,
        "\nFecha de vencimiento:",
        tarea.fechaVencimiento,
        "\nDificultad:",
        tarea.dificultad
      );
    } else {
      console.clear();
      console.log("----------------------------");
      console.log("La tarea no existe");
      console.log("----------------------------");
    }
  }

  // Devuelve el arreglo de tareas coincidentes.
  return tareasCoincidentes;
}

//----------------------------------FUNCION BUSCAR----------------------------------
//---------------------------------MAIN---------------------------------
let tarea = ["", "", "pendiente", new Date(), null, 0];

let Menu;
const tareas = [];
do {
  console.log("¡Hola! \n \n Que deseas hacer?");
  console.log(
    " [1] Ver mis tareas \n [2] Buscar una tarea \n [3] Agregar una tarea \n [4] Salir"
  );
  Menu = prompt("Ingrese la opcion: ");
  switch (Menu) {
    case "1":
      let i;
      console.clear();
      console.log("Que tareas deseas ver?");
      console.log(
        " [1] Todas \n [2] Pendientes \n [3] En curso \n [4] Terminadas \n"
      );
      let menuTask = prompt("");
      if (menuTask == 1) {
        console.clear();
        for (i = 0; i < tareas.length; i++) {
          console.log(`[${i + 1}] ${tareas[i].titulo}`);
        }
        console.log(
          "¿Deseas ver los detalles de alguna? \n Introduce el numero para verla o 0 para volver"
        );
        let TaskOption = prompt();
        if (TaskOption != 0) {
          console.clear();
          console.log(`Título: ${tareas[TaskOption - 1].titulo}`);
          console.log(`Descripción: ${tareas[TaskOption - 1].descripcion}`);
          console.log(`Estado: ${tareas[TaskOption - 1].estado}`);
          console.log(
            `Fecha de creación: ${tareas[
              TaskOption - 1
            ].fechaCreacion.toLocaleDateString()}`
          );
          console.log(
            `Fecha de vencimiento: ${tareas[
              TaskOption - 1
            ].fechaVencimiento.toLocaleDateString()}`
          );

          console.log(`Dificultad: ${tareas[TaskOption - 1].dificultad}`);
          console.log(
            "\n\nSi deseas editarla ,presiona E , o presiona 0 para volver "
          );
          let EditTaskOption = prompt();
          if (EditTaskOption == "E") {
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
            //-----------------------MODIFICACION DE DESCRIPCION
            console.log("1. Ingresa la descripcion nueva: ");
            tareas[TaskOption - 1].descripcion = readline.prompt();
            //--------------------MODIFICACION DE ESTADO
            console.log(
              "Estado ([P]endiente , [E]n curso , [T]erminada , [C]ancelada) "
            );
            tareas[TaskOption - 1].estado = prompt();
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
            //--------------------- MODIFICACION DE DIFICULTAD
            console.log("SELECCIONE LA DIFICULTAD");
            console.log("1 =  ☆ , 2 =  ☆ ☆ ☆ , 3 =  ☆ ☆ ☆ ☆ ☆ ☆");
            let NewDifficult = prompt();
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

            //MODIFICACION DE LA FECHA DE VENCIMIENTO
            console.log("Ingrese la nueva fecha de vencimiento");
            let fecha_nueva = prompt();
            let regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(fecha_nueva)) {
              console.log(
                "La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD."
              );
              fecha_nueva = prompt();
            }
            let fecha_VencimientoNueva = new Date(`${fecha_nueva}T00:00:00`);
            tareas[TaskOption - 1].fechaVencimiento = fecha_VencimientoNueva;

            console.log(`Título: ${tareas[TaskOption - 1].titulo}`);
            console.log(`Descripción: ${tareas[TaskOption - 1].descripcion}`);
            console.log(`Estado: ${tareas[TaskOption - 1].estado}`);
            console.log(
              `Fecha de creación: ${tareas[
                TaskOption - 1
              ].fechaCreacion.toLocaleDateString()}`
            );
            console.log(
              `Fecha de vencimiento: ${tareas[
                TaskOption - 1
              ].fechaVencimiento.toLocaleDateString()}`
            );

            console.log(`Dificultad: ${tareas[TaskOption - 1].dificultad}`);
          } else if (EditTaskOption == 0) {
            console.log("VOLVIENDO AL MENU INICIAL...");
          }
        }
        console.clear();
      } else if (menuTask == 2) {
        console.clear();
        for (i = 0; i < tareas.length; i++) {
          if (tareas[i].estado == "pendiente") {
            console.log(
              "\n------------------------------------------------------\n"
            );
            console.log(`Título: ${tareas[i].titulo}`);
            console.log(`Descripción: ${tareas[i].descripcion}`);
            console.log(`Estado: ${tareas[i].estado}`);
            console.log(
              `Fecha de creación: ${tareas[
                i
              ].fechaCreacion.toLocaleDateString()}`
            );
            console.log(`Fecha de vencimiento: ${tareas[i].fechaVencimiento}`);
            console.log(`Dificultad: ${tareas[i].dificultad}`);
            console.log(
              "\n------------------------------------------------------"
            );
          }
        }
      } else if (menuTask == 3) {
        console.clear();
        for (i = 0; i < tareas.length; i++) {
          if (tareas[i].estado == "En curso") {
            console.log(
              "\n------------------------------------------------------\n"
            );
            console.log(`Título: ${tareas[i].titulo}`);
            console.log(`Descripción: ${tareas[i].descripcion}`);
            console.log(`Estado: ${tareas[i].estado}`);
            console.log(
              `Fecha de creación: ${tareas[
                i
              ].fechaCreacion.toLocaleDateString()}`
            );
            console.log(`Fecha de vencimiento: ${tareas[i].fechaVencimiento}`);
            console.log(`Dificultad: ${tareas[i].dificultad}`);
            console.log(
              "\n------------------------------------------------------"
            );
          }
        }
      } else if (menuTask == 4) {
        console.clear();
        for (i = 0; i < tareas.length; i++) {
          if (tareas[i].estado == "Terminadas") {
            console.log(
              "\n------------------------------------------------------\n"
            );
            console.log(`Título: ${tareas[i].titulo}`);
            console.log(`Descripción: ${tareas[i].descripcion}`);
            console.log(`Estado: ${tareas[i].estado}`);
            console.log(
              `Fecha de creación: ${tareas[
                i
              ].fechaCreacion.toLocaleDateString()}`
            );
            console.log(`Fecha de vencimiento: ${tareas[i].fechaVencimiento}`);
            console.log(`Dificultad: ${tareas[i].dificultad}`);
            console.log(
              "\n------------------------------------------------------"
            );
          }
        }
      }
      readline.prompt();
      break;
    case "2":
      console.clear();
      console.log("Introduce el titulo de una Tarea para buscarla");
      let titulo_abuscar = readline.prompt(">");
      buscarPorTitulo(tareas, titulo_abuscar);
      //--------------------
      console.log("Presione cualquier tecla para continuar");
      readline.prompt();
      break;
    case "3":
      console.clear();

      console.log("Ingrese el titulo de la tarea");
      let tarea_titulo = prompt();
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
      let fecha_Vencimiento1 = prompt();
      if (!fecha_Vencimiento1) {
        fecha_Vencimiento = new Date();
      } else {
        let regex = /^\d{4}-\d{2}-\d{2}$/;
        while (!regex.test(fecha_Vencimiento1)) {
          console.log(
            "La fecha no está en el formato correcto. El formato correcto es YYYY-MM-DD."
          );
          fecha_Vencimiento1 = prompt();
        }
        fecha_Vencimiento = new Date(`${fecha_Vencimiento1}T00:00:00`);
      }

      console.log("Que dificultad tendra la tarea?");
      console.log("1 =  ☆ , 2 =  ☆ ☆ ☆ , 3 =  ☆ ☆ ☆ ☆ ☆ ☆");
      let tarea_dificultad = prompt();
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
      const tarea = {
        titulo: tarea_titulo,
        descripcion: tarea_descripcion,
        estado: "pendiente",
        fechaCreacion: new Date(),
        fechaVencimiento: fecha_Vencimiento,
        dificultad: tarea_dificultad,
      };
      tareas.push(tarea);
      console.clear();
      break;
    case "4":
      break;
    default:
      console.log("Opcion Incorrecta");
      console.log("----------Presione Enter para volver al Menu----------");
      readline.prompt();
  }
} while (Menu != 4);
//---------------------------------MAIN---------------------------------
