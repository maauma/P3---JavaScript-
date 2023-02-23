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
paragraphe.style.color = 'white';
paragraphe.style.textAlign = 'center';
paragraphe.style.marginTop = '10px';

// Création du bouton "éditer"
const bouton = document.createElement('button');
bouton.textContent = 'Éditer';
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