const BASE_URL = "http://localhost:3050/cars";
const form = document.querySelector("#form");
const carsList = document.querySelector(".cars");

const brandValue = document.querySelector("#brand");
const modelValue = document.querySelector("#model");
const yearValue = document.querySelector("#year");
const mileageValue = document.querySelector("#mileage");
const photoValue = document.querySelector("#photo_link");
const descriptionValue = document.querySelector("#description");
const validation = document.getElementsByClassName(".validation");
const trueImg1 = document.querySelector(".true1");
const falseImg1 = document.querySelector(".false1");
const trueImg2 = document.querySelector(".true2");
const falseImg2 = document.querySelector(".false2");
const trueImg3 = document.querySelector(".true3");
const falseImg3 = document.querySelector(".false3");
const trueImg4 = document.querySelector(".true4");
const falseImg4 = document.querySelector(".false4");
const trueImg5 = document.querySelector(".true5");
const falseImg5 = document.querySelector(".false5");


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
    method: "DELETE",
  }).then(() => {
    carsList.innerHTML = "";
    getRequest();
  });
};

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

        const deleteBtn = carr.querySelector(".deleteBtn");

        carImg.setAttribute("src", car.photo_link);
        infoBrand.innerText = `Brand: ${car.brand}`;
        infoModel.innerText = `Model: ${car.model}`;
        infoYear.innerText = `Year: ${car.year}`;
        infoKm.innerText = `Mileage : ${car.mileage}m`;
        infoDescription.innerText = `Description: ${car.description}`;

        carsList.appendChild(carr);
        deleteBtn.addEventListener("click", () => deleteOneCar(car._id));
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
    .then(() => getRequestOne())
    .catch((err) => console.error(err));
  form.reset();
}

//validation

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (brandValue.value == "" || brandValue.value == " ") {
    brandValue.style.border = "1px solid #ff0000";
    brandValue.classList.add("placeholder");
    falseImg1.style.display = "inline"
  } 
  else {
    brandValue.style.border = "1px solid #008000";
    falseImg1.style.display = "none"
    trueImg1.style.display = "inline";
  }
  if (modelValue.value == "" || modelValue.value == " ") {
    modelValue.style.border = "1px solid #ff0000";
    modelValue.classList.add("placeholder");
    falseImg2.style.display = "inline"

  } else {
    modelValue.style.border = "1px solid #008000";
    falseImg2.style.display = "none"
    trueImg2.style.display = "inline";
  }
  if (yearValue.value == "" || yearValue.value == " ") {
    yearValue.style.border = "1px solid #ff0000";
    yearValue.classList.add("placeholder");
    falseImg3.style.display = "inline"

  } else {
    yearValue.style.border = "1px solid #008000";
    falseImg3.style.display = "none"
    trueImg3.style.display = "inline";
  }
  if (mileageValue.value == "" || mileageValue.value == " ") {
    mileageValue.style.border = "1px solid #ff0000";
    mileageValue.classList.add("placeholder");
    falseImg4.style.display = "inline"

  } else {
    mileageValue.style.border = "1px solid #008000";
    falseImg4.style.display = "none"
    trueImg4.style.display = "inline";
  }
  if (photoValue.value == "" || photoValue.value == " ") {
    photoValue.style.border = "1px solid #ff0000";
    photoValue.classList.add("placeholder");
    falseImg5.style.display = "inline"

  } else {
    photoValue.style.border = "1px solid #008000";
    falseImg5.style.display = "none"
    trueImg5.style.display = "inline";
  }
  if (descriptionValue.value == "" || descriptionValue.value == " ") {
    descriptionValue.style.border = "1px solid #ff0000";
    descriptionValue.classList.add("placeholder");
  } else {
    descriptionValue.style.border = "1px solid #008000";
  }
  if (brandValue.value.length > 0){
    if (modelValue.value.length > 0){
      if (yearValue.value.length > 0){
        if (mileageValue.value.length > 0){
          if (photoValue.value.length > 0){
            if (descriptionValue.value.length > 0){
              postRequest()
              brandValue.style.border = "1px solid #4169e1"
              modelValue.style.border = "1px solid #4169e1"
              yearValue.style.border = "1px solid #4169e1"
              mileageValue.style.border = "1px solid #4169e1"
              photoValue.style.border = "1px solid #4169e1"
              descriptionValue.style.border = "1px solid #4169e1"
              brandValue.classList.remove("placeholder");
              modelValue.classList.remove("placeholder");
              yearValue.classList.remove("placeholder");
              mileageValue.classList.remove("placeholder");
              photoValue.classList.remove("placeholder");
              descriptionValue.classList.remove("placeholder");
              trueImg1.style.display = "none";
              trueImg2.style.display = "none";
              trueImg3.style.display = "none";
              trueImg4.style.display = "none";
              trueImg5.style.display = "none";
            }
          }
        }
      }
    }
  }
});

brandValue.addEventListener("blur", () => {
  if (brandValue.value == "" || brandValue.value == " ") {
    brandValue.style.border = "1px solid #ff0000";
    brandValue.classList.add("placeholder");
    falseImg1.style.display = "inline"
  } 
  else {
    brandValue.style.border = "1px solid #008000";
    falseImg1.style.display = "none"
    trueImg1.style.display = "inline";
  }
});

modelValue.addEventListener("blur", () => {
  if (modelValue.value == "" || modelValue.value == " ") {
    modelValue.style.border = "1px solid #ff0000";
    modelValue.classList.add("placeholder");
    falseImg2.style.display = "inline"

  } else {
    modelValue.style.border = "1px solid #008000";
    falseImg2.style.display = "none"
    trueImg2.style.display = "inline";
  }
});

yearValue.addEventListener("blur", () => {
  if (yearValue.value == "" || yearValue.value == " ") {
    yearValue.style.border = "1px solid #ff0000";
    yearValue.classList.add("placeholder");
    falseImg3.style.display = "inline"

  } else {
    yearValue.style.border = "1px solid #008000";
    falseImg3.style.display = "none"
    trueImg3.style.display = "inline";
  }
});

mileageValue.addEventListener("blur", () => {
  if (mileageValue.value == "" || mileageValue.value == " ") {
    mileageValue.style.border = "1px solid #ff0000";
    mileageValue.classList.add("placeholder");
    falseImg4.style.display = "inline"

  } else {
    mileageValue.style.border = "1px solid #008000";
    falseImg4.style.display = "none"
    trueImg4.style.display = "inline";
  }
});

photoValue.addEventListener("blur", () => {
  if (photoValue.value == "" || photoValue.value == " ") {
    photoValue.style.border = "1px solid #ff0000";
    photoValue.classList.add("placeholder");
    falseImg5.style.display = "inline"

  } else {
    photoValue.style.border = "1px solid #008000";
    falseImg5.style.display = "none"
    trueImg5.style.display = "inline";
  }
});

descriptionValue.addEventListener("blur", () => {
  if (descriptionValue.value == "" || descriptionValue.value == " ") {
    descriptionValue.style.border = "1px solid #ff0000";
    descriptionValue.classList.add("placeholder");
  } else {
    descriptionValue.style.border = "1px solid #008000";
  }
});
