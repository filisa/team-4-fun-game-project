//Grab the elements
const pond = document.getElementById("pond");
const frog = document.getElementById("frog");
const tongue = document.getElementById("tongue");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const bestEl = document.getElementById("best");

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
  fly.style.setProperty("--duration", `${Math.random() * 3 + 3}s`);
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
const CATCH_RADIUS = 40;   // how close (in px) the tongue tip must be to a fly
let score = 0;             // how many flies we have caught

//NEW 2: check every fly and catch the ones near the tongue tip
// x and y = where the tip of the tongue is, inside the pond
function catchFliesAt(x, y) {
  const pondBox = pond.getBoundingClientRect();
  const allFlies = pond.querySelectorAll(".fly");

  allFlies.forEach(function (fly) {
    // ask the browser where this fly is right now (CSS is moving it)
    const box = fly.getBoundingClientRect();
    const flyX = box.left - pondBox.left + box.width / 2;
    const flyY = box.top - pondBox.top + box.height / 2;

    // straight-line distance from the fly to the tongue tip
    const distance = Math.hypot(flyX - x, flyY - y);

    if (distance < CATCH_RADIUS) {
      score++;                         // +1 point
      scoreEl.textContent = score;     // show it on the page
      fly.remove();                    // the fly is gone
      createFly();                     // a new fly arrives
    }
  });
}


//click to shoot the tongue
const TONGUE_TIME = 250;
let tongueBusy = false;

//what should happen when we click?
pond.addEventListener("click", function (event) {
  if (tongueBusy) return;
  tongueBusy = true;

  //pond location
  const pondBox = pond.getBoundingClientRect();
  const clickX = event.clientX - pondBox.left;
  const clickY = event.clientY - pondBox.top;

  // frog's mouth
  const mouthX = frog.offsetLeft + frog.offsetWidth / 2;
  const mouthY = frog.offsetTop + 50;

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
    catchFliesAt(clickX, clickY);       //NEW 3: the tongue has arrived, did it hit a fly?
    tongue.classList.remove("tongue-out");
    setTimeout(function () {
      tongueBusy = false;
    }, TONGUE_TIME);
  }, TONGUE_TIME);
});