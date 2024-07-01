let points = 0;
let multiplier = 1;
let rebirthMultiplier = 1;
let ultraRebirthMultiplier = 1;
let runeCount = 0;
let runeBoost = 1;

const pointsButton = document.getElementById("pointsButton");
const clickButton = document.getElementById("clickButton");
const multipliersTab = document.getElementById("multipliersTab");
const rebirthsTab = document.getElementById("rebirthsTab");
const ultraRebirthsTab = document.getElementById("ultraRebirthsTab");
const runesTab = document.getElementById("runesTab");
const runeCountElement = document.getElementById("runeCount");
const runeInventory = document.getElementById("runeInventory");
const progressBar = document.getElementById("progress-bar");

function updatePoints() {
  pointsButton.textContent = points;
  updateProgressBar();
}

function updateProgressBar() {
  const progress = Math.min((points / (points + 1)) * 100, 100);
  progressBar.style.width = progress + "%";
}

function click() {
  points += multiplier * rebirthMultiplier * ultraRebirthMultiplier * runeBoost;
  updatePoints();
}

clickButton.addEventListener("click", click);

document.querySelectorAll(".navbar-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".navbar-button")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    document
      .querySelectorAll(".tab")
      .forEach((tab) => tab.classList.remove("active"));
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

document.querySelectorAll(".multiplier").forEach((button) => {
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost, 10);
    const newMultiplier = parseInt(button.dataset.multiplier, 10);
    if (points >= cost) {
      points -= cost;
      multiplier = newMultiplier;
      updatePoints();
    }
  });
});

document.querySelectorAll(".rebirth").forEach((button) => {
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost, 10);
    if (points >= cost) {
      points -= cost;
      rebirthMultiplier = parseInt(button.textContent.split("x")[1], 10);
      updatePoints();
    }
  });
});

document.querySelectorAll(".ultra-rebirth").forEach((button) => {
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost, 10);
    if (points >= cost) {
      points -= cost;
      ultraRebirthMultiplier = parseInt(button.textContent.split("x")[1], 10);
      updatePoints();
    }
  });
});

document.getElementById("drawRune").addEventListener("click", () => {
  const drawCost = 10000;
  if (points >= drawCost) {
    points -= drawCost;
    runeCount++;
    updatePoints();
    runeCountElement.textContent = runeCount;

    const rune = drawRune();
    runeBoost *= rune.boost;

    // Clear previous rune display
    while (runeInventory.firstChild) {
      runeInventory.removeChild(runeInventory.firstChild);
    }

    const runeElement = document.createElement("div");
    runeElement.className = "rune";
    runeElement.textContent = `${rune.name} Rune (+${(
      rune.boost * 100 -
      100
    ).toFixed(2)}% Boost)`;
    runeInventory.appendChild(runeElement);
  }
});

function drawRune() {
  const runes = [
    { name: "Common", boost: 1.05, chance: 50 },
    { name: "Uncommon", boost: 1.1, chance: 30 },
    { name: "Rare", boost: 1.15, chance: 15 },
    { name: "Epic", boost: 1.2, chance: 4 },
    { name: "Legendary", boost: 1.25, chance: 1 },
  ];

  const random = Math.random() * 100;
  let cumulativeChance = 0;
  for (const rune of runes) {
    cumulativeChance += rune.chance;
    if (random < cumulativeChance) {
      return rune;
    }
  }
  return runes[0]; // Default to Common if something goes wrong
}

function formatNumber(number) {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}

function updateButtons() {
  document.querySelectorAll(".multiplier").forEach((button) => {
    button.innerHTML = `Multiplier x${
      button.dataset.multiplier
    } (Cost: ${formatNumber(button.dataset.cost)} points)`;
  });

  document.querySelectorAll(".rebirth").forEach((button) => {
    button.innerHTML = `Rebirth (Cost: ${formatNumber(
      button.dataset.cost
    )} points) - Multiplier x${button.textContent.split("x")[1]}`;
  });

  document.querySelectorAll(".ultra-rebirth").forEach((button) => {
    button.innerHTML = `Ultra Rebirth (Cost: ${formatNumber(
      button.dataset.cost
    )} points) - Multiplier x${button.textContent.split("x")[1]}`;
  });
}

updateButtons();
updatePoints();
updateProgressBar();
