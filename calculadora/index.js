const readline = require('readline');

// Configuración para leer la entrada del usuario desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú de opciones
function showMenu() {
    console.log('\nSeleccione una opción:');
    console.log('1. Realizar cálculo');
    console.log('2. Salir');
}

// Función para realizar cálculos
function performCalculation() {
    rl.question('Introduce el primer número: ', (input1) => {
        const operando1 = parseFloat(input1);
        if (isNaN(operando1)) {
            console.log('Error: Entrada no válida. Asegúrate de introducir un número.');
            return performCalculation(); // Volver a pedir el primer número
        }

        rl.question('Introduce el segundo número: ', (input2) => {
            const operando2 = parseFloat(input2);
            if (isNaN(operando2)) {
                console.log('Error: Entrada no válida. Asegúrate de introducir un número.');
                return performCalculation(); // Volver a pedir el segundo número
            }

            rl.question('Introduce el operador (+, -, *, /): ', (operador) => {
                let resultado;

                switch (operador) {
                    case '+':
                        resultado = operando1 + operando2;
                        break;
                    case '-':
                        resultado = operando1 - operando2;
                        break;
                    case '*':
                        resultado = operando1 * operando2;
                        break;
                    case '/':
                        if (operando2 !== 0) {
                            resultado = operando1 / operando2;
                        } else {
                            resultado = 'Error: División por cero';
                        }
                        break;
                    default:
                        resultado = 'Operador no válido. Usa +, -, * o /.';
                }

                console.log('Resultado: ' + resultado);
                showMenu(); // Volver a mostrar el menú de opciones
            });
        });
    });
}


showMenu();
performCalculation();
