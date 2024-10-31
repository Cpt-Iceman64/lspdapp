// URL du webhook Discord
const webhookUrl = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

// Fonction pour envoyer un message à Discord
function sendToDiscord(message) {
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message })
    })
    .then(response => {
        if (!response.ok) {
            console.error("Erreur lors de l'envoi du message à Discord.");
        }
    })
    .catch(error => console.error("Erreur de requête:", error));
}

// Fonction pour mettre à jour l'affichage de l'indicateur de statut
function updateStatusIndicator(isInService) {
    const statusIndicator = document.getElementById('statusIndicator');

    if (isInService) {
        statusIndicator.classList.remove('hors-service');
        statusIndicator.classList.add('en-service');
        statusIndicator.textContent = "En service";
        sendToDiscord("🚓 Agent en service !");
    } else {
        statusIndicator.classList.remove('en-service');
        statusIndicator.classList.add('hors-service');
        statusIndicator.textContent = "Hors service";
        sendToDiscord("🚓 Agent hors service.");
    }
}

// Écouteur pour le bouton "Prendre le service"
document.getElementById('prendreService').addEventListener('click', () => {
    updateStatusIndicator(true); // Passe en mode "En service"
});

// Écouteur pour le bouton "Fin de service"
document.getElementById('finService').addEventListener('click', () => {
    updateStatusIndicator(false); // Passe en mode "Hors service"
});
