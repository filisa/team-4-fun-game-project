// HUNGRY FROG: A JAVASCRIPT WORKSHEET FOR FIRST-TIME CODERS
//
// This file contains instructions only. Do not write the game code here.
// Open script.js and follow one step at a time. Type the code asked for in
// script.js, save the file, refresh the website, and test before moving on.
//
// Words you will see:
// - HTML element: a piece of the page, such as a button, image, or paragraph.
// - Variable: a named box that remembers a value.
// - Function: a named set of steps that JavaScript can run when asked.
// - Event listener: code that waits for something, such as a click.
// - DOM: the page's HTML, which JavaScript can find and change.
// - to call something means we want the function to work now. We do that by writing the name
// of the function and (), like addFrog().
// If the browser shows an error, open the browser's developer console and read
// the first red error. Check spelling, capital letters, quotes, and brackets.
// JavaScript treats "score" and "Score" as different names.

//////////////////////////// BEFORE YOU START /////////////////////////////////
// Open script.js. Keep your game code there. The browser should load script.js
// from the HTML page.
//
// The page already needs these elements, with these exact IDs:
//   pond: the area where the flies appear
//   score: the number showing how many flies were caught
//   timer: the number of seconds left
//   best: the best score
//
// Add these elements to the HTML if they are not there yet:
//   <section id="welcome-screen">
//     <h2>Hungry Frog</h2>
//     <p>Click the flies before time runs out!</p>
//     <button id="start-button">Tap to start</button>
//   </section>
//   <section id="end-screen" hidden>
//     <p id="final-message"></p>
//     <button id="play-again-button">Play again</button>
//   </section>
//
// The word "hidden" makes the end screen invisible when the page first opens.
// Later, JavaScript will show or hide these sections.

//////////////////////////// STEP 1: FIND PAGE ELEMENTS ///////////////////////
// JavaScript needs to find the HTML elements before it can change them.
// document.getElementById("pond") means "find the element whose id is pond".
//
// At the very top of script.js, write one const line for each element below.
// A const is a named reference that should not be pointed at a different
// element later. Use these exact variable names so the later steps match:
//
//   const pond = document.getElementById("pond");
//
// Add one line for each of these:
//   scoreElement       finds the element with id "score"
//   timerElement       finds the element with id "timer"
//   bestElement        finds the element with id "best"
//   welcomeScreen      finds the element with id "welcome-screen"
//   startButton        finds the element with id "start-button"
//   endScreen          finds the element with id "end-screen"
//   finalMessage       finds the element with id "final-message"
//   playAgainButton    finds the element with id "play-again-button"
//
// For example, the score line is:
//   const scoreElement = document.getElementById("score");
// Write the other lines the same way, using the matching name and id above.
//
// TEST: Save and refresh. The page should look the same. If the console says
// an element is null, check that its HTML id and JavaScript spelling match.

//////////////////////////// STEP 2: REMEMBER GAME VALUES ////////////////////
// These values are used in more than one function, so write them at the top
// level in script.js (not inside another function). That way all the functions
// can use the same score and timer.
//
// Add four lines:
//   - let gameState = "welcome";
//   - let score = 0;
//   - let secondsLeft = 30;
//   - let timerId = null;
//
// "let" means the value is allowed to change. The gameState text will change
// from "welcome" to "playing" and then to "finished".
// timerId will remember the timer so the game can stop it later.
//
// TEST: Add console.log(gameState, score, secondsLeft) on a new line, refresh,
// and check the browser console. Remove the console.log after you see the
// values. (console.log prints a value for learning and debugging.)

//////////////////////////// STEP 3: REMEMBER THE BEST SCORE /////////////////
// The best score should still be there after closing or refreshing the page.
// The browser has a small storage area called localStorage for this.
//
// Add this line near the other game values:
//   let bestScore = Number(localStorage.getItem("hungry-frog-best")) || 0;
//
// In plain language:
// - getItem reads the saved value.
// - Number changes saved text into a number.
// - || 0 means "use zero if nothing has been saved yet".
//
// On the next line, put the bestScore number on the page:
//   bestElement.textContent = bestScore;
//
// TEST: Refresh the page. The Best number should be 0 the first time. Later,
// after a game, it should show the saved best.

//////////////////////////// STEP 4: SHOW THE WELCOME SCREEN //////////////////
// Add these two lines near the bottom of script.js (not inside a function):
//   welcomeScreen.hidden = false;
//   endScreen.hidden = true;
//
// These lines make sure the welcome screen is visible and the end screen is
// hidden when the page first opens.
//
// Next, make a startGame function. Type this shape, then fill in the blank:
//
//   function startGame() {
//     gameState = "playing";
//     score = 0;
//     secondsLeft = 30;
//     // Put the updated score and time on the page here.
//     welcomeScreen.hidden = true;
//     endScreen.hidden = true;
//     startTimer();
//   }
//
// To update a number on the page, set the element's textContent, for example:
//   scoreElement.textContent = score;
// Add a similar line for the timer element.
//
// Now make the start button call startGame when clicked. Add this line outside
// the function:
//   startButton.addEventListener("click", startGame);
//
// "click" is the event to wait for. startGame is the function to run.
// Do not write startGame() here: the parentheses would run it immediately.
//
// TEST: Refresh. The welcome screen should show. Click the button; the welcome
// screen should hide and the score and timer should reset.

//////////////////////////// STEP 5: MAKE ONE FLY /////////////////////////////
// We want one reusable function to make a single fly. Then the game can use
// the same instructions for the first flies and for replacement flies.
//
// Type this function shape in script.js and fill each TODO:
//
//   function createFly() {
//     const fly = document.createElement("img");
//     fly.src = "images/fly.svg";
//     fly.alt = "Fly";
//     fly.classList.add("fly");
//     // Add the fly inside the pond here.
//     // Make this fly respond to clicks here; call handleFlyClick.
//     return fly;
//   }
//
// Hints:
// - To add an element inside another element, use:
//     pond.appendChild(fly);
// - To listen for a click on this fly, use:
//     fly.addEventListener("click", handleFlyClick);
// - A function can be named before you write it. You will create
//   handleFlyClick in Step 7.
//
// TEST: Temporarily call createFly() once on its own line. Refresh and check
// that one fly appears. Remove that temporary call; the game will create flies
// at the correct time in the next steps.

//////////////////////////// STEP 6: CREATE THE STARTING FLIES ////////////////
// Add a function called createStartingFlies. Inside its curly braces, use a
// for loop to call createFly 10 times.
//
// A for loop repeats code. Copy this pattern and fill the three blanks:
//
//   for (let number = 0; number < ___; number = number + 1) {
//     ______________________;
//   }
//
// The first blank is how many times to repeat. The second blank is the
// function call that makes one fly. The loop starts counting at 0 and stops
// before it reaches the first blank, so 10 makes ten flies.
//
// Add a call to createStartingFlies() inside startGame, after the screens are
// hidden. This makes a fresh group of flies each time the player starts.
//
// TEST: Start a game and count the flies. If they appear in one pile, check
// that your fly CSS positions them. If they cannot be clicked, check that
// their animation does not move them outside the pond.

//////////////////////////// STEP 7: CATCH A FLY //////////////////////////////
// A click listener receives an event. The event tells us which fly was clicked.
// Add this function:
//
//   function handleFlyClick(event) {
//     if (gameState !== "playing") {
//       return;
//     }
//
//     const clickedFly = event.currentTarget;
//     // Remove clickedFly from the page here.
//     incrementScore();
//     showPlusOne();
//     createFly();
//     createFly();
//   }
//
// Fill the removal line with:
//   clickedFly.remove();
//
// event.currentTarget means "the element this click listener belongs to".
// remove() takes that fly out of the page. We do not need a separate list of
// numbers to find the fly.
//
// The if statement checks the game state. return means "stop this function
// now". This stops clicks from changing the score after the game ends.
//
// Each caught fly is replaced with two new flies, so the number of flies
// slowly grows. The two createFly() calls work because the click listener is
// attached inside createFly; replacement flies will also be clickable.
//
// TEST: Start a game and click one fly. Only that fly should disappear, the
// score should go up, and two new flies should appear.

//////////////////////////// STEP 8: INCREASE THE SCORE //////////////////////
// Write this function outside the other functions:
//
//   function incrementScore() {
//     score = score + 1;
//     scoreElement.textContent = score;
//   }
//
// score = score + 1 means "take the old score, add one, and save the new
// value". scoreElement.textContent changes the number shown on the page.
//
// TEST: Start a game and catch a fly. The page should show 1, then 2 after the
// next fly. The score variable and the number on the page should match.

//////////////////////////// STEP 9: SHOW A QUICK +1 //////////////////////////
// This little message is decoration; it is not the score itself.
// Create the function below, filling in each TODO:
//
//   function showPlusOne() {
//     const message = document.createElement("span");
//     message.textContent = "+1";
//     message.classList.add("plus-one");
//     // Add message inside the pond here.
//     // Remove message after a short delay here.
//   }
//
// Hints:
// - Add it inside the pond with pond.appendChild(message).
// - setTimeout runs a function once after a delay:
//     setTimeout(function () {
//       message.remove();
//     }, 700);
//   700 is a delay in milliseconds (700 milliseconds is 0.7 seconds).
// - Add a .plus-one rule in styles.css if you want to position and animate it.
//
// TEST: Catch a fly. The +1 should appear briefly and then disappear.

//////////////////////////// STEP 10: RUN THE COUNTDOWN ///////////////////////
// Make a function named startTimer. It should run one small piece of code every
// second. setInterval returns an ID; save that ID in timerId so we can stop it.
//
// Start with this shape:
//
//   function startTimer() {
//     timerId = setInterval(function () {
//       secondsLeft = secondsLeft - 1;
//       timerElement.textContent = secondsLeft;
//       // If secondsLeft is zero, call endGame().
//     }, 1000);
//   }
//
// 1000 milliseconds equals one second. Inside the interval, add an if
// statement that checks whether secondsLeft is 0. If it is, call endGame().
//
// TEST: Start a game and watch the timer. It should show 30, 29, 28, and so on.
// For a quick test, you can temporarily use 5 instead of 30, then change it
// back to 30 before finishing.

//////////////////////////// STEP 11: END THE GAME ////////////////////////////
// When the timer reaches zero, the game needs to stop accepting catches, stop
// the timer, save a new best score if needed, and show the final message.
//
// Add a function named endGame. Follow these steps inside its curly braces:
// 1. If gameState is not "playing", return. This prevents the function from
//    finishing the game more than once.
// 2. Set gameState to "finished".
// 3. Stop the interval by writing clearInterval(timerId).
// 4. If score is greater than bestScore, set bestScore to score and save it:
//      localStorage.setItem("hungry-frog-best", String(bestScore));
//    String changes the number to text because localStorage stores text.
// 5. Update the Best number on the page.
// 6. Put a message showing score and bestScore in finalMessage.textContent.
//    Example message: "Time's up! You caught 12 flies. Best: 12."
// 7. Set endScreen.hidden to false so the final message appears.
//
// Update the best-score display every time endGame runs, whether or not a new
// record was made.
//
// TEST: Let the timer reach zero. The timer should stop, the end screen should
// appear, and clicking any remaining flies should not change the score.

//////////////////////////// STEP 12: PLAY AGAIN //////////////////////////////
// Make the Play again button start another game:
//   playAgainButton.addEventListener("click", startGame);
//
// Before creating the new starting flies, remove the old flies. One way is to
// find all elements with the "fly" class inside the pond and remove them in a
// loop. Do not remove the score, timer, or other pond elements by mistake.
//
// TEST: Finish one game and press Play again. The score should return to zero,
// the timer should return to 30, a fresh group of flies should appear, and the
// old timer must not keep running.

//////////////////////////// ABOUT THE FROG'S TONGUE //////////////////////////
// First, make the game work with click-to-catch: clicking a fly means the frog
// caught it. This is a complete simple game mechanic.
//
// A tongue animation is a separate improvement. To draw it, the HTML needs a
// tongue element and a frog element, and the CSS needs to style and animate
// them. JavaScript can measure where the frog and clicked fly are, but making
// the tongue physically collide with a moving fly is more advanced than
// responding to a click. Add the animation after the timer and scoring work.
//
// FINAL CHECKLIST
// [ ] Welcome screen appears when the page opens.
// [ ] Best score is loaded and survives refreshing the page.
// [ ] Start begins one 30-second countdown.
// [ ] Clicking a fly removes it, adds one point, and creates two flies.
// [ ] New flies can also be clicked.
// [ ] The game stops at zero and shows the final score and best score.
// [ ] Clicks after time runs out do not change the game.
// [ ] Play again resets the game without creating a second timer.
