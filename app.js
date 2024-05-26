import Title from "./components/title.js";
import Search from "./components/search.js";

window.addEventListener("DOMContentLoaded", () => {
	init();
});

function init() {
	//TODO: add missing components to the main page (pagination part and cards)
	render([Title, Search]);
}

function render(components) {
	const mainPage = document.getElementsByTagName("body")[0];

	components.forEach((component) => {
		mainPage.append(component());
	});
}
