class Calculator { //class is template for creating an object...
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1); //remove one digit
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return; //no more than one decimal at a time
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let result;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
        case '+':
          result = prev + curr;
          break
        case '-':
          result = prev - curr;
          break
        case '*':
          result = prev * curr;
          break
        case '÷':
          result = prev / curr;
          break
        default:
          return
      }
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) { //unnecessary, but makes numbers look more visually appealing
      const intDigits = parseFloat(number.toString().split('.')[0]);
      const decimalDigits = parseFloat(number.toString().split('.')[1]);
      let intDisplay;
      if (isNaN(intDigits)) {
        intDisplay = '';
      } else {
        intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 }); //insert commas
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }
  
  //selectors
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  //...that is created down here
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  //event listeners
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })

  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  