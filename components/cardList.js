import fetchJson from "../service/service.js";
import Card from "./card.js";
import Pagination from "./pagination.js";

export default function CardList(locations) {
	const main = document.createElement("main");

	let cardsDiv = document.createElement("div");
	cardsDiv.setAttribute("class", "cards-div");

	locations.forEach((location) => {
		main.appendChild(Card(location.city, location.img, location.state));
	});

	return main;
}
