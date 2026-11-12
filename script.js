//Grab the elements
const pond = document.getElementById("pond");
const frog = document.getElementById("frog");
const tongue = document.getElementById("tongue");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const bestEl = document.getElementById("best");
//End screen: shows when the time runs out
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
let timeLeft = 30; // seconds left in the game
let timerId = null; //empty box for the timer's number, filled when game starts
//Accessibility helpers
const announcer = document.getElementById("announcer");
const aim = document.getElementById("aim");
let playing = false; // true only while a round is running

// screen readers read out whatever text we put in the announcer
function announce(message) {
	announcer.textContent = message;
}

// people who asked their device for less motion get slower flies
const reduceMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)"
).matches;

//Welcome screen: hides when you click it
const welcomeScreen = document.getElementById("welcome-screen");
renderTheBestScore();

function hideWelcomeScreen() {
	welcomeScreen.classList.add("hidden");
}

welcomeScreen.addEventListener("click", function (event) {
	event.stopPropagation(); // starting the game should not also shoot the tongue
	hideWelcomeScreen();
	playing = true;
	pond.focus(); // keyboard players can aim right away
	announce("Game started. 30 seconds.");
	countDown();
	timerId = setInterval(countDown, 1000);
});

function countDown() {
	timeLeft = timeLeft - 1; //take away one second
	timerEl.textContent = timeLeft; //show the new time on the page

	// tell screen reader users the time now and then, not every second
	if (timeLeft === 10 || timeLeft === 5) {
		announce(timeLeft + " seconds left.");
	}

	if (timeLeft === 0) {
		//when time runs out
		clearInterval(timerId); //stop the timer
		showEndScreen(); //show the end screen with the score
	}
}

//create one fly and adjust how it moves across the screen
function randomPercent() {
	return `${Math.floor(Math.random() * 49) + 4}%`;
}

function createFly() {
	const fly = document.createElement("img");
	fly.classList.add("fly");
	fly.src = "images/fly.svg";
	fly.alt = "";

	fly.style.setProperty("--start-y", randomPercent());
	fly.style.setProperty("--middle-y", randomPercent());
	fly.style.setProperty("--centre-y", randomPercent());
	fly.style.setProperty("--near-end-y", randomPercent());
	fly.style.setProperty("--end-y", randomPercent());
	const slowDown = reduceMotion ? 2 : 1; // twice as slow with reduced motion
	fly.style.setProperty("--duration", `${(Math.random() * 3 + 3) * slowDown}s`);
	fly.style.setProperty("--delay", `-${Math.random() * 4}s`);

	pond.appendChild(fly);
}

//create number of flies
const FLY_COUNT = 7;

function createAllFlies() {
	for (let i = 0; i < FLY_COUNT; i++) {
		createFly();
	}
}

createAllFlies();

//NEW 1: settings for catching flies
const CATCH_RADIUS = 40; // how close (in px) the tongue tip must be to a fly
let score = 0; // how many flies we have caught

//NEW 2: check every fly and catch the ones near the tongue tip
// x and y = where the tip of the tongue is, inside the pond
function catchFliesAt(x, y) {
	const pondBox = pond.getBoundingClientRect();
	const allFlies = pond.querySelectorAll(".fly");

	allFlies.forEach(function (fly) {
		if (fly.dataset.caught) return;

		// ask the browser where this fly is right now (CSS is moving it)
		const box = fly.getBoundingClientRect();
		const flyX = box.left - pondBox.left + box.width / 2;
		const flyY = box.top - pondBox.top + box.height / 2;

		// straight-line distance from the fly to the tongue tip
		const distance = Math.hypot(flyX - x, flyY - y);

		if (distance < CATCH_RADIUS) {
			fly.dataset.caught = "true";
			score++; // +1 point
			scoreEl.textContent = score; // show it on the page
			announce("Caught one! " + score + (score === 1 ? " fly." : " flies."));
			fly.src = "images/plus1.png";

			setTimeout(() => {
				fly.src = "images/plus1.png";

				setTimeout(() => {
					fly.remove(); // the fly is gone
					createFly(); // a new fly arrives
				}, 200);
			}, 200);
		}
	});
}

//click to shoot the tongue
const TONGUE_TIME = 250;
let tongueBusy = false;

//what should happen when we click?
pond.addEventListener("click", function (event) {
	if (!playing) return;

	//pond location
	const pondBox = pond.getBoundingClientRect();
	shootAt(event.clientX - pondBox.left, event.clientY - pondBox.top);
	changeFlyColor();
});

//Keyboard play: arrow keys move the aim marker, Space or Enter shoots
let aimX = 50; // aim position in % of the pond width
let aimY = 40; // aim position in % of the pond height
const AIM_STEP = 5; // how far one arrow key press moves the aim (%)

function moveAim() {
	aim.style.left = aimX + "%";
	aim.style.top = aimY + "%";
}
moveAim();

pond.addEventListener("keydown", function (event) {
	if (!playing) return;

	if (event.key === "ArrowLeft") aimX = Math.max(0, aimX - AIM_STEP);
	else if (event.key === "ArrowRight") aimX = Math.min(100, aimX + AIM_STEP);
	else if (event.key === "ArrowUp") aimY = Math.max(0, aimY - AIM_STEP);
	else if (event.key === "ArrowDown") aimY = Math.min(100, aimY + AIM_STEP);
	else if (event.key === " " || event.key === "Enter") {
		shootAt((aimX / 100) * pond.clientWidth, (aimY / 100) * pond.clientHeight);
	} else {
		return; // any other key: let the browser handle it (like Tab)
	}

	event.preventDefault(); // stop arrow keys and Space from scrolling the page
	moveAim();
	changeFlyColor();
});

//shoot the tongue at a point inside the pond (works for clicks and keys)
function shootAt(clickX, clickY) {
	if (tongueBusy) return;
	tongueBusy = true;

	// frog's mouth
	const mouthX = frog.offsetLeft + frog.offsetWidth / 2;
	// mouth sits ~60% down the frog image, so it works at any frog size
	const mouthY = frog.offsetTop + frog.offsetHeight * 0.6;

	//lets calculate which way and how far?
	const dx = clickX - mouthX;
	const dy = clickY - mouthY;
	const length = Math.hypot(dx, dy);
	const angle = Math.atan2(dy, dx);

	//setup the tongue
	tongue.style.left = mouthX + "px";
	tongue.style.top = mouthY + "px";
	tongue.style.setProperty("--angle", angle + "rad");
	tongue.style.setProperty("--tongue-length", length + "px");
	tongue.style.width = length + "px";

	//shoot it
	tongue.classList.add("tongue-out");

	//wait, pull back and unlock
	setTimeout(function () {
		catchFliesAt(clickX, clickY); //NEW 3: the tongue has arrived, did it hit a fly?
		tongue.classList.remove("tongue-out");
		setTimeout(function () {
			tongueBusy = false;
		}, TONGUE_TIME);
	}, TONGUE_TIME);
	changeFlyColor();
}

//this function will trigger when the game is over
function getTheBestScore() {
	//get the score from score field in html
	let oneScore = Number(scoreEl.textContent); //turn the text into a number
	let scoreFromStorage = Number(localStorage.getItem("highScore", oneScore)); //turn the text into number
	// if we have stuff in storage and new score is not 0, and new score is higher than
	//score from storage, we rewrite the best score.
	if (scoreFromStorage && oneScore > 0 && oneScore > scoreFromStorage) {
		localStorage.setItem("highScore", oneScore);
		return oneScore;
		//also if there is no score stored and new score is higher than 0
		//we can save it too:
	} else if (oneScore > 0 && !scoreFromStorage) {
		localStorage.setItem("highScore", oneScore);
		return oneScore;
	}
	//in case the new score if lower than saved score, or the new score 0,
	//return the saved best score instead of leaving it undefined
	return scoreFromStorage || 0;
}
//this function should be called when you load the page first
function renderTheBestScore() {
	//change the html
	bestEl.textContent = getTheBestScore();
}

function showEndScreen() {
	finalScore.textContent = score;
	playing = false;
	endScreen.classList.remove("hidden");
	renderTheBestScore();
	announce(
		"Time's up! You caught " +
			score +
			(score === 1 ? " fly." : " flies.") +
			" Best score " +
			bestEl.textContent +
			"."
	);
	playAgainButton.focus(); // keyboard players land on Play again
}

//Play again: reset and start a new round
const playAgainButton = document.getElementById("play-again");

function playAgain(event) {
	event.stopPropagation(); // restarting should not also shoot the tongue
	playing = true;
	score = 0;
	scoreEl.textContent = 0;
	timeLeft = 30;
	timerEl.textContent = 30;
	endScreen.classList.add("hidden");
	pond.focus(); // back to the pond so keyboard players can keep aiming
	announce("New game. 30 seconds.");
	timerId = setInterval(countDown, 1000);
}

playAgainButton.addEventListener("click", playAgain);

function changeFlyColor() {
	if (score >= 5 && score < 15) {
		frog.src = "images/frog_blue.svg";
	} else if (score >= 15 && score < 20) {
		frog.src = "images/frog_pink.svg";
	} else if (score >= 20 && score < 25) {
		frog.src = "images/frog_yellow.svg";
	} else if (score >= 25 && score < 30) {
		frog.src = "images/frog_diamond.svg";
	} else if (score >= 30 && score < 50) {
		frog.src = "images/frog_gold.svg";
	} else if (score >= 50) {
		frog.src = "images/frog_holographic.svg";
	} else {
		frog.src = "images/frog.svg";
	}
}
