// Webhook URLs
const webhookPriseService = 'https://discord.com/api/webhooks/1301524280529518602/GrQETveJvGKN4CgX-BNQuqafwTP6j2e_IaaexX3tbrG6iGobixweOc_OrTg6CwTKwNMP';
const webhookRapport = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

// Initialisation des éléments
document.addEventListener('DOMContentLoaded', function () {
    const statusElement = document.getElementById('status');
    const prendreServiceButton = document.getElementById('prendreService');
    const finServiceButton = document.getElementById('finService');
    const dureeServiceElement = document.getElementById('dureeService');
    const rapportsEffectuesElement = document.getElementById('rapportsEffectues');

    let enService = false;
    let compteurRapports = 0;
    let dureeEnService = 0;
    let intervalId;

    // Fonction pour envoyer une notification à Discord
    function envoyerNotificationDiscord(webhookUrl, message) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        })
        .then(response => {
            if (!response.ok) {
                console.error("Erreur lors de l'envoi au webhook Discord :", response.statusText);
            }
        })
        .catch(error => console.error("Erreur lors de la connexion au webhook Discord :", error));
    }

    // Prendre le service
    prendreServiceButton.addEventListener('click', function () {
        if (!enService) {
            enService = true;
            statusElement.textContent = "En service";
            statusElement.style.color = "green";
            compteurRapports = 0;
            dureeEnService = 0;
            intervalId = setInterval(() => {
                dureeEnService++;
                dureeServiceElement.textContent = new Date(dureeEnService * 1000).toISOString().substr(11, 8);
            }, 1000);

            // Envoyer notification Discord pour prise de service
            const messagePriseService = `Agent en service : ${document.getElementById("pseudo").textContent}`;
            envoyerNotificationDiscord(webhookPriseService, messagePriseService);
        }
    });

    // Fin du service
    finServiceButton.addEventListener('click', function () {
        if (enService) {
            enService = false;
            statusElement.textContent = "Hors service";
            statusElement.style.color = "red";
            clearInterval(intervalId);

            // Envoyer notification Discord pour fin de service avec détails
            const messageFinService = `Agent hors service : ${document.getElementById("pseudo").textContent}\nDurée : ${dureeServiceElement.textContent}\nRapports effectués : ${compteurRapports}`;
            envoyerNotificationDiscord(webhookPriseService, messageFinService);
        }
    });

    // Redirection vers la page de création de rapport
    const creerRapportButton = document.getElementById('creerRapport');
    creerRapportButton.addEventListener('click', function () {
        window.location.href = "reports.html";  // Redirection vers la page rapport
    });
});

