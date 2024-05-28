import Title from "./components/title.js";
import Search from "./components/search.js";
import Pagination from "./components/pagination.js";
import CardList from "./components/cardList.js";
import fetchJson from "../service/service.js";

window.addEventListener("DOMContentLoaded", () => {
	init();
});

async function init() {
	let page = 1;
	const itemsPerPage = 3;
	const fetchData = await fetchAllData();
	const maxPages = Math.ceil(fetchData.length / itemsPerPage);

	const data = getPageComponents(fetchData, page, itemsPerPage);
	console.log(data);

	render([Title(), Search(), Pagination(page, maxPages), CardList(data)]);

	const nextBtn = document.querySelector("#next-btn");
	const previousBtn = document.querySelector("#previous-btn");

	nextBtn.addEventListener("click", () => {
		if (page === maxPages - 1) {
			nextBtn.setAttribute("disabled", "");
			nextBtn.setAttribute("class", "disabled");
		}

		previousBtn.removeAttribute("disabled");
		previousBtn.classList.remove("disabled");
		previousBtn.classList.add("button");

		page++;
		setCurrentPage(page);

		updateMainDiv(fetchData, page, itemsPerPage);
	});

	previousBtn.addEventListener("click", () => {
		page--;
		setCurrentPage(page);

		if (page === 1) {
			previousBtn.setAttribute("disabled", "");
			previousBtn.setAttribute("class", "disabled");
		}

		nextBtn.removeAttribute("disabled");
		nextBtn.classList.remove("disabled");
		nextBtn.classList.add("button");

		updateMainDiv(fetchData, page, itemsPerPage);
	});

	//handle enter key to filter the city or country
	const form = document.querySelector(".form")[0];
	form.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const filteredLocations = handleForm(event, fetchData);
			console.log(filteredLocations);
			updatePaginationDiv(filteredLocations, page, itemsPerPage);
			updateMainDiv(filteredLocations, page, itemsPerPage);
		}
	});
}

function render(components) {
	const mainPage = document.getElementsByTagName("body")[0];

	components.forEach((component) => {
		mainPage.append(component);
	});
}

function getPageComponents(data, page, itemsPerPage) {
	let from = (page - 1) * itemsPerPage;
	let to = page * itemsPerPage;
	console.log(page, from, to);
	return data.slice(from, to);
}

async function fetchAllData() {
	const locations = await fetchJson();
	return locations;
}

function setCurrentPage(page) {
	const paginationSection = document.querySelector(".pagination-section");
	const numberPages = paginationSection.querySelectorAll(".number-pages")[0];
	numberPages.innerText = `Page ${page}`;
}

function updateMainDiv(fetchData, page, itemsPerPage) {
	//TODO: remove pagination component and implement correct number of pages correctly
	document.querySelector("main").remove();
	const data = getPageComponents(fetchData, page, itemsPerPage);
	render([CardList(data)]);
}

function updatePaginationDiv(filteredLocations, page, itemsPerPage) {
	const maxPages = Math.ceil(filteredLocations.length / itemsPerPage);
	document.querySelector(".pagination-section").remove();
	console.log(maxPages);
	render([Pagination(page, maxPages)]);
}

function handleForm(event, fetchData) {
	event.preventDefault();

	const searchInput = document.querySelector("#search-input");
	const arrayLocations = Object.values(fetchData);
	const inputValue = searchInput.value.toLowerCase();

	const filteredLocations = arrayLocations.filter((location) => {
		return (
			location.city.toLowerCase().includes(inputValue) ||
			location.state.toLowerCase().includes(inputValue)
		);
	});

	//clear the input for others searches
	searchInput.value = "";

	return filteredLocations;
}
