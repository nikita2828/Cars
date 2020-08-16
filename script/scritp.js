const BASE_URL = 'http://localhost:3050/cars';
const RED_LINE = '1px solid #ff0000';

const form = document.querySelector('#form');
const carsList = document.querySelector('.cars');

const brandValue = document.querySelector('#brand');
const modelValue = document.querySelector('#model');
const yearValue = document.querySelector('#year');
const mileageValue = document.querySelector('#mileage');
const photoValue = document.querySelector('#photo_link');
const descriptionValue = document.querySelector('#description');
const submitBtn = document.querySelector('.submitBtn');
const sortSelect = document.querySelector('.sort');
let editId = false;
let dataCars = [];

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

sortSelect.addEventListener('change', (e) => {
	const { value } = e.target;
	carsList.innerHTML = '';
	if (value === 'asc') {
		renderCars(dataCars.sort((a, b) => +a.year - +b.year));
	}
	if (value === 'desc') {
		renderCars(dataCars.sort((a, b) => +b.year - +a.year));
	}
});

const clearCarListAndGetNewData = () => {
	carsList.innerHTML = '';
	getRequest().then((data) => renderCars(dataCars));
};

//search
const search = document.querySelector('.search');

search.addEventListener('input', (event) => {
	const { value } = event.target;
	const filteredResult = dataCars.filter((car) => {
		return car.description.includes(value);
	});
	carsList.innerHTML = '';
	if (!filteredResult.length) {
		carsList.innerHTML = ' <h1>Извините но совпадений нет</h1>';
	} else {
		renderCars(filteredResult);
	}
});

// delete btn
const deleteOneCar = (id) => {
	fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
	})
		.then(clearCarListAndGetNewData)
		.then(() => (search.value = ''));
};

//edit btn

const editOneCar = (car) => {
	brandValue.value = car.brand;
	modelValue.value = car.model;
	yearValue.value = car.year;
	mileageValue.value = car.mileage;
	photoValue.value = car.photo_link;
	descriptionValue.value = car.description;
	editId = car._id;
	submitBtn.value = 'EDIT';
};

//get request
const renderCars = (cars) => {
	cars.reverse().forEach((car) => {
		const carr = document.createElement('div');

		carr.classList.add('car');
		carr.innerHTML = carTegs;

		const carImg = carr.querySelector('.carImg');
		const infoBrand = carr.querySelector('.infoBrand');
		const infoModel = carr.querySelector('.infoModel');
		const infoYear = carr.querySelector('.infoYear');
		const infoKm = carr.querySelector('.infoKm');
		const infoDescription = carr.querySelector('.infoDescription');

		const deleteBtn = carr.querySelector('.deleteBtn');
		const editBtn = carr.querySelector('.editBtn');

		carImg.setAttribute('src', car.photo_link);
		infoBrand.innerText = `Brand: ${car.brand}`;
		infoModel.innerText = `Model: ${car.model}`;
		infoYear.innerText = `Year: ${car.year}`;
		infoKm.innerText = `Mileage : ${car.mileage}m`;
		infoDescription.innerText = `Description: ${car.description}`;

		carsList.appendChild(carr);
		deleteBtn.addEventListener('click', () => deleteOneCar(car._id));
		editBtn.addEventListener('click', () => editOneCar(car));
	});
};

function getRequest() {
	return fetch(BASE_URL)
		.then((response) => response.json())
		.then((cars) => {
			dataCars = [...cars];
		});
}

getRequest().then((data) => renderCars(dataCars));

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
	if (editId) {
		fetch(`${BASE_URL}/${editId}`, {
			method: 'PUT',
			body: JSON.stringify(carObj),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(clearCarListAndGetNewData)
			.then(() => {
				editId = null;
				submitBtn.value = 'Create';
			})
			.catch((err) => console.error(err));
		form.reset();
	} else {
		fetch(BASE_URL, {
			method: 'POST',
			body: JSON.stringify(carObj),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(clearCarListAndGetNewData)
			.then(() => (search.value = ''))
			.catch((err) => console.error(err));
		form.reset();
	}
}

//validation

const checkInputs = [brandValue, modelValue, yearValue, mileageValue, photoValue, descriptionValue];

const showErrorIcon = (input) => {
	const errorIcon = input.parentNode.querySelector('.errorIcon');
	if (errorIcon) {
		errorIcon.style.display = 'inline';
	}
};
const showSuccessIcon = (input) => {
	const errorIcon = input.parentNode.querySelector('.errorIcon');
	const successIcon = input.parentNode.querySelector('.successIcon');
	if (errorIcon) {
		errorIcon.style.display = 'none';
	}
	if (successIcon) {
		successIcon.style.display = 'inline';
	}
};
const noneIcon = (input) => {
	const successIcon = input.parentNode.querySelector('.successIcon');
	const errorIcon = input.parentNode.querySelector('.errorIcon');
	if (errorIcon) {
		errorIcon.style.display = 'none';
	}
	if (successIcon) {
		successIcon.style.display = 'none';
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let isError = false;
	checkInputs.forEach((input) => {
		if (!input.value) {
			input.style.border = RED_LINE;
			showErrorIcon(input);
			input.classList.add('placeholder');
			isError = true;
		} else {
			noneIcon(input);
			input.style.border = '1px solid #4169e1';
		}
	});
	if (!isError) {
		postRequest();
	}
});

checkInputs.forEach((input) => {
	input.addEventListener('blur', () => {
		if (!input.value) {
			showErrorIcon(input);
			input.style.border = RED_LINE;
			input.classList.add('placeholder');
		}
	});
	input.addEventListener('input', () => {
		if (input.value) {
			showSuccessIcon(input);
			input.style.border = '1px solid #008000';
			input.classList.remove('placeholder');
		}
	});
});




