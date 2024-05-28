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

	const data = getPageComponents(fetchData, page, itemsPerPage);
	console.log(data);

	render([Title(), Search(), Pagination(page), CardList(data)]);

	const nextBtn = document.querySelector("#next-btn");
	const previousBtn = document.querySelector("#previous-btn");

	nextBtn.addEventListener("click", () => {
		if (page === Math.floor(fetchData.length / itemsPerPage)) {
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
	numberPages.innerText = `${page} of 4`;
}

function updateMainDiv(fetchData, page, itemsPerPage) {
	document.querySelector("main").remove();
	const data = getPageComponents(fetchData, page, itemsPerPage);
	render([CardList(data)]);
}
