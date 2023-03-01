// Récupération du token
const token = localStorage.getItem('token');
if (token) {
// Récupération de l'élément body
const body = document.querySelector('body');
const filter = document.querySelector('.filter');

// Création du bandeau avec fond noir
const bandeau = document.createElement('div');
bandeau.id = 'bandeau';
bandeau.style.width = '100%';
bandeau.style.height = '55px';

// Création de l'icône "mode édition"
const iconBandeau = document.createElement('i');
iconBandeau.className = 'fa-regular fa-pen-to-square';
iconBandeau.classList.add('icon_bandeau');
bandeau.appendChild(iconBandeau);

// Création du paragraphe "mode édition"
const paragraphe = document.createElement('p');
paragraphe.textContent = 'Mode édition';

// On rattache la section introduction
const introduction = document.querySelector('#introduction');

// Création du conteneur pour l'icône et le texte modifier
const container = document.createElement('div');
container.classList.add('icon_text_container');

// Création de l'icône "mode édition" sous la photo dans l'intro
const iconIntro = document.createElement('i');
iconIntro.className = 'fa-regular fa-pen-to-square';
iconIntro.classList.add('icon_intro');
container.appendChild(iconIntro);

// Création du bouton "modifier" sous la photo
const modifierIntro = document.createElement('a');
modifierIntro.textContent = "modifier";
modifierIntro.id = 'modifier_intro';
container.appendChild(modifierIntro);

// Ajout du conteneur à l'introduction
introduction.querySelector('figure').appendChild(container);

// Création du conteneur pour l'icône et le texte
const containerTitre = document.createElement('div');
containerTitre.classList.add('icon_text_container2');

// Création de l'icône "mode édition"
const icon = document.createElement('i');
icon.className = 'fa-regular fa-pen-to-square';
containerTitre.appendChild(icon);

// Création du bouton "modifier" pour ouvrir la modale
const modifier = document.createElement('a');
modifier.textContent = 'modifier';
modifier.id = 'modifier_article';
containerTitre.appendChild(modifier);

// Ajout du conteneur à l'article
const h2 = introduction.querySelector('h2');
h2.parentNode.insertBefore(containerTitre, h2);

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