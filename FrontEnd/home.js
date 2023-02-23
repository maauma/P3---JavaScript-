

const token = localStorage.getItem('token');
if (token) {
    const adminModeEdit = document.querySelector(".admin_mode_edit");
    // Création de l'ancre pour ouvrir la modale
const ancreModale = document.createElement('button');
ancreModale.textContent = "modifier";

ancreModale.id = 'modalBtn';

// Ajout de l'ancre
adminModeEdit.appendChild(ancreModale);
}
// Vérification si les travaux sont déjà présents dans le localstorage




let travaux = window.localStorage.getItem('travaux');
if (travaux === null) {
    // Récupération des travaux depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works');
    travaux = await reponse.json();
    // Transformation des travaux en JSON
    const resultatWorks = JSON.stringify(travaux);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("travaux", resultatWorks);
} else {
    travaux = JSON.parse(travaux);
}


// Fonction pour l'affichage des travaux
export function affichageTravaux(travaux) {
    for (let i = 0; i < travaux.length; i++) {
        const works = travaux[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionTravaux = document.querySelector(".gallery");
        const portfolioSection = document.getElementById('portfolio');

        // Création d’une balise dédiée à un travail
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = travaux[i].id
        // Création des balises 
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = works.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = works.title;
 
        // On rattache la balise article a la section Fiches
        sectionTravaux.appendChild(figureElement);
        figureElement.appendChild(imageUrlElement);
        figureElement.appendChild(figcaptionElement);
        
    }
}
// On affiche les travaux
affichageTravaux(travaux);

// Les filtres
// Regrouper dans une seule fonction le comportement des filtres
const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function () {
    const travauxObjets = travaux.filter(function (travaux) {
        return travaux.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    affichageTravaux(travauxObjets);
});

const boutonHotels = document.querySelector(".btn-hotels");
boutonHotels.addEventListener("click", function () {
    const travauxHotels = travaux.filter(function (travaux) {
        return travaux.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    affichageTravaux(travauxHotels);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function () {
    const travauxHotels = travaux.filter(function (travaux) {
        return travaux.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    affichageTravaux(travauxHotels);
});

const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function () {
    const travauxToutes = travaux.filter(function (travaux) {
        return travaux.categoryId === 1, 2, 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    affichageTravaux(travauxToutes);
});

