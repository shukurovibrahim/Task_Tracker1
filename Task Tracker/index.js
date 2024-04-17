// Defining html element to JavaScript
const listContainer = document.querySelector(".list-container");
const inputBox = document.querySelector(".input-box");
const inputElement = inputBox.querySelector("#input-text");
const eraseInputBtn = inputBox.querySelector(".erase-button");
const xCircle = inputBox.querySelector(".erase");
const addElement = document.querySelector(".add");
const plusElement = document.querySelector(".plus");
const iconArrow = document.querySelector(".icon-image");

// addEventlistener for changing img of icon in hover and click cases
let isFirstImage = true;

iconArrow.addEventListener("click", toggleImage);
iconArrow.addEventListener("mouseover", hoverIn);
iconArrow.addEventListener("mouseout", hoverOut);

function toggleImage() {
    if (isFirstImage) {
        iconArrow.src = "./images/grey-up.svg";  // for sorting list items that we get from input in ascending
        sortListItems("asc");
        isFirstImage = false;
    } else {
        iconArrow.src = "./images/grey-down.svg"; // for sorting list items that we get from input in descending
        sortListItems("desc");
        isFirstImage = true;
    }
}

// When mouse on the icon it turns into black copy of the img
function hoverIn() {
    if (isFirstImage) {
        iconArrow.src = "./images/black-down.svg";
    } else {
        iconArrow.src = "./images/black-up.svg";
    }
}

// When we move mouse away it turns back to its original color
function hoverOut() {
    if (isFirstImage) {
        iconArrow.src = "./images/grey-down.svg";
    } else {
        iconArrow.src = "./images/grey-up.svg";
    }
}

// Creating function in order to sort element by comparing if direction equal to "asc" or not and return 
function sortListItems(direction) {
  const listItems = Array.from(listContainer.querySelectorAll(".list-item"));

  listItems.sort((a, b) => {
      const textA = a.querySelector("span").textContent.toLowerCase();
      const textB = b.querySelector("span").textContent.toLowerCase();
      
      if (direction === "asc") {
          if (textA < textB) return -1;
          if (textA > textB) return 1;
          return 0;
      } else {
          if (textA > textB) return -1;
          if (textA < textB) return 1;
          return 0;
      }
  });

  // Remove existing list items
  while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
  }

  // Append sorted list items
  listItems.forEach(item => listContainer.appendChild(item));
}

// Mouse hover effect for button that clears text both from input and list items
const circleHoverEffect = (img) => {
  img.addEventListener("mouseenter", () => {
    img.src = "./images/purple.svg";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "./images/white.svg";
  });
};

circleHoverEffect(xCircle);

// Creating createListItem in order to add new classes and elements to our document with js
const createListItem = (text) => {
  const rootDiv = document.createElement("div");
  rootDiv.classList.add("list-item");
  listContainer.appendChild(rootDiv);

  const span = document.createElement("span");
  span.textContent = text;
  rootDiv.appendChild(span);

  const button = document.createElement("button");
  button.classList.add("erase-list-item");
  rootDiv.appendChild(button);

  const img = document.createElement("img");
  img.src = "./images/white.svg";
  button.appendChild(img);
  circleHoverEffect(img);

  button.addEventListener("click", () => {
    rootDiv.remove();

    if (listContainer.children.length === 0) {
      listContainer.classList.add("hidden");
      inputBox.classList.remove("hidden");
    }
  });
};

// Array for containing our list item in order to sort them after that
const arr = [];

// Button for saving our inputs and making list of them
addElement.addEventListener("click", () => {
  const content = inputElement.value;
  if (content !== "") {
    inputBox.classList.add("hidden");
    createListItem(content);
    listContainer.classList.remove("hidden");
    inputElement.value = "";
    arr.push(content);
    console.log(arr);
  } else {
    inputElement.focus();
  }
});

// Clearing text in input box that we typed
eraseInputBtn.addEventListener("click", () => {
  inputElement.value = "";
  inputElement.focus();
});

// Creating button to add new list item and we call hidden input box to do process again
plusElement.addEventListener("click", () => {
  inputBox.classList.remove("hidden");
  inputElement.focus();
});