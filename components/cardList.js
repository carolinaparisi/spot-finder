import fetchJson from "../service/service.js";
import Card from "./card.js";

let page = 0;
const itemsPerPage = 3;

export default async function CardList() {
	const main = document.createElement("main");

	const locations = await fetchJson();

	const locationsPerPage = locations.slice(page, itemsPerPage);
	console.log(locationsPerPage);

	locationsPerPage.forEach((locationPerPage) => {
		console.log(locationPerPage);
		main.appendChild(
			Card(locationPerPage.city, locationPerPage.img, locationPerPage.state)
		);
	});

	return main;
}
