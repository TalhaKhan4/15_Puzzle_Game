(function () {
  // *** HTML Elements ***

  const boxElementsArr = Array.from(document.querySelectorAll(".box"));

  // *** Variables ***

  const gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const gameRowLength = Math.sqrt(gameArr.length);

  // *** Functions ***

  // This function checks if the gameArr is solvable or not
  function isSolvable(gameArr) {
    // Count the number of inversions
    let inversions = 0;

    for (let i = 0; i < gameArr.length; i++) {
      for (let j = i + 1; j < gameArr.length; j++) {
        if (gameArr[j] && gameArr[i] && gameArr[i] > gameArr[j]) {
          inversions++;
        }
      }
    }

    // Find the row with the blank tile

    let row = 0;
    for (let i = 0; i < gameArr.length; i++) {
      if (gameArr[i] == 0) {
        row = Math.floor(i / gameRowLength);
      }
    }

    // Check if the gameArr is solvable

    if (gameRowLength % 2 == 1) {
      return inversions % 2 == 0;
    } else {
      return row % 2 == 0 ? inversions % 2 == 1 : inversions % 2 == 0;
    }
  }

  // This function randomly sorts array
  function sortArrRandomly(arr) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });

    return arr;
  }

  // This function swap numbers (0 and other number) in array as well as on the screen
  // This function is called from onBoxClick function
  function swapNumbers(index1, index2) {
    //   swaping numbers in array
    const [a, b] = [gameArr[index1], gameArr[index2]];
    gameArr[index1] = b;
    gameArr[index2] = a;
    //   swapping numbers on screen
    boxElementsArr[index2].innerHTML = boxElementsArr[index1].innerHTML;
    boxElementsArr[index1].innerHTML = "";
  }

  // This function checks if the puzzle has been solved or not
  function isSolved() {
    for (let i = 0; i < gameArr.length - 1; i++) {
      if (gameArr[i] !== i + 1) return false;
    }

    return true;
  }

  // This function gives green color to sorted boxes and tomato to unsorted boxes
  function colorSortedBoxes() {
    for (let i = 0; i < gameArr.length; i++) {
      if (gameArr[i] === i + 1 && gameArr[i] !== 0) {
        boxElementsArr[i].firstElementChild.style.backgroundColor = "#1b512d";
      } else if (boxElementsArr[i].firstElementChild !== null) {
        boxElementsArr[i].firstElementChild.style.backgroundColor = "#ff6347";
      }
    }
  }

  // This function is called when a user clicks on box or a keyboard key
  function onBoxClick(e) {
    // i is the index of the clicked box or simply the box that the user wants to move (because when using keyboard, user does not clicks on the box)

    let i;
    const key = e.key;

    // finding the value of i
    if (key === undefined) {
      i = boxElementsArr.indexOf(this);
    } else if (key === "ArrowRight") {
      i = gameArr.indexOf(0) - 1;
    } else if (key === "ArrowLeft") {
      i = gameArr.indexOf(0) + 1;
    } else if (key === "ArrowUp") {
      i = gameArr.indexOf(0) + gameRowLength;
    } else if (key === "ArrowDown") {
      i = gameArr.indexOf(0) - gameRowLength;
    }
    else {
      return;
    }

    // checking if the number can be swaped with the number to its right
    if (gameArr[i + 1] === 0 && (i + 1) % gameRowLength !== 0) {
      swapNumbers(i, i + 1);
    }
    // checking if the number can swaped with the number to its left
    else if (gameArr[i - 1] === 0 && i % gameRowLength !== 0) {
      swapNumbers(i, i - 1);
    }
    // checking if the number can swaped with the number on its top
    else if (gameArr[i - gameRowLength] === 0 && i < gameArr.length) {
      swapNumbers(i, i - gameRowLength);
    }
    // checking if the number can swaped with the number to its bottom
    else if (gameArr[i + gameRowLength] === 0 && i >= 0) {
      swapNumbers(i, i + gameRowLength);
    }

    colorSortedBoxes();

    if (isSolved()) {
      setTimeout(function () {
        alert("You have solved the puzzle!");
      }, 0.3 * 1000);

      /* 
      // removing click event listener from all the boxes
      boxElementsArr.forEach(function (box) {
        box.removeEventListener("click", onBoxClick);
      });
      // removing event listener for keyboard
      document.removeEventListener("keydown", onBoxClick);
      */
    }
  }

  // *** Event Listeners ***

  window.addEventListener("load", function () {
    // sorting gameArr randomly and checking if it is solvable or not
    // If not solvable then sorting it again
    do {
      sortArrRandomly(gameArr);
    } while (!isSolvable(gameArr));

    //   Displaying gameArr on screen
    gameArr.forEach(function (number, index) {
      if (number !== 0) {
        boxElementsArr[index].innerHTML = `<div class="number">
          <span>${number}</span>
      </div>`;
      }
    });

    colorSortedBoxes();
  });

  // click event listener on all the boxes
  boxElementsArr.forEach(function (box) {
    box.addEventListener("click", onBoxClick);
  });

  // event listener for keyboard keys
  document.addEventListener("keydown", onBoxClick);
})();
