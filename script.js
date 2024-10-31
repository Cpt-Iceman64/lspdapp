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

document.addEventListener("DOMContentLoaded", function () {
    const prendreServiceBtn = document.getElementById("prendreService");
    const finServiceBtn = document.getElementById("finService");

    // Initialisation des couleurs de boutons
    prendreServiceBtn.style.backgroundColor = "#4CAF50"; // Vert pour Prendre le service
    finServiceBtn.style.backgroundColor = "#f44336"; // Rouge pour Fin de service (par défaut hors service)

    // Fonction pour Prendre le service
    prendreServiceBtn.addEventListener("click", function () {
        prendreServiceBtn.style.backgroundColor = "#4CAF50"; // Vert
        finServiceBtn.style.backgroundColor = "#f44336"; // Rouge
        // Code à exécuter pour "Prendre le service"
        console.log("Service pris");
    });

    // Fonction pour Fin de service
    finServiceBtn.addEventListener("click", function () {
        prendreServiceBtn.style.backgroundColor = "#4285F4"; // Bleu
        finServiceBtn.style.backgroundColor = "#f44336"; // Rouge
        // Code à exécuter pour "Fin de service"
        console.log("Service terminé");
    });
});

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
