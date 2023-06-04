const calculatorTitle = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const resetButton = document.getElementById("resetButton");
let savedUl = document.getElementById("right__ul");
const arrow = document.querySelector(".right--arrow");
let savedValueList = [];
let willCalculateValue = calculatorTitle.innerHTML;

calculate(willCalculateValue);
function calculate(value){
  document.addEventListener('DOMContentLoaded', function() {
    const calculatorTitle = document.querySelector('.calculatorTitle h1');
    const calculatorButtons = document.querySelector('#calculatorButtons');

    // let result = '';
    calculatorTitle.textContent = '0';
  
    calculatorButtons.addEventListener('click', function(e) {
      result = calculatorTitle.innerHTML === "0" ? '' : calculatorTitle.innerHTML ;

      const value = e.target.value;
      if (value) {
        if (value === '=') {
          try {
            result = eval(result).toString();
          } catch (error) {
            result = 'Hatalı işlem';
          }
        } else if (value === 'C') {
          result = '0';
        } else {
          if(result === "0"){
            result = '';
          }
          result += value;
        }
  
        calculatorTitle.textContent = result;
      }
    });
  
  });
}





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
