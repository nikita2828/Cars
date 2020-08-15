const BASE_URL = "http://localhost:3050/cars";
const RED_LINE = "1px solid #ff0000";

const form = document.querySelector("#form");
const carsList = document.querySelector(".cars");

const brandValue = document.querySelector("#brand");
const modelValue = document.querySelector("#model");
const yearValue = document.querySelector("#year");
const mileageValue = document.querySelector("#mileage");
const photoValue = document.querySelector("#photo_link");
const descriptionValue = document.querySelector("#description");
const submitBtn = document.querySelector(".submitBtn");

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

const clearCarListAndGetNewData = () => {
  carsList.innerHTML = "";
  getRequest();
};

//search
  const search = document.querySelector(".search");
  search.addEventListener("input", () => {
    fetch(BASE_URL)
    .then((response) => response.json())
    .then((cars) => {
      cars.reverse().forEach((car) => {
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
        infoBrand.innerText = `Brand: ${car.brand}`;
        infoModel.innerText = `Model: ${car.model}`;
        infoYear.innerText = `Year: ${car.year}`;
        infoKm.innerText = `Mileage : ${car.mileage}m`;
        infoDescription.innerText = `Description: ${car.description}`;

        carsList.appendChild(carr);
        let value = search.value.trim();
        if(value != ""){
          carsList.forEach((car) => {
            if (car.innerText.search(value) == -1){
              car.classList.add("carNone")
            } else{
              car.classList.remove("carNone")
            }
          })
        }
    })
  })
})

// delete btn
const deleteOneCar = (id) => {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then(clearCarListAndGetNewData);
};

//edit btn

const editOneCar = (car) => {
  brandValue.value = car.brand;
  modelValue.value = car.model;
  yearValue.value = car.year;
  mileageValue.value = car.mileage;
  photoValue.value = car.photo_link;
  descriptionValue.value = car.description;

  submitBtn.addEventListener("click", () => {
    fetch(`${BASE_URL}/${car._id}`, {
      method: "DELETE",
    });
  });
};

//get request

function getRequest() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((cars) => {
      cars.reverse().forEach((car) => {
        const carr = document.createElement("div");

        carr.classList.add("car");
        carr.innerHTML = carTegs;

        const carImg = carr.querySelector(".carImg");
        const infoBrand = carr.querySelector(".infoBrand");
        const infoModel = carr.querySelector(".infoModel");
        const infoYear = carr.querySelector(".infoYear");
        const infoKm = carr.querySelector(".infoKm");
        const infoDescription = carr.querySelector(".infoDescription");

        const deleteBtn = carr.querySelector(".deleteBtn");
        const editBtn = carr.querySelector(".editBtn");

        carImg.setAttribute("src", car.photo_link);
        infoBrand.innerText = `Brand: ${car.brand}`;
        infoModel.innerText = `Model: ${car.model}`;
        infoYear.innerText = `Year: ${car.year}`;
        infoKm.innerText = `Mileage : ${car.mileage}m`;
        infoDescription.innerText = `Description: ${car.description}`;

        carsList.appendChild(carr);
        deleteBtn.addEventListener("click", () => deleteOneCar(car._id));
        editBtn.addEventListener("click", () => editOneCar(car));
      });
    });
}
getRequest();

//get request one obj

// post request
function postRequest() {
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
    .then(clearCarListAndGetNewData)
    .catch((err) => console.error(err));
  form.reset();
}

//validation

const checkInputs = [
  brandValue,
  modelValue,
  yearValue,
  mileageValue,
  photoValue,
  descriptionValue,
];

const showErrorIcon = (input) => {
  const errorIcon = input.parentNode.querySelector(".errorIcon");
  if (errorIcon) {
    errorIcon.style.display = "inline";
  }
};
const showSuccessIcon = (input) => {
  const errorIcon = input.parentNode.querySelector(".errorIcon");
  const successIcon = input.parentNode.querySelector(".successIcon");
  if (errorIcon) {
    errorIcon.style.display = "none";
  }
  if (successIcon) {
    successIcon.style.display = "inline";
  }
};
const noneIcon = (input) => {
  const successIcon = input.parentNode.querySelector(".successIcon");
  const errorIcon = input.parentNode.querySelector(".errorIcon");
  if (errorIcon) {
    errorIcon.style.display = "none";
  }
  if (successIcon) {
    successIcon.style.display = "none";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isError = false;
  checkInputs.forEach((input) => {
    if (!input.value) {
      input.style.border = RED_LINE;
      showErrorIcon(input);
      input.classList.add("placeholder");
      isError = true;
    } else {
      noneIcon(input);
      input.style.border = "1px solid #4169e1";
    }
  });
  if (!isError) {
    postRequest();
  }
});

checkInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (!input.value) {
      showErrorIcon(input);
      input.style.border = RED_LINE;
      input.classList.add("placeholder");
    }
  });
  input.addEventListener("input", () => {
    if (input.value) {
      showSuccessIcon(input);
      input.style.border = "1px solid #008000";
      input.classList.remove("placeholder");
    }
  });
});




