const listContainer = document.querySelector(".list-container");
const inputBox = document.querySelector(".input-box");
const inputElement = inputBox.querySelector("#input-text");
const eraseInputBtn = inputBox.querySelector(".erase-button");
const xCircle = inputBox.querySelector(".erase");
const addElement = document.querySelector(".add");
const plusElement = document.querySelector(".plus");
const iconArrow = document.querySelector(".icon-image");

let isFirstImage = true;

iconArrow.addEventListener("click", toggleImage);
iconArrow.addEventListener("mouseover", hoverIn);
iconArrow.addEventListener("mouseout", hoverOut);

function toggleImage() {
    if (isFirstImage) {
        iconArrow.src = "./images/grey-up.svg";
        sortListItems("asc");
        isFirstImage = false;
    } else {
        iconArrow.src = "./images/grey-down.svg";
        sortListItems("desc");
        isFirstImage = true;
    }
}

function hoverIn() {
    if (isFirstImage) {
        iconArrow.src = "./images/black-down.svg";
    } else {
        iconArrow.src = "./images/black-up.svg";
    }
}

function hoverOut() {
    if (isFirstImage) {
        iconArrow.src = "./images/grey-down.svg";
    } else {
        iconArrow.src = "./images/grey-up.svg";
    }
}

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

const circleHoverEffect = (img) => {
  img.addEventListener("mouseenter", () => {
    img.src = "./images/purple.svg";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "./images/white.svg";
  });
};

circleHoverEffect(xCircle);

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

const arr = [];

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

eraseInputBtn.addEventListener("click", () => {
  inputElement.value = "";
  inputElement.focus();
});

plusElement.addEventListener("click", () => {
  inputBox.classList.remove("hidden");
  inputElement.focus();
});