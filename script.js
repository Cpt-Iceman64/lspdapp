// URL du Webhook Discord pour les notifications
const webhookUrl = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

/**
 * Fonction pour envoyer un message au webhook Discord
 * @param {string} message - Message à envoyer
 */
function sendToDiscord(message) {
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
        sendToDiscord("🚓 Agent en service !");
    } else {
        // Hors service : texte rouge
        statusElement.textContent = "Hors service";
        statusElement.style.color = "#f44336";
        prendreServiceBtn.classList.remove('service-on');
        finServiceBtn.classList.add('service-off');
        sendToDiscord("🚓 Agent hors service.");
    }
}

// Écouteurs de clic sur les boutons
document.getElementById('prendreService').addEventListener('click', () => updateStatus(true));
document.getElementById('finService').addEventListener('click', () => updateStatus(false));
