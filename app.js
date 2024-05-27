import Title from "./components/title.js";
import Search from "./components/search.js";
import Pagination from "./components/pagination.js";
import CardList from "./components/cardList.js";

window.addEventListener("DOMContentLoaded", () => {
	init();
});

async function init() {
	//Since the MainDiv component is an async one, I have to work with it in separate
	const cardList = await CardList();

	render([Title(), Search(), Pagination(), cardList]);
}

function render(components) {
	const mainPage = document.getElementsByTagName("body")[0];

	components.forEach((component) => {
		mainPage.append(component);
	});
}
