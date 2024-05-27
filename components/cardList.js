import fetchJson from "../service/service.js";
import Card from "./card.js";

export default async function CardList() {
	const main = document.createElement("main");

	const locations = await fetchJson();
	console.log(locations);

	locations.forEach((location) => {
		main.appendChild(Card(location.city, location.img, location.state));
	});

	return main;
}
