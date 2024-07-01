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
  pointsButton.textContent = points.toLocaleString();
  updateProgressBar();
}

function updateProgressBar() {
  const progress = Math.min(points / 1000000, 1) * 100; // Calculate progress as a percentage
  progressBar.style.width = progress + '%';
}

clickButton.addEventListener('click', () => {
  points += multiplier * rebirthMultiplier * ultraRebirthMultiplier * runeBoost;
  updatePoints();
});

document.querySelectorAll('.navbar-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.navbar-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.getAttribute('data-tab')).classList.add('active');
  });
});

document.querySelectorAll('.multiplier').forEach(button => {
  button.addEventListener('click', () => {
    const cost = parseInt(button.getAttribute('data-cost'));
    const value = parseInt(button.getAttribute('data-multiplier'));
    if (points >= cost) {
      points -= cost;
      multiplier *= value;
      updatePoints();
    }
  });
});

document.querySelectorAll('.rebirth').forEach(button => {
  button.addEventListener('click', () => {
    const cost = parseInt(button.getAttribute('data-cost'));
    if (points >= cost) {
      points -= cost;
      rebirthMultiplier *= parseInt(button.textContent.match(/Multiplier x(\d+)/)[1]);
      updatePoints();
    }
  });
});

document.querySelectorAll('.ultra-rebirth').forEach(button => {
  button.addEventListener('click', () => {
    const cost = parseInt(button.getAttribute('data-cost'));
    if (points >= cost) {
      points -= cost;
      ultraRebirthMultiplier *= parseInt(button.textContent.match(/Multiplier x(\d+)/)[1]);
      updatePoints();
    }
  });
});

document.getElementById('drawRune').addEventListener('click', () => {
  if (points >= 10000) {
    points -= 10000;
    runeCount++;
    runeBoost *= 1.1; // Adjust rune boost as needed
    runeCountElement.textContent = runeCount;
    updatePoints();
    const runeElement = document.createElement('div');
    runeElement.classList.add('rune');
    runeElement.textContent = `Rune ${runeCount} - Boost x${(runeBoost).toFixed(2)}`;
    runeInventory.appendChild(runeElement);
  }
});

updatePoints();