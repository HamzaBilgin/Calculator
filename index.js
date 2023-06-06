let lastValue = "";
let equalCounter = 0;
const arrow = document.querySelector(".right--arrow");
const calculatorTitle = document.querySelector("h1");
let savedValueList = [];
//Locastroge işlemlerii --- BASLANGİC-------------------------------------------
let localSavedValues = localStorage.getItem("savedValue")
  ? JSON.parse(localStorage.getItem("savedValue"))
  : [];
  Array.from(localSavedValues).forEach((element) => {
    createLi(element.result)
  });

function addSavedValue(value){
  const dataToSave = {
  result : value,
};

localSavedValues.push(dataToSave);


const saved = JSON.stringify(localSavedValues);

localStorage.setItem("savedValue", saved);
}



function updateSavedValue(index2){
  let existingData  = localStorage.getItem("savedValue")
  ? JSON.parse(localStorage.getItem("savedValue"))
  : [];

  
  // delete existingData[index]
  // var updatedData = JSON.stringify(existingData);
  // localStorage.setItem('savedValue', updatedData);
  // console.log(existingData )
  const updatedData = existingData.filter((data,index) => index !== index2);

    const saved = JSON.stringify(updatedData);

localStorage.setItem("savedValue", saved);

}


//Locastroge işlemlerii --- SON-------------------------------------------




//Hesaplama işlemlerini yapar --- BASLANGİC
calculate();
function calculate() {
  document.addEventListener("DOMContentLoaded", function () {
    const calculatorTitle = document.querySelector(".calculatorTitle h1");
    const calculatorButtons = document.querySelector("#calculatorButtons");

    calculatorTitle.textContent = "0";

    calculatorButtons.addEventListener("click", function (e) {
      result =
        calculatorTitle.innerHTML === "0" ? "" : calculatorTitle.innerHTML;

      const value = e.target.value;
      if (value) {
        lastValue = value;
        if (value === "=") {
          try {
            equalCounter = 1;
            result = eval(result).toFixed(2).toString();
            saveToHistory(calculatorTitle.innerHTML, Number(result).toFixed(2));
          } catch (error) {
            result = "Hatalı işlem";
          }
        } else if (value === "C") {
          result = "0";
        } else {
          if (result === "0") {
            result = "";
          }
          if (equalCounter === 1) {
            let newValue = result;
            newValue += value;
            result =
              value === "+" || value === "-" || value === "*" || value === "/"
                ? newValue
                : value;
            equalCounter = 0;
          } else {
            result += value;
          }
        }
        calculatorTitle.textContent = result;
      }
      takeValueFromHistory();
    });
  });
}
//Hesaplama işlemlerini yapar --- SON
// History e kayıt atar eşittire tıklayınca --- BASLANGİC
function saveToHistory(value, result) {
  const leftHistory = document.getElementById("left__history");
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
}

// History e kayıt atar eşittire tıklayınca --- BASLANGİC
//arrow a tıklanınca sağda eklenen numarayı listeler --- baslangıc
function saveArrow(number) {
  try {
    result = eval(number).toFixed(2).toString();
    createLi(result);
    const calculatorTitle = document.querySelector("h1");
    addSavedValue(result)
  } catch (error) {
    alert("Hatali işlem! \n Kaydedilemedi!")
  }
}
arrow.addEventListener("click", () => saveArrow(calculatorTitle.textContent));
//arrow a tıklanınca sağda eklenen numarayı listeler --- SON

// Oka tıklayınca sağ tarafta veri kaydetmek için li etiketi oluşturur-- BASLANGİC
function createLi(value) {
  let savedUl = document.getElementById("right__ul");
  const liElement = document.createElement("li");
  liElement.className = "right__li";
  const spanElement = document.createElement("span");
  spanElement.className = "righ__span";
  spanElement.textContent = value;
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
// Oka tıklayınca sağ tarafta veri kaydetmek için li etiketi oluşturur-- SON
//Historide daha önce hesaplanmış sonuçları kullanmaya yarar --- BASLANGİC
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
  console.log("aa")
  let text = calculatorTitle.textContent;
  text += this.innerHTML;
  calculatorTitle.textContent =
    lastValue === "+" ||
    lastValue === "-" ||
    lastValue === "*" ||
    lastValue === "/"
      ? text
      : this.innerHTML;
}
//Historide daha önce hesaplanmış sonuçları kullanmaya yarar --- SON
// Daha önce kaydedilmiş hesaplamaları geri getirir - BASLANGIC
function takeBackCalculatedValue() {
  const savedValueText = document.querySelectorAll(".right__ul .right__li");
  savedValueText.forEach((li) => {
    li.removeEventListener("click", handleBackCalculatedValue);
    li.addEventListener("click", handleBackCalculatedValue);
  });
}
function handleBackCalculatedValue(e) {
  let savedUl = document.getElementById("right__ul");
  const li = e.currentTarget;
  if (e.target.tagName === "SPAN") {
    let text = calculatorTitle.textContent;
    text += li.textContent.trim();
    calculatorTitle.textContent =
      lastValue === "+" ||
      lastValue === "-" ||
      lastValue === "*" ||
      lastValue === "/"
        ? text
        : li.textContent.trim();
  } else {
    const index = Array.from(savedUl.children).indexOf(li);

    updateSavedValue(index)
    savedUl.removeChild(li);
  }
}
// Daha önce kaydedilmiş hesaplamaları geri getirir - SON

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
  changeClass("left__history", "bigger", "smaller");
  changeClass("calculatorButtons", "active", "pasif");
  changeClass("left__upDown__i", "rotate", "reverseRotate");
}

function changeClass(targetId, first, second) {
  var target = document.getElementById(targetId);
  if (target.classList.contains(first)) {
    target.classList.add(second);
    target.classList.remove(first);
  } else if (target.classList.contains(second)) {
    target.classList.add(first);
    target.classList.remove(second);
  } else {
    target.classList.add(first);
  }
}
