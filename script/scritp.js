//get request

const carTegs = `
<img class="carImg" src="" alt="">
<div class="carInfo">
  <p class="infoBrand">Brand: </p>
  <p class="infoModel">Model: </p>
  <p class="infoYear">Year: </p>
  <p class="infoKm">Mileage: </p>
  <br />
  <p class="infoDescription">
    Description: <br />
  </p>
</div>
<div class="wrapperCarBtn">
  <button class="editBtn">Edit</button>
  <button class="deleteBtn">Delete</button>
</div>
`;
const BASE_URL = "https://node-server.vercel.app/cars";
const carsList = document.querySelector(".cars");

function getRequest() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((cars) => {
      cars.forEach((car) => {
        const carr = document.createElement("div");
        carr.classList.add("car");
        carr.innerHTML = carTegs;

        const carImg = carr.querySelector(".carImg");
        const infoBrand = carr.querySelector(".infoBrand");
        const infoModel = carr.querySelector(".infoModel");
        const infoYear = carr.querySelector(".infoYear");
        const infoKm = carr.querySelector(".infoKm");
        const infoDescription = carr.querySelector(".infoDescription");

        carImg.setAttribute("src", car.photo_link);
        infoBrand.innerHTML = `Brand: ${car.brand}`;
        infoModel.innerHTML = `Model: ${car.model}`;
        infoYear.innerHTML = `Year: ${car.year}`;
        infoKm.innerHTML = `Mileage : ${car.mileage}`;
        infoDescription.innerHTML = `Description:<br> ${car.description}`;

        carsList.appendChild(carr);
      });
    });
}
getRequest();

// post request

// document.addEventListener('DOMContentLoaded', () => {

//     const ajaxSend = (formData) => {
//         fetch(BASE_URL, { // файл-обработчик
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json', // отправляемые данные
//             },
//             body: JSON.stringify(formData)
//         })
//             .then(response => alert('Сообщение отправлено'))
//             .catch(error => console.error(error))
//     };

//     const forms = document.querySelector('#form');
//     for (let i = 0; i < forms.length; i++) {
//         forms[i].addEventListener('submit', function (e) {
//             e.preventDefault();

//             let formData = new FormData(this);
//             formData = Object.fromEntries(formData);

//             ajaxSend(formData);
//             this.reset();
//         });
//     };
// });

// let form = document.querySelector("#form");
// form.addEventListener("submit", (event) => {
//   let brand = document.querySelector('[name="brand"]').value;
//   let model = document.querySelector('[name="model"]').value;
//   let year = document.querySelector('[name:"year"]').value;
//   let mileage = document.querySelector('[name:"mileage"]').value;
//   let photo_link = document.querySelector('[name:"photo_link"]').value;
//   let description = document.querySelector("[name:description]").value;

//   let searchParams = new URLSearchParams();
//   searchParams.set("brand", brand);
//   searchParams.set("model", model);
//   searchParams.set("year", year);
//   searchParams.set("mileage", mileage);
//   searchParams.set("photo_link", photo_link);
//   searchParams.set("description", description);

//   fetch(BASE_URL, {
//     method: "POST",
//     body: JSON.stringify(searchParams)
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then((data) => console.log(data));
//   event.preventDefault();
// });

let form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fromData = new FormData(form);
    const search = new URLSearchParams();

    for(const pair of fromData){
        search.append(pair[0], pair[1])
    }

    fetch(BASE_URL, {
        method: 'POST',
        body: search
    }).then(response => {
        return response.text()
    }).then(data => console.log(data))
    .catch(err => console.error(err))
    form.reset();
    
})


