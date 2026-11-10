// 1. Liste des énigmes avec les HASHES SHA-256 (en minuscules et sans accents)
const etapes = [
    {
        indice: "Indice 0 : <br />Si Moriarty peut-être noir et femme, Sébastien peut prétendre être Sherlock Holmes. Mais il devra le prouver en utilisant son sens de l’observation, sa déduction implacable et ses compétences informatiques. Es-tu prêt à commencer le jeu ?",
        hashReponse: "3a3468fa89b2ab7cbfe5400858a8ec0066e9e8defa9a64c993b5f24210244df8" 
    },
    {
        indice: "Indice 1 : <br />Super ! Première énigme <br /> Qu'est ce qui est vert qui monte et qui descend ?",
        hashReponse: "55de0843e14ab79decddbb86ee039f7efb9c882bf7abb60c5719601e24d0678e" // Sébastien, je ne me suis pas faite chier à te créer un jeu pour que tu triches. Alors pour cette fois seulement tu pourras lire le mot de passe dans le code. Qu'est ce qui est vert qui monte et qui descend ? C’est toi ! Parce que t’es dég que cette méthode ne marche pas et que tu viens de débander ! Tape ton prénom, tricheur. Et sois fair-play pour la suite. 

    },
    {
        indice: "Indice 2 : <br /><a href='documents/origami_renard.pdf' style='color: white;' target='_blank'>Jeux</a> ne suis fait ni de chair ni de poil,<br />Mais mon esprit rusé jamais ne se voile.<br />Sans craindre une tranchante morsure,<br />Trouve mon arme affûtée pour suivre l'aventure !",
        hashReponse: "d91082e0ddb6ffb887005b9a09c64f41c9763e5ff4dc8b9016334c10c3fd7318" 
    },
    {
        indice: "Indice 3 : <br /><a href='documents/codage_polychromatique.pdf' style='color: white;' target='_blank'>L'image</a> ment.<br>Le bleu n'est qu'un écran de fumée<br>pour te maintenir endormi dans la Matrice.<br>Filtre l'illusion, grâce à la couleur du réveil,<br>et le mot de passe émergera des pixels.",
        hashReponse: "5478a5348eb8b8e977d34eeef4cbe47474d36d43d54aa0bfe3d5b0ae668f14a6" 
    },
    {
        indice: "Indice 4 : <br />Un ange joue avec mon cœur dans une céleste <a href='documents/Eurythmics - There Must Be An Angel.mp3' style='color: white;' target='_blank'>harmonie</a>,<br>Mais l’oreille s’égare dès que l’écho s’enfuit.<br>Laisse la mélodie mourir au seuil de tes sens,<br>Et convertis le temps en un tableau d’ondes et de fréquences.<br>Sous ce voile léger où la grâce s’élève,<br>Quelle fureur souterraine et électrique y grave son rêve ?",
        hashReponse: "03ecab669ba200ba17f994677e88894400fd627e6f70439247ce0cbda8ca9a20" 
    },
        {
        indice: "Indice 5 : <br />ERQMRXU ERQMRXU ERQMRXU MHSRUWHOHQRPGXQWBUDQPDLVMHVHUVGDQVODVVLHWWH<br />OHVHFUHWGHPRQFRGHHVWDXFRHXUGHPDUHFHWWH<br />HQGHFDODQWWHVSDVOHPBVWHUHVHYDGH<br />WXGHFRXYULUDVDORUVXQHVLPSOH...VDODGH",
        hashReponse: "363ab4c828cfca6a0cfea4acc005a24c5ee9bb4e7f6804c4c15cc287fa640993"
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
            indiceTexte.innerText = "Félicitations, le coffre-fort est grand ouvert et te révèle l'emplacement de ton cadeau :<br /><br />Je me cache dans la pièce où l'on change de peau,<br />À l'abri des regards, caché par un <strong>rideau</strong>.<br />Faufile ta main derrière les remparts de laine qui me gardent au chaud,<br />C’est dans leur ombre douce que se cache ton cadeau.";
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
