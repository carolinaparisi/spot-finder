export default function Search() {
	const form = document.createElement("form");
	form.setAttribute("class", "form");

	const input = document.createElement("input");
	input.setAttribute("id", "search-input");
	input.setAttribute("placeholder", "Search for City or State");

	form.appendChild(input);

	return form;
}
