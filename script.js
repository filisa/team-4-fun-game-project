function renderTheFlies() {
	let div = document.getElementById("game_div");
	let fly = document.createElement("img");
	fly.id = "fly";
	fly.src = "images/fly.svg";
	div.appendChild(fly);
}
renderTheFlies();
