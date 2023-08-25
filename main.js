const calculator = {
    currentOperand: '',
    prevOperand: '',
    operator: undefined,

    add: function(a, b) {
        return a + b;
    },

    subtract: function(a, b) {
        return a - b;
    },

    multiply: function(a, b) {
        return a * b;
    },

    divide: function(a, b) {
        if (b === 0) {
            return "No";
        }
        return a / b;
    },

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

    appendNumber: function(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },

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

    clear: function() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operator = undefined;
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




const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal')

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
})


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
    calculator.updateDisplay();
}

document.addEventListener('keydown', handleKeyPress);