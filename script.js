const webhookRapport = 'https://discord.com/api/webhooks/1301527281092530196/L9d9-KGAsJ5Klnpssn0RTc8oUvbXOCConzdvIXHqXnfStHA987YHL7a8gJet9mw-w-H2';

let reportCount = 1;
let reportsEffectues = 0;

// Fonction pour récupérer automatiquement le nom d'utilisateur depuis Discord
function recupererNomUtilisateur() {
    // Remplace par la méthode réelle pour récupérer le nom d'utilisateur
    const nomUtilisateur = sessionStorage.getItem("discordUsername") || "Utilisateur";
    document.getElementById("agent").value = nomUtilisateur;
}

function genererIDRapport() {
    return `R${String(reportCount).padStart(3, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    recupererNomUtilisateur();
    document.getElementById('reportID').textContent = genererIDRapport();
    document.getElementById('nombrePersonnes').addEventListener('change', ajouterPersonnes);
    document.getElementById('reportForm').addEventListener('submit', envoyerRapport);
});

function ajouterPersonnes() {
    const personnesContainer = document.getElementById('personnesContainer');
    personnesContainer.innerHTML = '';

    const nombrePersonnes = parseInt(document.getElementById('nombrePersonnes').value);
    for (let i = 0; i < nombrePersonnes; i++) {
        const personneDiv = document.createElement('div');
        personneDiv.classList.add('person-container');
        personneDiv.innerHTML = `
            <label>Nom de la personne ${i + 1} :</label>
            <input type="text" class="nomPersonne" required>
            <label>Rôle (suspect, victime) :</label>
            <input type="text" class="rolePersonne" required>
            <label>Numéro ID :</label>
            <input type="text" class="idPersonne" required>
            <h3>Objets impliqués pour la personne ${i + 1}</h3>
            <label>Type d'objet (arme, véhicule) :</label>
            <input type="text" class="typeObjet" required>
            <label>Numéro de l'objet :</label>
            <input type="text" class="numeroObjet" required>
            <button type="button" class="delete-button" onclick="supprimerPersonne(this)">Supprimer cette personne</button>
        `;
        personnesContainer.appendChild(personneDiv);
    }
}

function supprimerPersonne(button) {
    const personneDiv = button.parentElement;
    personneDiv.remove();
}

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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    })
    .then(response => {
        if (response.ok) {
            alert("Le rapport a été envoyé avec succès !");
            reportsEffectues++;
            reportCount++; // Incrémente le compteur de rapport
            document.getElementById('reportForm').reset();
            document.getElementById('reportID').textContent = genererIDRapport();
            document.getElementById("nombrePersonnes").selectedIndex = 0;
            document.getElementById('alertBox').textContent = `Rapport envoyé par ${agent}`;
            document.getElementById('alertBox').style.display = 'block';
        } else {
            alert("Erreur lors de l'envoi du rapport.");
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du webhook:', error);
        alert("Erreur lors de l'envoi du rapport.");
    });
}
