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
}

document.addEventListener('DOMContentLoaded', () => {
    obtenirNumeroRapport();
});

document.getElementById('statusIndicator').addEventListener('click', function() {
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (statusIndicator.classList.contains('hors-service')) {
        statusIndicator.classList.remove('hors-service');
        statusIndicator.classList.add('en-service');
        statusIndicator.textContent = "En service";
    } else {
        statusIndicator.classList.remove('en-service');
        statusIndicator.classList.add('hors-service');
        statusIndicator.textContent = "Hors service";
    }
});


// Fonction pour ajouter des champs pour chaque personne impliquée
function ajouterPersonnes() {
    const personnesContainer = document.getElementById('personnesContainer');
    personnesContainer.innerHTML = '';  // Réinitialise le conteneur

    const nombrePersonnes = parseInt(document.getElementById('nombrePersonnes').value);
    for (let i = 0; i < nombrePersonnes; i++) {
        const personneDiv = document.createElement('div');
        personneDiv.classList.add('person-container');
        personneDiv.innerHTML = `
            <label>Nom de la personne ${i + 1} :</label>
            <input type="text" class="nomPersonne" placeholder="Nom complet" required>
            
            <label>Rôle (suspect, victime, etc.) :</label>
            <input type="text" class="rolePersonne" placeholder="Rôle de la personne" required>
            
            <label>Numéro ID :</label>
            <input type="text" class="idPersonne" placeholder="Numéro d'identité" required>
            
            <label>Type d'objet impliqué (arme, véhicule, etc.) :</label>
            <input type="text" class="typeObjet" placeholder="Type d'objet" required>
            
            <label>Numéro de l'objet :</label>
            <input type="text" class="numeroObjet" placeholder="Numéro de série ou d'immatriculation" required>

            <button type="button" class="delete-button" onclick="supprimerPersonne(this)">Supprimer cette personne</button>
        `;
        personnesContainer.appendChild(personneDiv);
    }
}

// Fonction pour supprimer une personne
function supprimerPersonne(button) {
    const personneDiv = button.parentElement;
    personneDiv.remove();
}

// Fonction pour envoyer le rapport au webhook Discord
function envoyerRapport(event) {
    event.preventDefault();

    const agent = document.getElementById('agent').value;
    const reportID = document.getElementById('reportID').textContent;
    const typeIncident = document.getElementById('typeIncident').value;
    const dateIncident = document.getElementById('dateIncident').value;
    const description = document.getElementById('description').value;

    let personnes = '';
    document.querySelectorAll('.person-container').forEach((personField, index) => {
        const nom = personField.querySelector('.nomPersonne').value;
        const role = personField.querySelector('.rolePersonne').value;
        const id = personField.querySelector('.idPersonne').value;
        const typeObjet = personField.querySelector('.typeObjet').value;
        const numeroObjet = personField.querySelector('.numeroObjet').value;
        personnes += `\nPersonne ${index + 1} :\n- Nom : ${nom}\n- Rôle : ${role}\n- Numéro ID : ${id}\n   Objet impliqué:\n   - Type : ${typeObjet}\n   - Numéro : ${numeroObjet}`;
    });

    const message = `**Nouveau rapport créé par : ${agent}**\n**Numéro de rapport :** ${reportID}\n**Type d'incident :** ${typeIncident}\n**Date :** ${dateIncident}\n**Description :** ${description}\n**Personnes concernées :**${personnes}`;

    fetch(webhookRapport, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
    })
    .then(response => {
        if (response.ok) {
            alert("Le rapport a été envoyé avec succès !");
            document.getElementById('reportForm').reset();
            obtenirNumeroRapport();
        } else {
            alert("Erreur lors de l'envoi du rapport.");
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du webhook:', error);
        alert("Erreur lors de l'envoi du rapport.");
    });
}
