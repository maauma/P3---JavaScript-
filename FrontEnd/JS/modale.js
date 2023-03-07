
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

import { affichageTravaux } from "./home.js";
import { recupererTravaux } from "./home.js";



// Appel de la fonction de récupération des travaux et d'affichage
async function recupererEtAfficherTravaux() {
  const travaux = await recupererTravaux();
  affichageTravaux(travaux);
}


// Déclaration des constantes




// Récupération du token
const token = localStorage.getItem("token");
// Récupération du userId
const userId = localStorage.getItem('userId');
console.log(localStorage.getItem('userId'));


// 1ère fenêtre modale
// Récupération de la fenêtre modale
const modal = document.getElementById("myModal");
// Récupération du bouton pour afficher la fenêtre modale
const modalBtn = document.getElementById("modalBtn");
// Fermeture de la modale via la croix
const closeBtns = document.getElementsByClassName("close");
// Bouton 1ère modale "Ajouter une photo"
const addPhotoBtn = document.getElementById("addPhotoBtn");
// Gallerie photo présente dans la fenêtre modale
const gallery = document.getElementById("gallery");
// 2ème fenêtre modale pour ajouter une photo
const addPhotoModal = document.getElementById("addPhotoModal");

// Formulaire pour titre + catégorie
// Saisie nom de l'image - 2ème fenêtre modale
const addPhotoFormPhotoName = document.getElementById("photoName");
// Saisie categorie de la photo - 2ème fenêtre modale
const addPhotoFormPhotoCategory = document.getElementById("photoCategory");
// Bouton pour ajouter une photo dans le bloc preview
const addPhotoButton = document.querySelector(".addPhotoDiv");
// Fleche de retour
const backToGallery = document.getElementById("backBtn");
// Sélectionne la div "bloc_preview"
const previewBlock = document.querySelector('.bloc_preview');
// Création d'une constante pour l'image chargée par l'utilisateur
const photoInput = document.createElement('input');
// Bouton valider pour le formulaire et le chargement de l'image
const validateButton = document.querySelector('#validatePhoto');

const sectionTravaux = document.querySelector(".gallery");

const validatePhotoButton = document.getElementById("validatePhoto");





// Récupération des images depuis l'API
let images = [];
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    images = data;
  });

// Fonction pour afficher la fenêtre modale de la galerie
function showModal() {
  // Suppression des anciennes images
  gallery.innerHTML = "";
  // Ajout des nouvelles images dans la galerie de la modale
  images.forEach(image => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("gallery-image-container");
    // Création de l'élément img pour afficher l'image
    const img = document.createElement("img");
    img.src = image.imageUrl;
    imgContainer.appendChild(img);
    // Création de l'élément a pour le lien "éditer"
    const editLink = document.createElement("a");
    editLink.id = "edit";
    editLink.href = `http://localhost:5678/edit/${image.id}`; // Mettre l'URL de la page d'édition
    editLink.textContent = "éditer";
    editLink.id ="edit_link";
    imgContainer.appendChild(editLink);
    // Création de l'icône de supression
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "gallery-image-delete-icon");
    deleteIcon.addEventListener("click", () => {
    deleteImage(image.id);
    imgContainer.remove();
    // Fonction pour supprimer une image
    function deleteImage(imageId) {
        fetch(`http://localhost:5678/api/works/${imageId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.ok) {
              console.log(`L'image avec l'id ${imageId} a été suprimée`);
              // Supprimer l'élément HTML correspondant à l'image
              const imageElement = document.querySelector(`figure[data-id="${imageId}"]`);
        if (imageElement) {
          imageElement.remove();
        }
            } else {
              console.error(`Erreur lors de la suppresion de l'image avec l'id ${imageId}`);
            }
          })
        
    }

      // Supprimer l'élément HTML correspondant à l'image
      imgContainer.remove();
    });
    imgContainer.appendChild(deleteIcon);

    gallery.appendChild(imgContainer);
  });

  modal.style.display = "block";
}



// Ajout d'un écouteur d'événement qui écoute les changements sur le champ input de type file
// et appelle la fonction handleFileInputChange
const addPhotoBloc = document.getElementById("addPhotoBloc");
addPhotoBloc.addEventListener("change", handleFileInputChange);




function createImagePreview(file) {
  const previewBlock = document.querySelector('.bloc_preview');
  previewBlock.style.display = 'none'; // Masquer la div 'bloc_preview'

  // Supprimer l'aperçu de l'image précédente s'il existe
  const oldPreviewImage = document.querySelector('.preview-image');
  if (oldPreviewImage) {
    oldPreviewImage.remove();
  }

  // Créer une nouvelle div pour afficher l'aperçu de l'image
  const newPreviewBlock = document.createElement("div");
  newPreviewBlock.classList.add("bloc_preview_preview"); // Ajouter une classe CSS pour la nouvelle div
  previewBlock.parentNode.insertBefore(newPreviewBlock, previewBlock.nextSibling); // Insérer la nouvelle div juste après la div 'bloc_preview'

  const imgPreview = document.createElement("img"); // Crée un nouvel élément img pour l'aperçu de l'image
  imgPreview.classList.add("preview-image"); // Ajoute la classe "preview-image" à l'élément img
  newPreviewBlock.appendChild(imgPreview); // Ajoute l'élément img à la nouvelle div

  const reader = new FileReader(); // Création d'un objet FileReader pour lire le contenu du fichier

  // Ajout d'un écouteur d'événement qui écoute lorsque la lecture du fichier est terminée
  reader.addEventListener("load", function() {
    imgPreview.src = reader.result; // Mise à jour de l'attribut src de l'élément img avec le contenu du fichier encodé en base64
  });

  reader.readAsDataURL(file); // Lecture du contenu du fichier encodé en base64
}




// Fonction pour gérer le changement de fichier sélectionné
function handleFileInputChange() {
  const file = addPhotoBloc.files[0]; // Récupération du fichier sélectionné
  
  // Vérifie que le fichier est bien une image
  if (file && file.type.startsWith("image/")) {
    // Vérifie s'il y a déjà une photo chargée dans la preview
    
    createImagePreview(file); // Création de l'aperçu de l'image
  } else {
    alert("Veuillez sélectionner un fichier image valide");
  }
}


// Fonction pour restaurer le contenu initial de la div 'bloc_preview'
function restorePreviewBlockContent() {
  previewBlock.style.display = ''; // Afficher la div 'bloc_preview'
}

// Fonction pour réinitialiser le formulaire
function resetState() {
  const previewImage = document.querySelector(".preview-image");
    if (previewImage) {
      // Supprime la preview existante
      previewImage.parentNode.remove();
    }
  // Réinitialisation du formulaire
  addPhotoForm.reset();
  // Réinitialisation du champ de fichier
  addPhotoBloc.value = null;
  // Réinitialisation de la couleur du bouton de validation
  validatePhotoButton.style.backgroundColor = "grey";
   // Réinitialisation de l'aperçu
   restorePreviewBlockContent(); // Ajouter cet appel pour supprimer l'aperçu de l'image
}



// Ajout d'un écouteur d'événement qui écoute le clic sur le bouton "Valider"
// et empêche le comportement de soumission par défaut du formulaire
validatePhotoButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // Récupération des données du formulaire (fichier, titre et catégorie)
  const file = addPhotoBloc.files[0];
  const photoName = document.getElementById("photoName").value;
  const photoCategory = document.getElementById("photoCategory").value;
  
   // Vérification si les champs titre et fichier sont renseignés
   if (!photoName || !file) {
    alert("Veuillez ajouter une photo et un titre");
    return;
  }
  

  // Création d'un objet FormData pour envoyer les données du formulaire au format multipart/form-data
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", photoName);
  formData.append("category", photoCategory);
  
  // Récupération de l'ID utilisateur et du token stockés dans le localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  
  // Envoi d'une requête POST à l'API avec les données du formulaire et les informations d'authentification
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    sectionTravaux.innerHTML = "";
    recupererEtAfficherTravaux();
    addPhotoForm.reset();
    restorePreviewBlockContent(); // Ajout de l'appel à la fonction restorePreviewBlockContent()
 resetState();
 closeModal(addPhotoModal);
 addPhotoBloc.value = "";

    
    
  })
  .catch(error => console.error(error));
});

// Récupération du bouton de validation du formulaire
// Vérification si tous les éléments du formulaire sont chargés et changement de couleur du bouton
addPhotoForm.addEventListener("input", () => {
  if (addPhotoFormPhotoName.value && addPhotoFormPhotoCategory.value && addPhotoBloc.files[0]) {
    validatePhotoButton.style.backgroundColor = "#1D6154";
  } else {
    validatePhotoButton.style.backgroundColor = "grey";
  }
});













// Événements sur les boutons

function closeModal(modal) {
  if (modal === addPhotoModal) {
    previewBlock.classList.remove('bloc_preview_preview');
    restorePreviewBlockContent();
    resetState();
  }
  modal.style.display = "none";
  addPhotoForm.reset();
  restorePreviewBlockContent(); // Ajouter l'appel à la fonction restorePreviewBlockContent()
}



// Afficher la modale en cliquant sur le bouton "modifier"
modalBtn.addEventListener("click", showModal);

// Bouton croix pour fermer la modale
Array.from(closeBtns).forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(modal);
    closeModal(addPhotoModal);
  });
});

// Femer la modale en cliquant à l'extérieur de la fenêtre
window.addEventListener("click", event => {
  if (event.target == modal) {
    closeModal(modal);
  }
  if (event.target == addPhotoModal) {
    closeModal(addPhotoModal);
  }
});



// Action de retour sur la flèche
backBtn.addEventListener("click", () => {
  closeModal(addPhotoModal);
  showModal();
});

// Ajouter un gestionnaire d'événements pour le clic sur le bouton "Ajouter une photo"
addPhotoBtn.addEventListener('click', () => {
  // Fermer la modale "myModal"
  const myModal = document.getElementById('myModal');
  myModal.style.display = 'none';
  addPhotoModal.style.display = "block";
});








// Événements sur les boutons

// Afficher la modale en cliquant sur le bouton "modifier"
modalBtn.addEventListener("click", showModal);

// Bouton croix pour fermer la modale
Array.from(closeBtns).forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(modal);
    closeModal(addPhotoModal);
    
  });
});

// Femer la modale en cliquant à l'extérieur de la fenêtre
window.addEventListener("click", event => {
  if (event.target == modal) {
    closeModal(modal);
  }
  if (event.target == addPhotoModal) {
    closeModal(addPhotoModal);
  }
});





