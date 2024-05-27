export default function Pagination() {
	const pagination = document.createElement("section");
	pagination.setAttribute("class", "pagination-section");

	const previousBtn = document.createElement("button");
	previousBtn.setAttribute("class", "button");
	previousBtn.setAttribute("id", "previous-btn");
	previousBtn.innerText = "<";

	const pages = document.createElement("div");
	pages.setAttribute("class", "number-pages");
	pages.innerText = "1 a 4";

	const nextBtn = document.createElement("button");
	nextBtn.setAttribute("class", "button");
	nextBtn.setAttribute("id", "next-btn");
	nextBtn.innerText = ">";

	pagination.appendChild(previousBtn);
	pagination.appendChild(pages);
	pagination.appendChild(nextBtn);

	return pagination;
}
