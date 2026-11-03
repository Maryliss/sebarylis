// 1. Liste des énigmes (Indices et Réponses)
const etapes = [
    {
        indice: "Indice 1 : Je commence la journée mais je ne la termine pas. Qui suis-je ? (En une lettre)",
        reponse: "j"
    },
    {
        indice: "Indice 2 : Bravo ! Deuxième étape. Je suis vert, j'ai des feuilles mais je ne suis pas un arbre. On me tourne pour lire.",
        reponse: "livre"
    },
    {
        indice: "Indice 3 : Ultime étape ! Quel est le code secret écrit à la dernière page du livre ? (Astuce : c'est un métal précieux)",
        reponse: "or"
    }
];

let etapeActuelle = 0;

// 2. Sélection des éléments HTML
const inputElement = document.getElementById("reponse-input");
const messageElement = document.getElementById("message-retour");
const etapeTitre = document.getElementById("etape-titre");
const indiceTexte = document.getElementById("indice-texte");
const boutonValider = document.getElementById("valider-btn");

// 3. Fonction de vérification
function verifierReponse() {
    const reponseUtilisateur = inputElement.value.trim().toLowerCase();
    const bonneReponse = etapes[etapeActuelle].reponse.toLowerCase();

    if (reponseUtilisateur === bonneReponse) {
        etapeActuelle++;
        inputElement.value = ""; // Vide le champ

        if (etapeActuelle < etapes.length) {
            // Étape suivante
            etapeTitre.innerText = `Étape ${etapeActuelle + 1} / ${etapes.length}`;
            indiceTexte.innerText = etapes[etapeActuelle].indice;
            
            messageElement.innerText = "Bonne réponse ! Indice suivant débloqué. ✔️";
            messageElement.className = "message success";
        } else {
            // Victoire totale
            etapeTitre.innerText = "🎉 VICTOIRE !";
            indiceTexte.innerText = "Félicitations, le coffre-fort est grand ouvert !";
            inputElement.style.display = "none";
            boutonValider.style.display = "none";
            
            messageElement.innerText = "Vous avez résolu toutes les énigmes ! 🏆";
            messageElement.className = "message success";
        }
    } else {
        // Erreur
        messageElement.innerText = "Ce n'est pas le bon mot clé. Réessayez ! ❌";
        messageElement.className = "message error";
    }
}

// 4. Écouteur d'événement : déclenche la fonction au clic sur le bouton
boutonValider.addEventListener("click", verifierReponse);

// Optionnel : permet aussi de valider en appuyant sur la touche "Entrée"
inputElement.addEventListener("keypress", function(evenement) {
    if (evenement.key === "Enter") {
        verifierReponse();
    }
});
