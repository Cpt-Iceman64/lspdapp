const webhookRapport = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';
const apiURL = "https://script.google.com/macros/s/AKfycbzj5MYllHtuFW0lJoHLKJZk6JQTbWeNUDGMXf9nKLU4/dev";

// Récupération du numéro de rapport
function obtenirNumeroRapport() {
    return fetch(apiURL)
        .then(response => response.text())
        .then(data => {
            document.getElementById('reportID').textContent = data;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du numéro de rapport:', error);
            alert("Erreur lors de la récupération du numéro de rapport.");
        });

