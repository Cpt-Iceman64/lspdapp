// Définition de l'URL du webhook Discord
const webhookUrl = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

/**
 * Fonction pour envoyer un message au webhook Discord.
 * @param {string} message - Le message à envoyer.
 */
function sendToDiscord(message) {
    fetch(webhookUrl, {
        method: 'POST', // Méthode POST pour envoyer des données
        headers: {
            'Content-Type': 'application/json', // Type de contenu JSON
        },
        body: JSON.stringify({ content: message }) // Corps de la requête avec le message
    })
    .then(response => {
        if (!response.ok) {
            console.error("Erreur lors de l'envoi du message à Discord."); // Affiche une erreur si l'envoi échoue
        }
    })
    .catch(error => console.error("Erreur de requête:", error)); // Capture et affiche toute erreur réseau
}

/**
 * Fonction pour mettre à jour l'indicateur de statut et les boutons de service.
 * @param {boolean} isInService - Indique si l'agent est en service (true) ou hors service (false).
 */
function updateStatus(isInService) {
    const statusIndicator = document.getElementById('statusIndicator'); // Sélection de l'indicateur de statut
    const prendreServiceBtn = document.getElementById('prendreService'); // Sélection du bouton "Prendre le service"
    const finServiceBtn = document.getElementById('finService'); // Sélection du bouton "Fin de service"

    if (isInService) {
        // Si l'agent est "En service"
        
        // Mise à jour de l'indicateur de statut
        statusIndicator.classList.remove('hors-service'); // Supprime la classe "hors-service"
        statusIndicator.classList.add('en-service'); // Ajoute la classe "en-service" (vert)
        statusIndicator.textContent = "En service"; // Texte de l'indicateur

        // Mise à jour des boutons
        prendreServiceBtn.classList.add('service-on'); // Bouton "Prendre le service" devient vert
        prendreServiceBtn.classList.remove('service-off'); // Retire le style d'inactivité
        finServiceBtn.classList.remove('service-on'); // Bouton "Fin de service" redevient bleu
        finServiceBtn.classList.add('service-off'); // Applique un style d'inactivité

        // Envoi d'une notification à Discord
        sendToDiscord("🚓 Agent en service !");
    } else {
        // Si l'agent est "Hors service"
        
        // Mise à jour de l'indicateur de statut
        statusIndicator.classList.remove('en-service'); // Supprime la classe "en-service"
        statusIndicator.classList.add('hors-service'); // Ajoute la classe "hors-service" (rouge)
        statusIndicator.textContent = "Hors service"; // Texte de l'indicateur

        // Mise à jour des boutons
        finServiceBtn.classList.add('service-on'); // Bouton "Fin de service" devient rouge
        finServiceBtn.classList.remove('service-off'); // Retire le style d'inactivité
        prendreServiceBtn.classList.remove('service-on'); // Bouton "Prendre le service" redevient bleu
        prendreServiceBtn.classList.add('service-off'); // Applique un style d'inactivité

        // Envoi d'une notification à Discord
        sendToDiscord("🚓 Agent hors service.");
    }
}

// Écouteur d'événement pour le bouton "Prendre le service"
document.getElementById('prendreService').addEventListener('click', () => {
    updateStatus(true); // Passe en mode "En service"
});

// Écouteur d'événement pour le bouton "Fin de service"
document.getElementById('finService').addEventListener('click', () => {
    updateStatus(false); // Passe en mode "Hors service"
});
