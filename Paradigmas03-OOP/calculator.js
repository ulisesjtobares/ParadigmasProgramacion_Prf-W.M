class Calculator {
    constructor() {
        this.operands = [];
    }

    // Añadir un operando a la lista
    addOperand(operand) {
        this.operands.push(operand);
    }

    // Realizar el cálculo con el operador proporcionado
    calculate(operator) {
        let result = this.operands[0];

        for (let i = 1; i < this.operands.length; i++) {
            switch (operator) {
                case '+':
                    result += this.operands[i];
                    break;
                case '-':
                    result -= this.operands[i];
                    break;
                case '*':
                    result *= this.operands[i];
                    break;
                case '/':
                    if (this.operands[i] !== 0) {
                        result /= this.operands[i];
                    } else {
                        throw new Error('Error: División por cero');
                    }
                    break;
                default:
                    throw new Error('Operador no válido. Usa +, -, * o /.');
            }
        }

        this.clearOperands(); // Limpiar los operandos después del cálculo
        return result;
    }

    // Limpiar la lista de operandos
    clearOperands() {
        this.operands = [];
    }
}

module.exports = Calculator;
