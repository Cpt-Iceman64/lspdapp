// Sélection des éléments
const statusIndicator = document.getElementById("status");
const btnStartService = document.getElementById("btnStartService");
const btnEndService = document.getElementById("btnEndService");
const agentStatus = document.getElementById("agentStatus");
const serviceDuration = document.getElementById("serviceDuration");
const reportsCount = document.getElementById("reportsCount");

let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Fonction pour démarrer le service
function startService() {
    statusIndicator.textContent = "En service";
    statusIndicator.style.color = "green";
    btnStartService.classList.remove("btn-primary");
    btnStartService.classList.add("btn-success");
    agentStatus.textContent = "En service";
    startTimer();
}

// Fonction pour arrêter le service
function endService() {
    statusIndicator.textContent = "Hors service";
    statusIndicator.style.color = "red";
    btnEndService.classList.remove("btn-danger");
    btnEndService.classList.add("btn-secondary");
    agentStatus.textContent = "Hors service";
    stopTimer();
}

// Gestion du timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        serviceDuration.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Event Listeners
btnStartService.addEventListener("click", startService);
btnEndService.addEventListener("click", endService);
