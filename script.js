// URLs des Webhooks Discord
const webhookPriseFinService = 'https://discord.com/api/webhooks/1301524280529518602/GrQETveJvGKN4CgX-BNQuqafwTP6j2e_IaaexX3tbrG6iGobixweOc_OrTg6CwTKwNMP';
const webhookRapports = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

// Nom de l'agent
let agentName = "Iceman64"; 

// Variables pour le chronomètre
let chronoInterval;
let startTime;
let elapsedTime = 0;

/**
 * Fonction pour formater le temps en HH:MM:SS
 * @param {number} time - Temps en millisecondes
 */
function formatTime(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Fonction pour mettre à jour l'affichage du chronomètre
 */
function updateChrono() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    document.getElementById('duree').textContent = formatTime(elapsedTime);
}

/**
 * Fonction pour démarrer le chronomètre
 */
function startChrono() {
    startTime = Date.now() - elapsedTime; // Pour continuer là où on s'est arrêté
    chronoInterval = setInterval(updateChrono, 1000);
}

/**
 * Fonction pour arrêter le chronomètre
 */
function stopChrono() {
    clearInterval(chronoInterval);
}

/**
 * Fonction pour envoyer un message au webhook Discord
 * @param {string} webhookUrl - URL du webhook
 * @param {string} message - Message à envoyer
 */
function sendToDiscord(webhookUrl, message) {
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message })
    }).catch(error => console.error("Erreur de requête:", error));
}

/**
 * Fonction pour mettre à jour l'indicateur de service
 * @param {boolean} isInService - Vrai si l'agent est en service
 */
function updateStatus(isInService) {
    const statusElement = document.getElementById('etat');
    const prendreServiceBtn = document.getElementById('prendreService');
    const finServiceBtn = document.getElementById('finService');

    if (isInService) {
        // En service : texte vert, démarrage du chrono
        statusElement.textContent = "En service";
        statusElement.style.color = "#4CAF50";
        prendreServiceBtn.classList.add('service-on');
        finServiceBtn.classList.remove('service-off');
        
        // Message de prise de service
        const message = `🚓 **${agentName} est en service !**`;
        sendToDiscord(webhookPriseFinService, message);

        // Démarrage du chronomètre
        startChrono();
    } else {
        // Hors service : texte rouge, arrêt du chrono
        statusElement.textContent = "Hors service";
        statusElement.style.color = "#f44336";
        prendreServiceBtn.classList.remove('service-on');
        finServiceBtn.classList.add('service-off');
        
        // Message de fin de service
        const message = `🚓 **${agentName} est hors service.**`;
        sendToDiscord(webhookPriseFinService, message);

        // Arrêt du chronomètre
        stopChrono();
    }
}

// Écouteurs de clic pour les boutons
document.getElementById('prendreService').addEventListener('click', () => updateStatus(true));
document.getElementById('finService').addEventListener('click', () => updateStatus(false));

/**
 * Fonction pour envoyer un rapport via le webhook "Rapports"
 * @param {string} rapport - Contenu du rapport
 */
function envoyerRapport(rapport) {
    sendToDiscord(webhookRapports, rapport);
}
