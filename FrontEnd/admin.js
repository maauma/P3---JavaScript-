const token = localStorage.getItem('token');
if (token) {
// Récupération de l'élément body
const body = document.querySelector('body');
const filter = document.querySelector('.filter');

// Création du bandeau avec fond noir
const bandeau = document.createElement('div');
bandeau.id = 'bandeau';
bandeau.style.width = '100%';
bandeau.style.height = '50px';




// Création du paragraphe "mode édition"
const paragraphe = document.createElement('p');
paragraphe.textContent = 'Mode édition';

// Créer un élément i pour l'icône
const icon = document.createElement('i');
icon.className = "fa-regular fa-pen-to-square";
const adminModeEdit = document.querySelector(".admin_mode_edit");

// Ajout de l'ancre
adminModeEdit.appendChild(icon);






// Création du bouton "éditer"
const bouton = document.createElement('button');
bouton.textContent = 'publier les changements';
bouton.style.marginLeft = '20px';

// Ajout du paragraphe et du bouton au bandeau
bandeau.appendChild(paragraphe);
bandeau.appendChild(bouton);

// Récupération de l'élément nav
const header = document.querySelector('header');

// Insertion du bandeau juste avant l'élément nav
body.insertBefore(bandeau, header);




// Suppression des filtres en mode admin
filter.style.display = 'none';



}