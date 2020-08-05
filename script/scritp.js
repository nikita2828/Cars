let del = document.querySelector(".delete");
let car = document.querySelector(".car");
del.addEventListener("click", dell);
function dell() {
  car.style.display = "none";
}

// Сортировка по цене

let fromCheep = document.querySelector("#fromCheep");
fromCheep.onclick = mySort;

function mySort() {
  let cars = document.querySelector(".cars");
  for (let i = 0; i < cars.children.length; i++) {
    for (let j = i; j < cars.children.length; j++) {
      if (
        +cars.children[i].getAttribute("data-year") >
        +cars.children[j].getAttribute("data-year")
      ) {
        replacedNode = cars.replaceChild(cars.children[j], cars.children[i]);
        insertAfter(replacedNode, cars.children[i]);
      }
    }
  }
}
