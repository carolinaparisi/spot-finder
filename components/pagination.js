export default function Pagination(page) {
	const pagination = document.createElement("section");
	pagination.setAttribute("class", "pagination-section");

	const previousBtn = document.createElement("button");
	previousBtn.setAttribute("class", "button");
	previousBtn.setAttribute("id", "previous-btn");
	previousBtn.innerText = "<";

	const pages = document.createElement("div");
	pages.setAttribute("class", "number-pages");
	pages.innerText = `${page} of 4`;

	const nextBtn = document.createElement("button");
	nextBtn.setAttribute("class", "button");
	nextBtn.setAttribute("id", "next-btn");
	nextBtn.innerText = ">";

	pagination.appendChild(previousBtn);
	pagination.appendChild(pages);
	pagination.appendChild(nextBtn);

	previousBtn.setAttribute("disabled", "");
	previousBtn.setAttribute("class", "disabled");

	return pagination;
}
