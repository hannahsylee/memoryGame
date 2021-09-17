const gameContainer = document.getElementById("game");

let hasClickedCard = false;

let firstCard = null;
let secondCard = null;

//set count = number of clicks
let count = 0;
let numberOfGames = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //count how many times event happens
  count++

  //how many times play game
  numberOfGames++

  //------------------ Code from Springboard ---------------------------------
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  //--------------------------------------------------------------------------

  //if count is less than or equal to 2 do the rest of the procedure.
  if (count<=2){
    //change the name of event.target
    let selectedCard = event.target;

    // if the same card is selected, return
    if (selectedCard.classList.contains("flipped")) return;

    // change the background color to be the color of the class it has
    let backgroundColor = selectedCard.className;
    selectedCard.style.backgroundColor = backgroundColor;

    //add class flipped to selectedCard
    selectedCard.classList.add('flipped');

    //hasClickedCard is false then,
    if (!hasClickedCard){
      // first click
      hasClickedCard = true;
      firstCard = selectedCard;
    }
    else {
      // second click
      hasClickedCard = false;
      secondCard = selectedCard;

      // do cards match?
      if (firstCard.className === secondCard.className){
        //it's a match!!
        // back to original
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);

        //bring count back to zero
        count = 0;
      }
      else {
        // not a match
        // set Timeout
        setTimeout(function(){
          console.log(firstCard);
          console.log(secondCard);
          // change background color 
          firstCard.style.backgroundColor = "";
          secondCard.style.backgroundColor = "";

          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');

          firstCard = null;
          secondCard = null;
          // bring count back to zero
          count = 0;
        }, 1000);
      }
    }
  }

  if (numberOfGames === COLORS.length) alert("game over!");

}


// when the DOM loads
createDivsForColors(shuffledColors);
