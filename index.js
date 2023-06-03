const calculatorTitle = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const resetButton = document.getElementById("resetButton");
let savedUl = document.getElementById("right__ul");
const arrow = document.querySelector(".right--arrow");
let savedValueList = [];
let initialValue = 0;
let operatorValue = "";
let isWaiting = false;

function takeBackCalculatedValue() {
  const savedValueText = document.querySelectorAll(".right__ul .right__li");
  savedValueText.forEach((li, index) => {
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") {
        calculatorTitle.textContent = "";
        calculatorTitle.textContent = li.textContent.trim();
      } else {
        savedUl.removeChild(li);
      }
    });
  });
}
//arrow a tıklanınca sağda eklenen numarayı listeler --- baslangıc
function saveArrow(number) {
  savedValueList.push(number);

  const lastValue = savedValueList[savedValueList.length - 1];

  const liElement = document.createElement("li");
  liElement.className = "right__li";
  const spanElement = document.createElement("span");
  spanElement.className = "righ__span";
  spanElement.textContent = lastValue;
  const divElement = document.createElement("div");
  divElement.className = "right__rubbish";
  const iElement = document.createElement("i");
  iElement.className = "fa-solid fa-trash";

  divElement.appendChild(iElement);
  liElement.appendChild(spanElement);
  liElement.appendChild(divElement);
  savedUl.appendChild(liElement);
  addRubbishAnimasyon();
  takeBackCalculatedValue();
}
arrow.addEventListener("click", () => saveArrow(calculatorTitle.textContent));
//arrow a tıklanınca sağda eklenen numarayı listeler --- SON
function sendNumberValue(number) {
  //   console.log(number);
  //   calculatorTitle.textContent = number;

  if (isWaiting) {
    calculatorTitle.textContent = number;
    isWaiting = false;
  } else {
    const displayValue = calculatorTitle.textContent;
    calculatorTitle.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (!calculatorTitle.textContent.includes(".")) {
    calculatorTitle.textContent = `${calculatorTitle.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorTitle.textContent);

  if (operatorValue && isWaiting) {
    operatorValue = operator;
    return;
  }

  if (!initialValue) {
    initialValue = currentValue;
  } else {
    const calculation = calc[operatorValue](initialValue, currentValue);
    calculatorTitle.textContent = calculation;
    initialValue = calculation;
  }
  isWaiting = true;
  operatorValue = operator;
}

const calc = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

buttons.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  }
});
//REsetleme işlemi yapar Js baslangıcı
function resetAll() {
  calculatorTitle.textContent = "0";
  initialValue = 0;
  operatorValue = "";
  isWaiting = false;
}

resetButton.addEventListener("click", resetAll);
//REsetleme işlemi yapar Js sonu
// Arrow Hover
var divElement = document.querySelector(".right--arrow");
var iElement = divElement.querySelector("i");

var originalClass = iElement.className;
var fadedClass = "fa-solid fa-arrow-right-long fa-fade";

divElement.addEventListener("mouseenter", function () {
  iElement.className = fadedClass;
});

divElement.addEventListener("mouseleave", function () {
  iElement.className = originalClass;
});

// delete rubbish hover
// const divElementRubbish = document.querySelectorAll(".right__rubbish");
function addRubbishAnimasyon() {
  const divElementRubbish = document.querySelectorAll(".right__rubbish");

  divElementRubbish.forEach((divElement) => {
    const iElementRubbish = divElement.querySelector("i");
    const originalClassRubbish = iElementRubbish.className;
    const fadedClassRubbish = "fa-solid fa-trash fa-bounce";

    divElement.addEventListener("mouseenter", function () {
      iElementRubbish.className = fadedClassRubbish;
    });
    
    divElement.addEventListener("mouseleave", function () {
      iElementRubbish.className = originalClassRubbish;
    });
  });
}


function toggleElement() {
  changeClass("left__history","bigger","smaller")
  changeClass("calculatorButtons","active","pasif")
}

function changeClass(targetId,first,second){
  var target = document.getElementById(targetId);
  if(target.classList.contains(first)){
    target.classList.add(second);
    target.classList.remove(first)
  }
  else if(target.classList.contains(second)){
    target.classList.add(first);
    target.classList.remove(second)
  }
  else{
    target.classList.add(first);
  }
}

