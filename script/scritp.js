const BASE_URL = "http://localhost:3050/cars";
const form = document.querySelector("#form");
const carsList = document.querySelector(".cars");

const brandValue = document.querySelector("#brand");
const modelValue = document.querySelector("#model");
const yearValue = document.querySelector("#year");
const mileageValue = document.querySelector("#mileage");
const photoValue = document.querySelector("#photo_link");
const descriptionValue = document.querySelector("#description");

const carTegs = `
<img class="carImg" src="" alt="">
<div class="carInfo">
  <p class="infoBrand">Brand: </p>
  <p class="infoModel">Model: </p>
  <p class="infoYear">Year: </p>
  <p class="infoKm">Mileage: </p>
  <br />
  <p class="infoDescription">
    Description:<br>
  </p>
</div>
<div class="wrapperCarBtn">
  <button class="editBtn">Edit</button>
  <button class="deleteBtn">Delete</button>
</div>
`;


// delete btn 
const deleteOneCar = (id) => {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  }).then(() => {
    carsList.innerHTML = ""
    getRequest()
  })
}


//get request

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

        const deleteBtn= carr.querySelector(".deleteBtn")

        carImg.setAttribute("src", car.photo_link);
        infoBrand.innerText = `Brand: ${car.brand}`;
        infoModel.innerText = `Model: ${car.model}`;
        infoYear.innerText = `Year: ${car.year}`;
        infoKm.innerText = `Mileage : ${car.mileage}m`;
        infoDescription.innerText = `Description: ${car.description}`;

        carsList.appendChild(carr);
        deleteBtn.addEventListener("click", () => deleteOneCar(car._id))
      });
    });
}
getRequest();

//get request one obj

function getRequestOne() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => data.pop())
    .then((cars) => [cars])
    .then((res) => {
      res.forEach((car) => {
        const carrOne = document.createElement("div");

        carrOne.classList.add("car");
        carrOne.innerHTML = carTegs;

        const carImgOne = carrOne.querySelector(".carImg");
        const infoBrandOne = carrOne.querySelector(".infoBrand");
        const infoModelOne = carrOne.querySelector(".infoModel");
        const infoYearOne = carrOne.querySelector(".infoYear");
        const infoKmOne = carrOne.querySelector(".infoKm");
        const infoDescriptionOne = carrOne.querySelector(".infoDescription");

        carImgOne.setAttribute("src", car.photo_link);
        infoBrandOne.innerText = `Brand: ${car.brand}`;
        infoModelOne.innerText = `Model: ${car.model}`;
        infoYearOne.innerText = `Year: ${car.year}`;
        infoKmOne.innerText = `Mileage : ${car.mileage}`;
        infoDescriptionOne.innerText = `Description: ${car.description}`;

        carsList.appendChild(carrOne);
      });
    });
}


// post request

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const carObj = {
    brand: brandValue.value,
    model: modelValue.value,
    year: +yearValue.value,
    mileage: +mileageValue.value,
    photo_link: photoValue.value,
    description: descriptionValue.value,
  };

  fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(carObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => getRequestOne())
    .catch((err) => console.error(err));
  form.reset();
});
