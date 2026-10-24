//The first part of the script is always 'taking control' of the DOM elements.
//write code inside the empty lines.
//take control over the div game-container using getElementById:

//take control over    <p>Flies <span id="score">0</span></p>:

//take control over    <p>Time <span id="timer">30</span></p>:

//take control over    <p>Best <span id="best">0</span></p>:

//take control over the frog image

//take control over the tongue div
//Use these variable names in the code below so the names match:
//const gameContainer = document.getElementById("game-container");
//const pond = document.getElementById("pond");
//const scoreElement = document.getElementById("score");
//const timerElement = document.getElementById("timer");
//const bestElement = document.getElementById("best");
//Use these same names for the other elements:
//welcomeMessage, startButton, finalMessage, and playAgainButton.

//We also need a welcome message with a start button, and a final message with
//a play again button. Add them to the HTML and give them ids:
//welcome-message, start-button, final-message, and play-again-button.
//Then take control of these elements here using getElementById:

//We need a way to remember if the game is waiting to start, playing, or finished.
//Add these variables here. We use let because their values will change:
//let gameState = "welcome";
//let score = 0;
//let timeLeft = 30;
//let timerId = null;
//let nextFlyId = 11; (the first 10 flies use numbers 1 to 10)

//The best score should stay saved when the page is refreshed.
//Use localStorage to get the saved best score. localStorage saves text,
//so use Number() to change it into a number. If there is no saved score yet,
//start from 0:
//let bestScore = Number(localStorage.getItem("hungry-frog-best")) || 0;
//Now show bestScore inside the best score span using textContent.

////////////////////////////FLIES!////////////////////////////////////////////////////////l/l/l/l//////////////////////////////////////////////////////////////////
//Now we want to create 10 flies on the screen, how can we create a data type to store 10
//things in it?
//Create a const array with 10 unique numbers in it. Name it fliesArray:

//Console.log the fliesArray and open the website with VsCode Live, check the console and see
//what it shows. Looks good? Do you see the array there?

//Nice!
//Now let's actually show the 10 flies on the screen! For that we need to create a loop
//over the fliesArray. Inside the loop let's put call the function renderTheFlies()
//Important: renderTheFlies() should create and show ONE fly. Call it once for
//each number in fliesArray. If you call a function that draws every fly from
//the array inside this loop, you will draw the same flies many times.
//Give renderTheFlies the number for the fly it should create. For example, if
//the loop variable is number, call renderTheFlies(number).

//Let's not actually write the renderTheFlies() function, what it should do:

// 1. for each number in the array create an html element 'img' and save it into a const. We can name it 'fly'.

// 2. Then adds a class to this element.

// Now add the src to the fly element, this is our image of the fly: images/fly.svg.
// Google how to add src to some an element using JS and DOM manipulation.
//Give the fly an id using its number, for example "fly-1". This lets us know
//which number in fliesArray belongs to this image.
//Use the number given to renderTheFlies() to make this id. For example:
//fly.id = "fly-" + number;

//Finally we need to add the img element inside the div game-container using appendChild
//Add the fly to the pond (the area where the flies should appear), not the
//whole game-container. The stats should stay outside the pond.

//Each time you create a fly, add a click event listener to that fly.
//Inside the listener, call the function that handles catching a fly and give
//it the fly that was clicked. This is important: new flies need their own
//click listener too.
//Write this line after you create the fly:
//fly.addEventListener("click", function () {
//  handleFlyClick(fly);
//});
//The word fly here means the image made by this function. This lets the click
//handler know which image to remove.

//Great! Now let's test the code, do you see flies on the screen? If not, check the console for errors and ask AI
////////////////////////////FROG////////////////////////////////////////////////////l/l/l/l////////////////////////////////////////////////////////////////////////////////
//to start with the frog we need to add the frog to HTML and add class and id to it, and
//style it's position with CSS. Also add a div that has the same position as the frog, but
//it has a z-index of -1 so it should hide behind the frog and be short, it will be the tongue.
//Now to the JavaScript part!
//What do we want to do here?
//If the user clicks on the fly, the frog sticks its tongue and the tongue div becomes
//the length of the distance between the frog and the fly you clicked.
//the tongue should return back and hide again
//let's create a function which will be 'called' when you click on the fly,
//function showTongue() {} should change the length and the z-index of the tongue div
//we can do this by adding a css animation maybe and applying the style.
//the length of the div, how do we calculate it?? Use AI or Google it, I don't know
//For the first version, the player can catch a fly just by clicking it.
//The tongue animation can be added after the score and timer work.
//A real tongue touching a moving fly is a harder feature called collision
//detection, so we do not need to solve that to make the first game work.

////////////////ADD +1 TO THE SCORE////////////////////////////////////////////////////l/l/l/l//////////////////////////////////////////////////////////////////
//write a function that takes a parameter of number and adds +1 to that number
//call it incriminateTheScore(){}
//The score needs to be shared by all the functions, so create it once near the
//top of this file. Inside this function, increase score by 1 and update the
//score span's textContent so the new number appears on the page.

/////A function that makes the fly disappear on the screen////////////////////////////////////////////////////////////////////////////////////////////////
//Let's create a function called removeTheFly(){}

//Inside the function we need to use removeChild to remove the fly html element from the DOM
//Give this function the fly that was clicked as its input (parameter), so it
//knows which image to remove. You can remove it with fly.remove().

//Also let's remove this fly from the array using the array method called 'splice' (check MDN docs for more info)
//Find the clicked fly's number in fliesArray first. splice needs the position
//(index) of the number in the array, not the fly's number itself.

/////A function that adds 2 new flies if you caught one//////////////////////////////////////////////////////////////////////////////////
//let's write a function addsMoreFlies(){}

//Inside the function let's add two new unique numbers to fliesArray using
//array.push method. Do not use "any numbers": duplicate numbers could give two
//flies the same id. Use nextFlyId to make a new number, then increase it so
//the next fly gets a different number.

//Now our array was 10 numbers, we got rid of one fly and added 2 more, so we have 11 numbers in the array.

//Now call renderTheFlies() for each of the two new numbers only. If you draw
//all the numbers again, the old flies will be duplicated on the screen.

//////////////////////////////show +1 on the screen///////////////////////////////////////////////////////////////////////
//let's create a function renderPlusOne(){}

//use document.createElement and create a new span

//add the textContent to the span, the text is "+1"

//using appendChild add the span inside the game-container

//add the class to the span, for example .plus-one-span

//add this class yourself to CSS and style the text so it has the same position as the fly inside. Use AI for this, I don't know how to do it.
//Remove the +1 span after a short time so it does not stay on the screen.
//Hint: setTimeout runs some code once after a delay. The delay is in milliseconds.

////////////////////////////Click on the fly Event listener////////////////////////////////////////////////////l/l/l/l////////////////////////
//Create an event listener with the action "click" on each fly when you create it.
//The event listener should call a function called handleFlyClick() and give
//that function the fly that was clicked.

//What should happen when you click on the fly?
//1. The tongue div changes length (showTongue() {})
//2. The fly that was clicked disappears removeTheFly(){}
//3. The function to add the score is called (incriminateTheScore(){})
//4. The 2 new flies get added to the screen. (addsMoreFlies(){})
//5. The +1 message appears (renderPlusOne(){})

//Make a function called handleFlyClick(fly). The word fly inside the
//parentheses is a parameter: it receives the image that was clicked.
//At the beginning, check if the game
//is playing. If it is not, stop the function with return. This prevents clicks
//from changing the score after the timer ends.
//Inside the function, call the steps above in order. Give the clicked fly to
//removeTheFly() so it removes the correct one.

////////////////////////////WELCOME AND START THE GAME/////////////////////////
//When the page first opens, show the welcome message and hide the final message.
//Add a click event listener to the start button. When it is clicked, call a
//function called startGame().

//Inside startGame():
//1. Change gameState to "playing".
//2. Set score back to 0 and timeLeft back to 30.
//3. Show 0 in the score span and 30 in the timer span.
//4. Hide the welcome message and final message.
//5. Show the starting flies.
//6. Start the timer by calling startTimer().

////////////////////////////THE TIMER//////////////////////////////////////////
//Create a function called startTimer().
//Use setInterval to run some code once every 1000 milliseconds (one second).
//Save the result from setInterval in timerId. We need timerId later to stop it.
//Each second:
//1. Subtract 1 from timeLeft.
//2. Show timeLeft in the timer span.
//3. If timeLeft is 0, call endGame().

////////////////////////////THE FINAL MESSAGE//////////////////////////////////
//Create a function called endGame().
//First check that gameState is "playing". If it is not, use return to stop.
//Then:
//1. Change gameState to "finished".
//2. Stop the timer using clearInterval(timerId).
//3. If score is bigger than bestScore, save the new best:
//   bestScore = score;
//   localStorage.setItem("hungry-frog-best", String(bestScore));
//4. Show bestScore in the best score span.
//5. Put a message with the score and best score inside final-message.
//6. Show the final message.
//
//Add a click event listener to the play again button. It should call startGame().
//Before showing new flies, remove the old flies so they do not pile up.
//Then reset fliesArray to the starting numbers and set nextFlyId back to 11.
//When adding more flies during the game, add nextFlyId to the array, call
//renderTheFlies(nextFlyId), and then increase nextFlyId by 1. Do this twice.

////////////////////////////CHECK YOUR GAME////////////////////////////////////
//1. Refresh the page. The welcome message should appear.
//2. Start the game. The timer should count down from 30.
//3. Click a fly. It should disappear, the score should go up by one, and two
//   new flies should appear.
//4. Wait for time to reach 0. The timer should stop and the final message
//   should show your score and best score.
//5. Refresh the page. The best score should still be saved.
//6. Click Play again. The score and timer should reset and there should only
//   be one timer running.
