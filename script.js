// Configuration des Webhooks
const webhookPriseFinService = 'https://discord.com/api/webhooks/1301524280529518602/GrQETveJvGKN4CgX-BNQuqafwTP6j2e_IaaexX3tbrG6iGobixweOc_OrTg6CwTKwNMP';
let startTime;
let isServiceOn = false; // Variable pour suivre l'état du service

// Récupère le pseudo de l'utilisateur dans le serveur Discord
async function obtenirPseudoServeur() {
    const accessToken = localStorage.getItem('discord_access_token');
    const guildId = 'YOUR_GUILD_ID'; // Remplace par l'ID de ton serveur

    if (accessToken) {
        try {
            const response = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}/member`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const pseudo = data.nick || data.user.username;
                document.getElementById('pseudo').textContent = pseudo;
            } else {
                console.error("Erreur lors de la récupération du pseudo :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }
    }
}

// Met à jour l'état du service et envoie une notification à Discord
function updateStatus(isInService) {
    const pseudo = document.getElementById('pseudo').textContent;
    const etatService = document.getElementById('etatService');
    const statusElement = document.getElementById('status');

    if (isInService) {
        startTime = new Date(); // Démarre le chrono
        isServiceOn = true;
        etatService.textContent = 'En service';
        statusElement.textContent = "En service";
        statusElement.style.color = "green";
        document.getElementById("prendreService").style.backgroundColor = "green";
        document.getElementById("finService").style.backgroundColor = "";
        envoyerNotificationDiscord(`${pseudo} est en service !`);
    } else {
        const dureeService = calculerDureeService();
        isServiceOn = false;
        etatService.textContent = 'Hors service';
        statusElement.textContent = "Hors service";
        statusElement.style.color = "red";
        document.getElementById("prendreService").style.backgroundColor = "";
        document.getElementById("finService").style.backgroundColor = "red";
        envoyerNotificationDiscord(`${pseudo} est hors service. Durée : ${dureeService}`);
    }
}

// Calculer la durée en service
function calculerDureeService() {
    const now = new Date();
    const difference = new Date(now - startTime);

    const heures = String(difference.getUTCHours()).padStart(2, '0');
    const minutes = String(difference.getUTCMinutes()).padStart(2, '0');
    const secondes = String(difference.getUTCSeconds()).padStart(2, '0');

    return `${heures}:${minutes}:${secondes}`;
}

// Envoie une notification au webhook Discord
function envoyerNotificationDiscord(message) {
    fetch(webhookPriseFinService, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    })
    .then(response => {
        if (!response.ok) {
            console.error("Erreur lors de l'envoi au webhook Discord");
        }
    })
    .catch(error => console.error("Erreur de la requête Discord:", error));
}

// Gérer les clics sur les boutons
document.getElementById('prendreService').addEventListener('click', () => {
    if (!isServiceOn) updateStatus(true);
});
document.getElementById('finService').addEventListener('click', () => {
    if (isServiceOn) updateStatus(false);
});

// Charger le pseudo au chargement de la page
obtenirPseudoServeur();
