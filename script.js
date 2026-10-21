//I am taking control of the div where flies will be
let div = document.getElementById("game_div");
//I put the flies in the array in case I want to add more flies
fliesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//I used a loop to add all the flies from the array to the html page
for (let i = 0; i < fliesArray.length; i++) {
	let fly = document.createElement("img");
	fly.id = `fly-${fliesArray[i]}`;
	fly.classList.add("fly");
	fly.src = "images/fly.svg";
	div.appendChild(fly);
	fly.addEventListener("click", function () {
		fly.style.display = "none";
		//add +1 to the score at the top
		//update the score in the local storage
		//render +1 next to the fly
		let plusOne = document.createElement("span");
		plusOne.textContent = "+1";
		plusOne.classList.add("plus_one");
		div.appendChild(plusOne);
		setTimeout(() => {
			div.removeChild(plusOne);
		}, 300);
	});
}

//I take control of the flies to animate them
const flies = document.querySelectorAll(".fly");

//calculate random coordinates for the flies animations
function randomPercent() {
	return `${Math.floor(Math.random() * 49) + 5}%`;
}
// that is where AI helped.
flies.forEach((fly) => {
	fly.style.setProperty("--start-y", randomPercent());
	fly.style.setProperty("--middle-y", randomPercent());
	fly.style.setProperty("--centre-y", randomPercent());
	fly.style.setProperty("--near-end-y", randomPercent());
	fly.style.setProperty("--end-y", randomPercent());

	fly.style.setProperty("--duration", `${Math.random() * 3 + 4}s`);

	fly.style.setProperty("--delay", `${Math.random() * 1.1}s`);
});
