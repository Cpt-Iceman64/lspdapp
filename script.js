// URL des Webhooks Discord
const webhookPriseFinService = 'https://discord.com/api/webhooks/1301524280529518602/GrQETveJvGKN4CgX-BNQuqafwTP6j2e_IaaexX3tbrG6iGobixweOc_OrTg6CwTKwNMP';
const webhookRapports = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

// Nom de l'agent, à récupérer dynamiquement si possible (ex. depuis l'authentification Discord)
let agentName = "Iceman64"; // Remplacez par le nom réel si disponible dynamiquement

/**
 * Fonction pour envoyer un message au webhook Discord spécifique
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
        // En service : texte vert
        statusElement.textContent = "En service";
        statusElement.style.color = "#4CAF50";
        prendreServiceBtn.classList.add('service-on');
        finServiceBtn.classList.remove('service-off');
        
        // Message de prise de service avec le nom de l'agent
        const message = `🚓 **${agentName} est en service !**`;
        sendToDiscord(webhookPriseFinService, message);
    } else {
        // Hors service : texte rouge
        statusElement.textContent = "Hors service";
        statusElement.style.color = "#f44336";
        prendreServiceBtn.classList.remove('service-on');
        finServiceBtn.classList.add('service-off');
        
        // Message de fin de service avec le nom de l'agent
        const message = `🚓 **${agentName} est hors service.**`;
        sendToDiscord(webhookPriseFinService, message);
    }
}

// Écouteurs de clic sur les boutons "Prendre le service" et "Fin de service"
document.getElementById('prendreService').addEventListener('click', () => updateStatus(true));
document.getElementById('finService').addEventListener('click', () => updateStatus(false));

/**
 * Fonction pour envoyer un rapport via le webhook "Rapports"
 * @param {string} rapport - Contenu du rapport
 */
function envoyerRapport(rapport) {
    // Envoi du rapport au webhook "Rapports"
    sendToDiscord(webhookRapports, rapport);
}
