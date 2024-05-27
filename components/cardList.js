import fetchJson from "../service/service.js";
import Card from "./card.js";
import Pagination from "./pagination.js";

let page = 0;
const itemsPerPage = 3;

export default async function CardList() {
	const main = document.createElement("main");
	const paginationSection = Pagination();
	const pagDiv = document.createElement("div");
	pagDiv.appendChild(paginationSection);

	main.appendChild(pagDiv);

	let cardsDiv = document.createElement("div");
	cardsDiv.setAttribute("class", "cards-div");

	const locations = await fetchJson();

	const locationsPerPage = locations.slice(page, itemsPerPage);
	console.log(locationsPerPage);

	locationsPerPage.forEach((locationPerPage) => {
		console.log(locationPerPage);

		cardsDiv.appendChild(
			Card(locationPerPage.city, locationPerPage.img, locationPerPage.state)
		);
	});
	main.appendChild(cardsDiv);

	return main;
}
