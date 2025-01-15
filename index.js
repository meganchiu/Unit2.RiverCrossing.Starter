// === State ===
const state = {
  start: ["sheep"],
  target: [],
};

/** Moves a sheep from start to target */
function moveSheep() {
  // TODO
}

// === Render ===

/** Renders sheep on the starting bank */
function renderStartSheep() {
  const startingSheep = state.start.map((sheep) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "🐑";
    li.append(button);

    // TODO: Add event listener so the sheep moves when clicked

    return li;
  });

  const startingBank = document.querySelector("#startingBank ul");
  startingBank.replaceChildren(...startingSheep);
}

/** Renders sheep on the target bank */
function renderTargetSheep() {
  const targetElements = state.target.map((sheep) => {
    const targetElement = document.createElement('li');
    targetElement.textContent = "🐑";
    return targetElement;
  })

  const targetBank = document.querySelector('#targetBank ul');
  targetBank.replaceChildren(...targetElements);
}

function render() {
  renderStartSheep();
  renderTargetSheep();
}

// === Script ===
// Initial render
render();

// TODO: Add sheep to the starting bank when the form is submitted
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  
  // Value of number of sheep user entered in textbox
  const number = document.querySelector("#numSheep");
  // console.log(number.value);

  for (let i=0; i<number.value; i++) {
    state.start.push("sheep");
  }

  // Render after updating start sheep array
  render();
});