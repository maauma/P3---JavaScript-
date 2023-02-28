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
// Upload de la photo - 2ème fenêtre modale
const addPhotoFormPhotoFile = document.getElementById("photoFile");
// Récupération de l'élément bloc_preview
const previewDiv = document.querySelector(".bloc_preview");
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
              const imgContainer = document.querySelector(`.gallery[data-id="${imageId}"]`);
              imgContainer.remove();
            } else {
              console.error(`Erreur lors de la suppresion de l'image avec l'id ${imageId}`);
            }
          })
          .catch(error => {
            console.error(`Erreur lors de la suppression de l'image avec l'id  ${imageId}: ${error}`);
          });
      }
      // Supprimer l'élément HTML correspondant à l'image
      imgContainer.remove();
    });
    imgContainer.appendChild(deleteIcon);

    gallery.appendChild(imgContainer);
  });

  modal.style.display = "block";
}

// Récupération des éléments HTML nécessaires
const addPhotoForm = document.getElementById("addPhotoForm");
const validatePhotoButton = document.getElementById("validatePhoto");
const addPhotoBloc = document.getElementById("addPhotoBloc");
const previewImage = document.getElementById("previewImage");

// Ajout d'un écouteur d'événement qui écoute les changements sur le champ input de type file
// et met à jour l'attribut src de l'élément img avec le fichier sélectionné
addPhotoBloc.addEventListener("change", function() {
  const file = addPhotoBloc.files[0]; // Récupération du fichier sélectionné
  const reader = new FileReader(); // Création d'un objet FileReader pour lire le contenu du fichier

  // Ajout d'un écouteur d'événement qui écoute lorsque la lecture du fichier est terminée
  reader.addEventListener("load", function() {
    previewImage.src = reader.result; // Mise à jour de l'attribut src de l'élément img avec le contenu du fichier encodé en base64
  });

  if (file) {
    reader.readAsDataURL(file); // Lecture du contenu du fichier encodé en base64
  }
});

// Ajout d'un écouteur d'événement qui écoute le clic sur le bouton "Valider"
// et empêche le comportement de soumission par défaut du formulaire
validatePhotoButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // Récupération des données du formulaire (fichier, titre et catégorie)
  const file = addPhotoBloc.files[0];
  const photoName = document.getElementById("photoName").value;
  const photoCategory = document.getElementById("photoCategory").value;
  
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
  .then(data => console.log(data))
  .catch(error => console.error(error));
});










// Fonction pour fermer une fenêtre modale
function closeModal(modal) {
  modal.style.display = "none";
}


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

// Action de retour sur la flèche
backBtn.addEventListener("click", () => {
  closeModal(addPhotoModal);
  showModal();
});

// Bouton pour ajouter une photo
addPhotoBtn.addEventListener("click", () => {
  addPhotoModal.style.display = "block";
});


