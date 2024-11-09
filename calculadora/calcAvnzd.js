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

// Función para realizar cálculos con cualquier cantidad de operandos
function performCalculation() {
    rl.question('¿Cuántos operandos deseas introducir? ', (inputCount) => {
        const numOperandos = parseInt(inputCount);
        if (isNaN(numOperandos) || numOperandos < 2) {
            console.log('Error: Debes introducir un número válido mayor o igual a 2.');
            return performCalculation(); // Volver a pedir la cantidad de operandos
        }

        let operandos = [];

        // Función recursiva para pedir los operandos uno por uno
        function pedirOperando(indice) {
            if (indice < numOperandos) {
                rl.question(`Introduce el operando ${indice + 1}: `, (inputOperando) => {
                    const operando = parseFloat(inputOperando);
                    if (isNaN(operando)) {
                        console.log('Error: Entrada no válida. Asegúrate de introducir un número.');
                        return pedirOperando(indice); // Volver a pedir el operando actual
                    }

                    operandos.push(operando);
                    pedirOperando(indice + 1); // Pedir el siguiente operando
                });
            } else {
                // Una vez que se hayan pedido todos los operandos, pedir el operador
                rl.question('Introduce el operador (+, -, *, /): ', (operador) => {
                    let resultado = operandos[0];

                    for (let i = 1; i < operandos.length; i++) {
                        switch (operador) {
                            case '+':
                                resultado += operandos[i];
                                break;
                            case '-':
                                resultado -= operandos[i];
                                break;
                            case '*':
                                resultado *= operandos[i];
                                break;
                            case '/':
                                if (operandos[i] !== 0) {
                                    resultado /= operandos[i];
                                } else {
                                    console.log('Error: División por cero');
                                    showMenu();
                                    return;
                                }
                                break;
                            default:
                                console.log('Operador no válido. Usa +, -, * o /.');
                                showMenu(); // Volver a mostrar el menú
                                return;
                        }
                    }

                    console.log('Resultado: ' + resultado);
                    showMenu(); // Volver a mostrar el menú de opciones
                });
            }
        }

        pedirOperando(0); // Comenzar pidiendo el primer operando
    });
}



// Manejar la opción de salir
rl.on('line', (input) => {
        if (input.trim () == '1'){
            performCalculation
        }
    if (input.trim() === '2') {
        rl.close();
        console.log('Calculadora cerrada.');
    }
});

// Iniciar el programa mostrando el menú
showMenu();
performCalculation();