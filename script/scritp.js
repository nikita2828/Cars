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

// Get запрос

// let urlPro = "https://node-server.vercel.app/cars";

// let body = {};

// let headers = { "Content-Type": "application/json" };
// function fetPro(method, url, body = null) {
//   return fetch(url).then((response) => {
//     if (response.status >= 400) {
//       console.error(response.status, "Все плохо");
//       return response.json();
//     } else {
//       console.log(response.status, "Все хорошо");
//       return response.json();
//     }
//   });
// }
// fetPro("GET", urlPro)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

//Post запрос

const form = document.querySelector("#form")
form.addEventListener("submit", myForm)

function myForm(e){
    e.preventDefault();
    const formData = new FormData(this)

    let urlPro = "https://node-server.vercel.app/cars";

    let body = {formData};
    
    let headers = { "Content-Type": "application/json" };
    
    function fetPro(method, url, body = null) {
      return fetch(url, {
          method: method,
          body: body,
          header: headers
      }).then((response) => {
        if (response.status >= 400) {
          console.error(response.status, "Все плохо");
          return response.json();
        } else {
          console.log(response.status, "Все хорошо");
          return response.json();
        }
      });
    }
    fetPro("POST", urlPro, body)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

}
