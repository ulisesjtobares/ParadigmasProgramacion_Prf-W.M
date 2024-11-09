const readline = require('readline');
const Calculator = require('./calculator'); // Importar la clase Calculator

class Menu {
    constructor() {
        this.calculator = new Calculator();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Mostrar el menú de opciones
    showMenu() {
        console.log('\nSeleccione una opción:');
        console.log('1. Realizar cálculo');
        console.log('2. Salir');
        this.rl.question('Elige una opción: ', (input) => {
            if (input.trim() === '1') {
                this.performCalculation();
            } else if (input.trim() === '2') {
                this.exit();
            } else {
                console.log('Opción no válida.');
                this.showMenu();
            }
        });
    }

    // Función para realizar cálculos
    performCalculation() {
        this.rl.question('¿Cuántos operandos deseas introducir? ', (inputCount) => {
            const numOperandos = parseInt(inputCount);
            if (isNaN(numOperandos) || numOperandos < 2) {
                console.log('Error: Debes introducir un número válido mayor o igual a 2.');
                return this.performCalculation();
            }

            this.getOperands(numOperandos, 0);
        });
    }

    // Función recursiva para pedir operandos
    getOperands(total, count) {
        if (count < total) {
            this.rl.question(`Introduce el operando ${count + 1}: `, (inputOperando) => {
                const operando = parseFloat(inputOperando);
                if (isNaN(operando)) {
                    console.log('Error: Entrada no válida. Asegúrate de introducir un número.');
                    return this.getOperands(total, count);
                }

                this.calculator.addOperand(operando);
                this.getOperands(total, count + 1);
            });
        } else {
            this.getOperator();
        }
    }

    // Función para pedir el operador
    getOperator() {
        this.rl.question('Introduce el operador (+, -, *, /): ', (operador) => {
            try {
                const result = this.calculator.calculate(operador);
                console.log('Resultado: ' + result);
            } catch (error) {
                console.log(error.message);
            }
            this.showMenu();
        });
    }

    // Función para salir del programa
    exit() {
        this.rl.close();
        console.log('Calculadora cerrada.');
    }
}

module.exports = Menu;
