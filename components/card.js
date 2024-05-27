export default function Card(city, src, state) {
	const card = document.createElement("div");
	card.setAttribute("class", "card");

	const cityDiv = document.createElement("div");
	cityDiv.innerHTML = `${city}`;

	const imgDiv = document.createElement("img");
	imgDiv.setAttribute("src", `${src}`);

	const stateDiv = document.createElement("div");
	stateDiv.innerHTML = `${state}`;

	card.appendChild(cityDiv);
	card.appendChild(imgDiv);
	card.appendChild(stateDiv);

	return card;
}
