// Déclaration des constantes

// Récupération du token
const token = localStorage.getItem("token");

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


// configuration de l'élément input pour le chargement de photo
photoInput.type = 'file';
photoInput.accept = '.jpg, .png';

// ajout de l'événement pour le chargement de photo
addPhotoButton.addEventListener('click', () => {
  photoInput.click();
});

// ajout de l'événement pour la prévisualisation de photo
photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      previewDiv.innerHTML = '';
      previewDiv.appendChild(img);
    }
  };

  reader.readAsDataURL(file);
});


// ajout de l'événement pour la validation du formulaire
[addPhotoFormPhotoName, addPhotoFormPhotoCategory].forEach((element) => {
  element.addEventListener('input', () => {
    if (addPhotoFormPhotoName.checkValidity() && addPhotoFormPhotoCategory.checkValidity()) {
      validateButton.classList.add('valid');
      validateButton.disabled = false;
    } else {
      validateButton.classList.remove('valid');
      validateButton.disabled = true;
    }
  });
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


