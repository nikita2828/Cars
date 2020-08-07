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
// const form = document.querySelector("#form")
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let response = await fetch(BASE_URL, {
//       method: 'POST',
//       body: new FormData(form)
//     })
// })
