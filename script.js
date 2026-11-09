// 1. Liste des énigmes avec les HASHES SHA-256 des réponses (et non plus en clair)
// (Exemples de hashes ci-dessous, pense à mettre les tiens si tu as changé les mots)
const etapes = [
    {
        indice: "Indice 0 : Si Moriarty peut-être noir et femme, Sébastien peut prétendre être Sherlock Holmes. Mais il devra le prouver en utilisant son sens de l’observation, sa déduction implacable et ses compétences informatiques. Es-tu prêt à commencer le jeu ?",
        hashReponse: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" // Hash de "oui"
    },
    {
        indice: "Indice 1 : Super ! Première énigme. Qu'est ce qui est vert qui monte et qui descend ?",
        hashReponse: "89725d1e4dfcec8cbbd2720c0c7c5c4d56130bf75e2947ef2b35db5827bfbf33" // C’est toi ! Parce que t’es dég que cette méthode ne marche pas et que tu viens de débander ! Tape ton prénom, tricheur. Et sois fair-play. Hash de "Sébastien"
    },
    {
        indice: "Indice 2 : "<a href='origami_renard.pdf' target='_blank'>Jeux</a><br />ne suis fait ni de chair ni de poil,<br />Mais mon esprit rusé jamais ne se voile.<br />Sans craindre une tranchante morsure,<br />Trouve mon arme affûtée pour suivre l'aventure !",
        hashReponse: "7302a175a6b1d72177e4476bb5328f27889d255722107484130a28262df028cd" // Hash de "Cr0c$"
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

// Fonction utilitaire pour calculer le hash SHA-256 d'une saisie
async function calculerHash(texte) {
  const texteNormalise = texte.trim().toLowerCase();
  const msgBuffer = new TextEncoder().encode(texteNormalise);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 3. Fonction de vérification (devenue asynchrone)
async function verifierReponse() {
    const reponseUtilisateur = inputElement.value;
    const hashAttendu = etapes[etapeActuelle].hashReponse;

    // On calcule le hash de ce que l'utilisateur a tapé
    const hashUtilisateur = await calculerHash(reponseUtilisateur);

    if (hashUtilisateur === hashAttendu) {
        
        // Fait disparaître l'image si on valide la première étape (étape 0)
        if (etapeActuelle === 0 && imageSebastien) {
            imageSebastien.style.display = "none";
        }

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
            
            messageElement.innerText = "Tu as résolu toutes les énigmes ! 🏆";
            messageElement.className = "message success";
        }
    } else {
        // Erreur
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