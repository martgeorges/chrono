document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('stop').addEventListener('click', stopTimer);

let currentRepetition = 0;
let effortTime, restTime, repetitions;
let timeLeft = 0;
let interval = null;
let isPaused = false;

// Sons
//const effortEndSound = new Audio('effort-end.mp3'); // Son pour fin de l'effort
//const restEndSound = new Audio('rest-end.mp3'); // Son pour fin du repos
//const finishSound = new Audio('finish.mp3'); // Son pour fin complète

function startTimer() {
  if (isPaused) {
    // Si on reprend après une pause
    isPaused = false;
    return;
  }

  // Récupérer les valeurs des inputs
  effortTime = parseInt(document.getElementById('effort').value, 10);
  restTime = parseInt(document.getElementById('repos').value, 10);
  repetitions = parseInt(document.getElementById('repetitions').value, 10);

  if (effortTime > 0 && restTime > 0 && repetitions > 0) {
    currentRepetition = 0;
    startEffort();
  } else {
    alert('error : invalid data');
  }
}

function startEffort() {
  timeLeft = effortTime;
  updateChrono('green', timeLeft);

  interval = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateChrono('green', timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        startRest();
      }
    }
  }, 1000);
}

function startRest() {
  timeLeft = restTime;
  updateChrono('red', timeLeft);

  interval = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateChrono('red', timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        currentRepetition++;

        if (currentRepetition < repetitions) {
          startEffort();
        } else {
          updateChrono('', 'Terminé');
        }
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (interval) {
    isPaused = !isPaused; // Inverse l'état de pause
  }
}

function stopTimer() {
  clearInterval(interval);
  isPaused = false;
  currentRepetition = 0;
  updateChrono('', 'Arrêté');
}

function updateChrono(colorClass, text) {
  const chronoBox = document.getElementById('chrono-box');
  const chronoText = document.getElementById('chrono-text');

  chronoBox.className = `chrono-box ${colorClass}`;
  chronoText.textContent = text;
}
