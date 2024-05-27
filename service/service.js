export default async function fetchJson() {
	const information = await fetch("locations.json");
	return information.json();
}
