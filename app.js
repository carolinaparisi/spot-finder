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

	render([Title(), Search(), Pagination(), CardList(data)]);

	const nextBtn = document.querySelector("#next-btn");
	const previousBtn = document.querySelector("#previous-btn");

	nextBtn.addEventListener("click", () => {
		if (page === Math.floor(fetchData.length / itemsPerPage)) {
			nextBtn.setAttribute("disabled", "");
			console.log("btn disabled");
		}

		previousBtn.removeAttribute("disabled");
		page++;
		document.querySelector("main").remove();
		const data = getPageComponents(fetchData, page, itemsPerPage);
		render([CardList(data)]);
	});

	previousBtn.addEventListener("click", () => {
		page--;
		if (page === 1) {
			previousBtn.setAttribute("disabled", "");
			console.log("btn disabled");
		}

		nextBtn.removeAttribute("disabled");
		document.querySelector("main").remove();
		const data = getPageComponents(fetchData, page, itemsPerPage);
		render([CardList(data)]);
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
