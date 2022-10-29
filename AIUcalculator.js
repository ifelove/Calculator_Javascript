let screen = document.querySelector(".display-wrapper");
let inputData = document.querySelector(".data-input");
let resultData = document.querySelector(".data-result");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let resultData2 = document.querySelector(".data-result2");
let inputData2 = document.querySelector(".data-input2");

let inputButtons = document.querySelectorAll(".data-input");
let deletebtn = document.querySelector(".delbtn");
let clearbtn = document.querySelector(".clearbtn");
let operationButtons = document.querySelectorAll(".data-operation");
let innerButtons = document.querySelectorAll(".inner-btn");
let container = document.querySelector(".container");
//let clear=document.querySelector(".clear")
//let clearAll=document.querySelector(".clear-clear")
let headerhint = document.querySelector(".header-hint");

class Calculator {
  constructor(inputData, resultData, input1, input2, inputData2, resultData2) {
    this.inputData = inputData;
    this.resultData = resultData;
    this.input1 = input1;
    this.input2 = input2;
    this.inputData2 = inputData2;
    this.resultData2 = resultData2;
    this.clear();
    this.UpdateDisplay();
  }

  //reseting the calculator to restart state

  clear() {
    this.updatedInput = "0";
    this.updatedResult = "";
    this.updatedInput2 = "";
    this.updatedResult2 = "";
    this.inpu1Value1 = "";
    this.input2Value2 = "";
  }

  //deleting the last input
  delete() {
    this.updatedInput = this.updatedInput.slice(0, -1);

    try {
      this.updatedResult = this.updatedInput;
      this.compute();
      this.UpdateDisplay();

      if (this.updatedInput.slice(0, 1) == "") {
        this.updatedInput = "0";
        this.updatedResult = "";
        this.UpdateDisplay;
      }
    } catch {
      Error;
      this.updatedResult = "error";

      //this.updatedResult.style.font-size="12px"
      this.UpdateDisplay;
    }

    //for(let i =0;i<this.updatedInput.length;i++){
    //let lastindex =i
    // console.log(lastindex)
    //for(let j=0;j<lastindex;j++){
    //  console.log(this.updatedInput[lastindex])
    //}
  }
  //const vbb = this.updatedInput.length-1
  //console.log(vbb)

  // }

  // appending number to the screeen
  appendNumber(number) {
    //if second screen is active
    if (container.classList.contains("change-screen")) {
      //if working screen is screen 2

      this.inpu1Value1 = number;
      this.input2Value2 = number;
    } else {
      if (number === "." && this.updatedInput.includes(".")) return;
      if (this.updatedInput == "0" && number == ".") {
        this.updatedInput = "0" + number;
      } else if (this.updatedInput == "0") {
        this.updatedInput = number;
      } else if (this.updatedInput == "0" && number == ".") {
        this.updatedInput = "0" + number;
      } else this.updatedInput += number;
    }
  }

  //appending operation to the screen
  chooseOperation(operation) {
    if (headerhint.classList.contains("active"))
      if (this.updatedInput === "0") return;
    this.operation = operation;
    let ele = this.updatedInput.slice(-1);
    let reg = /[\*\-\\+\/]/;
    if (ele.match(reg) && this.operation.match(reg)) return;
    this.updatedInput += operation;
  }
  // converting input data to float,seperating numbers is thousands
  getDisplay(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return;
    return floatNumber.toLocaleString("en");
  }

  //updating the screen display
  UpdateDisplay() {
    //if working screen is screen 2
    if (container.classList.contains("change-screen")) {
      this.inputData2.innerText = this.updatedInput2;
      this.resultData2.innerText = this.updatedResult2;
      this.input1.value = this.inpu1Value1;
      this.input2.value = this.input2Value2;
    } else {
      this.inputData.innerText = this.updatedInput; //ascerning inputdata to update data
      this.resultData.innerText = this.updatedResult;
    }
  }

  //computing the input data on the screen
  compute() {
    let answer = eval(this.updatedInput);
    answer = this.getDisplay(answer);
    //answer=parseFloat(answer)
    this.updatedResult = answer;
    this.UpdateDisplay();
  }

  //normal mode display
}

const calculator = new Calculator(
  inputData,
  resultData,
  input1,
  input2,
  inputData2,
  resultData2
);

//Eevent listners

deletebtn.addEventListener("click", () => {
  calculator.delete();
  calculator.UpdateDisplay();
  //console.log("delete")
});

clearbtn.addEventListener("click", () => {
  calculator.clear();
  calculator.UpdateDisplay();
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", (e) => {
    operation = e.target.dataset.operation;

    calculator.chooseOperation(operation);
    calculator.UpdateDisplay();
  });
});

//getting inut from the user
inputButtons.forEach((inputButton) => {
  inputButton.addEventListener("click", (e) => {
    //working on shift
    if (headerhint.classList.contains("active")) {
      container.classList.add("change-screen");
      //console.log("contain")

      let maintarget;
      //console.log(maintarget.parentElement.innerText)
      maintarget =
        e.currentTarget.parentElement.firstChild.nextSibling.innerText;
      calculator.updatedInput2 = maintarget;
      calculator.UpdateDisplay();
    }

    headerhint.classList.remove("active"); //to remove shift from display
    //end of shift
    let input;
    input = e.target.dataset.num;
    //console.log(e.target.dataset)
    // console.log(typeof(input))
    calculator.appendNumber(input);
    calculator.UpdateDisplay();
    calculator.compute();
  });
});

let shiftbtn = document.querySelector(".shift-btn");

shiftbtn.addEventListener("click", (e) => {
  if (headerhint.classList.contains("active")) {
    headerhint.classList.remove("active");
  } else headerhint.classList.add("active");

  let shift = e.target.dataset.num;
});

//preessing inner buttons movint to second button
innerButtons.forEach((innerButton) => {
  innerButton.addEventListener("click", () => {
    if (headerhint.classList.contains("active")) {
      container.classList.add("change-screen");
    }
  });
});
