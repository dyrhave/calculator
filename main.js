// Calculator object holds operations and states
const calculator = {
    currentOperand: '',     // Current input or result
    prevOperand: '',        // Number or result before an operator is pressed
    operator: undefined,    // Operation to perform

    // Method to add two numbers
    add: function(a, b) {
        return a + b;
    },


    // Method to subtract two numbers
    subtract: function(a, b) {
        return a - b;
    },


    //Method to multiply two numbers
    multiply: function(a, b) {
        return a * b;
    },

    // Method to divide two numbers
    divide: function(a, b) {
        if (b === 0) {
            return "Nice try!";
        }
        return a / b;
    },

    // Perform arithmetic operation based on operator
    operate: function() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand)

        switch (this.operator) {
            case '+':
                result = this.add(prev, current);
                break;
            case '-':
                result = this.subtract(prev,current);
                break;
            case 'x':
                result = this.multiply(prev, current);
                break;
            case '÷':
                result = this.divide(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.prevOperand = '';
        this.operator = undefined
    },

    // Append a number to the current operand
    appendNumber: function(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },

    // Set the operator to perform
    chooseOperator: function(op) {
        if (this.currentOperand === '') return;
        if (this.prevOperand !== '') {
            this.operate();
        }
        this.operator = op;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    },

    // Clear calculator states
    clear: function() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operator = undefined;
    },

    delete: function() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    },

    updateDisplay: function() {
        const currentOperandText = document.querySelector('.current-operand');
        const prevOperandText = document.querySelector('.prev-operand');
        currentOperandText.textContent = this.currentOperand;
        prevOperandText.textContent = this.prevOperand;
        if (this.operator != null) {
            prevOperandText.textContent = `${this.prevOperand} ${this.operator}`;
        }
    }
}


// Event listeners for buttons 

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal')
const delButton = document.querySelector('.del')

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});


operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.textContent);
        calculator.updateDisplay();
    });
});


clearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
});


equalsButton.addEventListener('click', () => {
        calculator.operate();
        calculator.updateDisplay();
    });

decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Handle keyboard input
function handleKeyPress(e) {
    let key = e.key;
    if (key === '*') key = 'x';
    else if (key === '/') key = '÷'

    if ((e.key >= 0 && e.key <=9) || e.key === '.') {
        calculator.appendNumber(e.key);
    }
    else if (['+', '-', 'x', '÷'].includes(e.key)) {
        calculator.chooseOperator(e.key);
    }
    else if (e.key === 'Enter') {
        calculator.operate();
    }
    else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        calculator.clear();
    }
    else if (e.key === 'Backspace') {
        calculator.delete();
    }
    calculator.updateDisplay();
}

document.addEventListener('keydown', handleKeyPress);

