// Récupération du token
const token = localStorage.getItem('token');

// Si l'utilisateur est connecté on affiche le mode admin
if (token) {
  const adminModeEdit = document.querySelector(".admin_mode_edit");

  // Créer un élément i pour l'icône
  const icon = document.createElement('i');
  icon.className = "fa-regular fa-pen-to-square";
// Ajout de l'ancre
adminModeEdit.appendChild(icon);
    // Création du bouton "modifier" pour ouvrir la modale
    const ancreModale = document.createElement('button');
    ancreModale.textContent = "modifier";
    ancreModale.id = 'modalBtn';
    // Ajout de l'ancre
    adminModeEdit.appendChild(ancreModale);
}

// Récupération des travaux depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

// Fonction pour l'affichage des travaux
export function affichageTravaux(travaux) {
  for (let i = 0; i < travaux.length; i++) {
    const works = travaux[i];

    // Récupération de l'élément du DOM qui accueillera les travaux
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

    // On rattache la balise figureElement a la section sectionTravaux
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
const boutonHotels = document.querySelector(".btn-hotels");
const boutonAppartements = document.querySelector(".btn-appartements");
const boutonTous = document.querySelector(".btn-tous");

boutonObjets.addEventListener("click", function () {
  const travauxObjets = travaux.filter(function (travaux) {
    return travaux.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxObjets);
});

boutonHotels.addEventListener("click", function () {
  const travauxHotels = travaux.filter(function (travaux) {
    return travaux.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxHotels);
});

boutonAppartements.addEventListener("click", function () {
  const travauxAppartements = travaux.filter(function (travaux) {
    return travaux.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxAppartements);
});

boutonTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travaux);
});
