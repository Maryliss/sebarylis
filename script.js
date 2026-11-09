// 1. Liste des énigmes avec les HASHES SHA-256 (en minuscules et sans accents)
const etapes = [
    {
        indice: "Indice 0 : Si Moriarty peut-être noir et femme, Sébastien peut prétendre être Sherlock Holmes. Mais il devra le prouver en utilisant son sens de l’observation, sa déduction implacable et ses compétences informatiques. Es-tu prêt à commencer le jeu ?",
        hashReponse: "3a3468fa89b2ab7cbfe5400858a8ec0066e9e8defa9a64c993b5f24210244df8" // Hash de "oui"
    },
    {
        indice: "Indice 1 : Super ! Première énigme. Qu'est ce qui est vert qui monte et qui descend ?",
        hashReponse: "55de0843e14ab79decddbb86ee039f7efb9c882bf7abb60c5719601e24d0678e" // Hash de "sebastien"
    },
    {
        indice: "Indice 2 : <br /><a href='www.sebarylis.fr/images/origami_renard.pdf' target='_blank'>Jeux</a><br />ne suis fait ni de chair ni de poil,<br />Mais mon esprit rusé jamais ne se voile.<br />Sans craindre une tranchante morsure,<br />Trouve mon arme affûtée pour suivre l'aventure !",
        hashReponse: "d91082e0ddb6ffb887005b9a09c64f41c9763e5ff4dc8b9016334c10c3fd7318" // Hash de "cr0c$"
    }
];

let etapeActuelle = 0;

// 2. Sélection des éléments HTML
const inputElement = document.getElementById("reponse-input");
const messageElement = document.getElementById("message-retour");
const etapeTitre = document.getElementById("etape-titre");
const indiceTexte = document.getElementById("indice-texte");
const boutonValider = document.getElementById("valider-btn");
const imageSebastien = document.getElementById("image-sebastien");

// Fonction utilitaire : met en minuscules, supprime les espaces aux bords, retire les accents et calcule le hash
async function calculerHash(texte) {
    const texteNormalise = texte
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const msgBuffer = new TextEncoder().encode(texteNormalise);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 3. Fonction de vérification
async function verifierReponse() {
    const reponseUtilisateur = inputElement.value;
    const hashAttendu = etapes[etapeActuelle].hashReponse;

    const hashUtilisateur = await calculerHash(reponseUtilisateur);

    if (hashUtilisateur === hashAttendu) {
        
        if (etapeActuelle === 0 && imageSebastien) {
            imageSebastien.style.display = "none";
        }

        etapeActuelle++;
        inputElement.value = "";

        if (etapeActuelle < etapes.length) {
            etapeTitre.innerText = `Étape ${etapeActuelle + 1} / ${etapes.length}`;
            indiceTexte.innerHTML = etapes[etapeActuelle].indice;
            
            messageElement.innerText = "Bonne réponse ! Indice suivant débloqué. ✔️";
            messageElement.className = "message success";
        } else {
            etapeTitre.innerText = "🎉 VICTOIRE !";
            indiceTexte.innerText = "Félicitations, le coffre-fort est grand ouvert !";
            inputElement.style.display = "none";
            boutonValider.style.display = "none";
            
            messageElement.innerText = "Tu as résolu toutes les énigmes ! 🏆";
            messageElement.className = "message success";
        }
    } else {
        messageElement.innerText = "Ce n'est pas le bon mot clé. Réessaye ! ❌";
        messageElement.className = "message error";
    }
}

// 4. Écouteurs d'événements
boutonValider.addEventListener("click", verifierReponse);

inputElement.addEventListener("keypress", function(evenement) {
    if (evenement.key === "Enter") {
        verifierReponse();
    }
});
