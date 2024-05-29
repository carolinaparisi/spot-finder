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
	const messageNotFound = "Sorry, no City or State were found here :(";

	const data = getPageComponents(fetchData, page, itemsPerPage);

	render([Title(), Search(), Pagination(page, maxPages), CardList(data)]);

	addButtonsEventListener(page, maxPages, fetchData, itemsPerPage);

	//handle enter key to filter the city or country
	const form = document.querySelector(".form")[0];
	form.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const filteredLocations = handleForm(event, fetchData);
			updatePaginationDiv(filteredLocations, page, itemsPerPage);
			updateMainDiv(filteredLocations, page, itemsPerPage, messageNotFound);
		}
	});
}

function addButtonsEventListener(page, maxPages, fetchData, itemsPerPage) {
	const nextBtn = document.querySelector("#next-btn");
	const previousBtn = document.querySelector("#previous-btn");
	const messageNotFound = "";

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

		updateMainDiv(fetchData, page, itemsPerPage, messageNotFound);
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

function updateMainDiv(fetchData, page, itemsPerPage, messageNotFound) {
	const mainPage = document.getElementsByTagName("body")[0];

	//Dom manipulation in case of there's no location to render
	if (fetchData.length === 0) {
		document.querySelector("main").remove();
		const mainDiv = document.createElement("main");
		mainDiv.innerText = messageNotFound;

		mainPage.appendChild(mainDiv);

		return;
	}

	document.querySelector("main").remove();
	const data = getPageComponents(fetchData, page, itemsPerPage);
	render([CardList(data)]);
}

function updatePaginationDiv(filteredLocations, page, itemsPerPage) {
	let maxPages = 0;
	maxPages = Math.ceil(filteredLocations.length / itemsPerPage);

	//Need to have at list one page to have the correct functionality at the buttons
	if (maxPages === 0) {
		maxPages = 1;
	}

	document.querySelector(".pagination-section").remove();
	render([Pagination(page, maxPages)]);
	addButtonsEventListener(page, maxPages, filteredLocations, itemsPerPage);
}

function handleForm(event, fetchData) {
	event.preventDefault();

	const searchInput = document.querySelector("#search-input");
	const arrayLocations = Object.values(fetchData);
	const inputValue = searchInput.value.toLowerCase();

	const filteredLocations = arrayLocations.filter((location) => {
		if (
			!(
				location.city.toLowerCase().includes(inputValue) ||
				location.state.toLowerCase().includes(inputValue)
			)
		) {
			searchInput.value = "";
			return;
		}

		return (
			location.city.toLowerCase().includes(inputValue) ||
			location.state.toLowerCase().includes(inputValue)
		);
	});

	//clear the input for others searches
	searchInput.value = "";

	return filteredLocations;
}
