// Récupération du token
const token = localStorage.getItem('token');

const boutonObjets = document.querySelector(".btn-objets");
const boutonHotels = document.querySelector(".btn-hotels");
const boutonAppartements = document.querySelector(".btn-appartements");
const boutonTous = document.querySelector(".btn-tous");



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



export async function recupererTravaux() {
  const reponse = await fetch('http://localhost:5678/api/works');
  const travaux = await reponse.json();
  return travaux;
}

const mesTravaux = await recupererTravaux();


// Fonction pour l'affichage des travaux
export function affichageTravaux(mesTravaux) {
  for (let i = 0; i < mesTravaux.length; i++) {
    const works = mesTravaux[i];

    // Récupération de l'élément du DOM qui accueillera les travaux
    const sectionTravaux = document.querySelector(".gallery");
    const portfolioSection = document.getElementById('portfolio');

    // Création d’une balise dédiée à un travail
    const figureElement = document.createElement("figure");
    figureElement.dataset.id = mesTravaux[i].id
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
affichageTravaux(mesTravaux);

// Filtre objets
boutonObjets.addEventListener("click", function () {
  const travauxObjets = mesTravaux.filter(function (mesTravaux) {
    return mesTravaux.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxObjets);
});



// Filtre Hôtels
boutonHotels.addEventListener("click", function () {
  const travauxHotels = mesTravaux.filter(function (mesTravaux) {
    return mesTravaux.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxHotels);
});

// Filtre Appartements
boutonAppartements.addEventListener("click", function () {
  const travauxAppartements = mesTravaux.filter(function (mesTravaux) {
    return mesTravaux.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(travauxAppartements);
});


// Filtre tous
boutonTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  affichageTravaux(mesTravaux);
});


