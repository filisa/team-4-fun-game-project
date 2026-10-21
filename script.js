let div = document.getElementById("game_div");
fliesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < fliesArray.length; i++) {
	let fly = document.createElement("img");
	fly.id = `fly-${fliesArray[i]}`;
	fly.classList.add("fly");
	fly.src = "images/fly.svg";
	div.appendChild(fly);
}
const flies = document.querySelectorAll(".fly");

function randomPercent() {
	return `${Math.floor(Math.random() * 49) + 5}%`;
}

flies.forEach((fly) => {
	fly.style.setProperty("--start-y", randomPercent());
	fly.style.setProperty("--middle-y", randomPercent());
	fly.style.setProperty("--centre-y", randomPercent());
	fly.style.setProperty("--near-end-y", randomPercent());
	fly.style.setProperty("--end-y", randomPercent());

	fly.style.setProperty("--duration", `${Math.random() * 3 + 4}s`);

	fly.style.setProperty("--delay", `${Math.random() * 1.1}s`);
});
