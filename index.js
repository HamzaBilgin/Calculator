const calculatorTitle = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const resetButton = document.getElementById("resetButton");
let savedUl = document.getElementById("right__ul");
const arrow = document.querySelector(".right--arrow");
let savedValueList = [];
let willCalculateValue = calculatorTitle.innerHTML;
let savedHistory = [];
const leftHistory = document.getElementById("left__history");
let lastValue = "";
let equalCounter = 0;

function takeValueFromHistory() {
  const textRight = document.querySelectorAll(".left__history .textRight");
  
  textRight.forEach((p) => {
    p.removeEventListener("click", handleHistoryClick);
  });

  textRight.forEach((p) => {
    p.addEventListener("click", handleHistoryClick);
  });
}

function handleHistoryClick() {

  let text = calculatorTitle.textContent;
  text += this.innerHTML;
  calculatorTitle.textContent = (lastValue === "+" || lastValue === "-" || lastValue === "*" || lastValue === "/") ? text : this.innerHTML;
}
calculate();
function calculate(){
  document.addEventListener('DOMContentLoaded', function() {
    const calculatorTitle = document.querySelector('.calculatorTitle h1');
    const calculatorButtons = document.querySelector('#calculatorButtons');

    // let result = '';
    calculatorTitle.textContent = '0';
  
    calculatorButtons.addEventListener('click', function(e) {
      result = calculatorTitle.innerHTML === "0" ? '' : calculatorTitle.innerHTML ;

      const value = e.target.value;
      if (value) {
        lastValue = value;
        if (value === '=') {
          try {
            equalCounter = 1;
            result = (eval(result)).toFixed(2).toString();
            saveToHistory(calculatorTitle.innerHTML,Number(result).toFixed(2))
          } catch (error) {
            result = 'Hatalı işlem';
          }
        } else if (value === 'C') {
          result = '0';
        } else {
          if(result === "0"){
            result = '';
          }
          if(equalCounter === 1){
            let newValue = result ;
            newValue += value;
            result = (value === "+" || value === "-" || value === "*" || value === "/") ? newValue : value;
            equalCounter = 0;
          }
          else{
            result += value;
          }
          
        }
  
        calculatorTitle.textContent = result;
      }
    });
  
  });
}

function saveToHistory(value,result){
  const divElementHistory = document.createElement("div");
  const pElement1 = document.createElement("p");
  pElement1.textContent = value;
  pElement1.className = "textLeft";
  const pElement2 = document.createElement("p");
  pElement2.textContent = result;
  pElement2.className = "textRight";
  const hrElement = document.createElement("hr");
  const firstChild = leftHistory.firstChild;
  leftHistory.insertBefore(divElementHistory, firstChild);


  divElementHistory.appendChild(pElement1);
  divElementHistory.appendChild(pElement2);
  divElementHistory.appendChild(hrElement);
  const weatherData = {
    value : value,
    result : result,
  };
  savedHistory.push(weatherData);
  takeValueFromHistory();
}


// Daha önce kaydedilmiş hesaplamaları geri getirir - BASLANGIC
function takeBackCalculatedValue() {
  const savedValueText = document.querySelectorAll(".right__ul .right__li");
  savedValueText.forEach((li, index) => {
    li.removeEventListener("click", handleBackCalculatedValue);
    li.addEventListener("click", handleBackCalculatedValue);
  });
}

function handleBackCalculatedValue(e) {
  const li = e.currentTarget;
  if (e.target.tagName === "SPAN") {
    let text = calculatorTitle.textContent;
    text += li.textContent.trim();
    calculatorTitle.textContent = (lastValue === "+" || lastValue === "-" || lastValue === "*" || lastValue === "/") ? text : li.textContent.trim();
  } else {
    savedUl.removeChild(li);
  }
}


// function takeValueFromHistory() {
//   const textRight = document.querySelectorAll(".left__history .textRight");
  
//   textRight.forEach((p) => {
//     p.removeEventListener("click", handleHistoryClick);
//   });

//   textRight.forEach((p) => {
//     p.addEventListener("click", handleHistoryClick);
//   });
// }

// function handleHistoryClick() {

//   let text = calculatorTitle.textContent;
//   text += this.innerHTML;
//   calculatorTitle.textContent = (lastValue === "+" || lastValue === "-" || lastValue === "*" || lastValue === "/") ? text : this.innerHTML;
// }
// Daha önce kaydedilmiş hesaplamaları geri getirir - SON

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







// Arrow Hover --- BASLANGİC
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
// Arrow Hover --- SONU
// delete rubbish hover --- BASLANGİC
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
// delete rubbish hover --- SON
//hesap makinesinde geçmişi açıp kapamayı sağlar --- BASLANGİC
function toggleElement() {
  changeClass("left__history","bigger","smaller")
  changeClass("calculatorButtons","active","pasif")
  changeClass("left__upDown__i","rotate","reverseRotate")
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
//hesap makinesinde geçmişi açıp kapamayı sağlar --- SON
