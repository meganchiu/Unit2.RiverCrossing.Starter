// === State ===
const state = {
  start: ["sheep"],
  river: [],
  target: [],
};

const maxSheep = 10;

/** Moves a sheep from start to river */
function moveSheepStartToRiver() {
  const sheep = state.start.pop();
  state.river.push(sheep);
}

/** Moves a sheep from river to target */
function moveSheepRiverToTarget() {
  const sheep = state.river.pop();
  state.target.push(sheep);
}

// === Render ===

/** Renders sheep on the starting bank */
function renderStartSheep() {
  const startingSheep = state.start.map((sheep) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "🐑";
    li.append(button);

    button.addEventListener('click', () => {
      moveSheepStartToRiver();
      render();
    })
    return li;
  });

  const startingBank = document.querySelector("#startingBank ul");
  startingBank.replaceChildren(...startingSheep);
}
/** Renders sheep on the river */
function renderRiverSheep() {
  const riverElements = state.river.map((sheep) => {
    const riverElement = document.createElement('li');

    const button = document.createElement('button');
    button.textContent = "🐑";
    
    riverElement.append(button);

    button.addEventListener('click', () => {
      moveSheepRiverToTarget();
      render();
    });
    
    return riverElement;
  })

  const riverContent = document.querySelector('section.river ul');
  riverContent.replaceChildren(...riverElements);

  // Display text for how many sheep are in the river
  const riverSheepText = document.querySelector('#totalRiverSheep');
  riverSheepText.textContent = `The total amount of sheep moved to the river is ${state.river.length}.`
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

  // Display text for how many sheep are in the target bank
  const targetSheepText = document.querySelector('#totalTargetSheep');
  targetSheepText.textContent = `The total amount of sheep moved to the target bank is ${state.target.length}.`

  // Display message once all sheep have been moved to target bank
  if ((state.start.length == 0) && (state.river.length == 0) && (state.target.length > 0)) {
    const successTxt = document.querySelector('#successMessage');
    successTxt.textContent = 'Congratulations! All the sheep have been moved to the target bank.';
  }
}

function render() {
  renderStartSheep();
  renderRiverSheep();
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

  // Functionality for enforcing maxSheep
  console.log(`The amount of sheep in the start state BEFORE maxSheep is enforced is ${state.start.length}`)
  if (state.start.length > maxSheep) {
    alert(`The max number of sheep allowed in the starting bank is ${maxSheep}!`);
    let diff = state.start.length - maxSheep;
    for (let i=0; i<diff; i++) {
      state.start.pop();
    }
  }
  console.log(`The amount of sheep in the start state AFTER maxSheep is enforced is ${state.start.length}`)

  // Render after updating start sheep array
  render();
});