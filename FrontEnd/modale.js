// Récupération des éléments HTML
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("modalBtn");
const closeBtns = document.getElementsByClassName("close");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const gallery = document.getElementById("gallery");
// 2ème modale pour ajouter une photo
const addPhotoModal = document.getElementById("addPhotoModal");
// Formulaire pour titre + catégorie
const addPhotoForm = document.getElementById("addPhotoForm");
// Saisie nom de l'image
const addPhotoFormPhotoName = document.getElementById("photoName");
// Saisie categorie de la photo
const addPhotoFormPhotoCategory = document.getElementById("photoCategory");
// Ajout de la photo
const addPhotoFormPhotoFile = document.getElementById("photoFile");

const addPhotoButton = document.querySelector(".addPhotoDiv");
// Récupération de l'élément bloc_preview
const previewDiv = document.querySelector(".bloc_preview");
// Fleche de retour
const backToGallery = document.getElementById("backBtn");



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

  // Ajout des nouvelles images
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

  // Créatop, de l'icône de supression
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "gallery-image-delete-icon");
    deleteIcon.addEventListener("click", () => {
      deleteImage(image.id);
  imgContainer.remove();

    // Code pour supprimer l'image via une requête AJAX ou Fetch
      function deleteImage(imageId) {
        fetch(`http://localhost:5678/api/works/${imageId}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {
            console.log(`Image with id ${imageId} has been deleted`);
            
          } else {
            console.error(`Error deleting image with id ${imageId}`);
          }
        })

        
        .catch(error => {
          console.error(`Error deleting image with id ${imageId}: ${error}`);
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

// Fonction pour fermer une fenêtre modale
function closeModal(modal) {
  modal.style.display = "none";
}

backBtn.addEventListener("click", () => {
  hideModal(addPhotoModal, addPhotoForm);
  showGallery();
});

// Événements sur les boutons
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

