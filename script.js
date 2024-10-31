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
        }
    });

    // Fin du service
    finServiceButton.addEventListener('click', function () {
        if (enService) {
            enService = false;
            statusElement.textContent = "Hors service";
            statusElement.style.color = "red";
            clearInterval(intervalId);
            alert(`Fin de service.\nDurée: ${dureeServiceElement.textContent}\nRapports effectués: ${compteurRapports}`);
        }
    });

    // Création de rapport
    const creerRapportButton = document.getElementById('creerRapport');
    creerRapportButton.addEventListener('click', function () {
        if (enService) {
            compteurRapports++;
            rapportsEffectuesElement.textContent = compteurRapports;
            alert("Rapport créé.");
        } else {
            alert("Veuillez prendre le service pour créer un rapport.");
        }
    });
});
