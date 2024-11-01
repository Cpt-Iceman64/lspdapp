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

// Fonction pour récupérer les informations de l'utilisateur Discord
async function getUserInfo(token) {
    try {
        const response = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const userData = await response.json();
        if (userData.avatar) {
            const avatarURL = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            displayUserProfile(userData.username, avatarURL);
        } else {
            displayUserProfile(userData.username, "default-avatar.png"); // Image par défaut si pas d'avatar
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
    }
}

// Fonction pour afficher le profil de l'utilisateur
function displayUserProfile(username, avatarURL) {
    const welcomeContainer = document.querySelector(".welcome-container");
    welcomeContainer.innerHTML = `
        <h2>Bienvenue, ${username} !</h2>
        <img src="${avatarURL}" alt="Photo de profil" class="profile-picture">
        <p>Prêt pour le service !</p>
    `;
}

// Appel de la fonction avec le token d'accès (à adapter en fonction de ta logique)
const token = "TOKEN_D_ACCES_DISCORD"; // Remplace par le token que tu récupères à l'authentification
getUserInfo(token);


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
