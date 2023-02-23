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
// Sélectionne la div "bloc_preview"
const previewBlock = document.querySelector('.bloc_preview');



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

  // Ajout des nouvelles images dans la modale
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
  const token = localStorage.getItem("token");
  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      console.log(`Image with id ${imageId} has been deleted`);
      // Supprimer l'élément HTML correspondant à l'image
      const imgContainer = document.querySelector(`.gallery[data-id="${imageId}"]`);
      imgContainer.remove();
    } else {
      console.error(`Error deleting image with id ${imageId}`);
    }
  })
  .catch(error => {
    console.error(`Error deleting image with id ${imageId}: ${error}`);
  });
}

function uploadImage() {
  const token = localStorage.getItem("token");
  const photoName = addPhotoFormPhotoName.value;
  const photoCategory = addPhotoFormPhotoCategory.value;
  const photoFile = addPhotoFormPhotoFile.files[0];

  const formData = new FormData();
  formData.append("photoName", photoName);
  formData.append("photoCategory", photoCategory);
  formData.append("photoFile", photoFile);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log("Image uploaded successfully");
      // Fermer la fenêtre modale et afficher la galerie
      hideModal(addPhotoModal, addPhotoForm);
      showModal();
    } else {
      console.error("Error uploading image");
    }
  })
  .catch(error => {
    console.error(`Error uploading image: ${error}`);
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

// Fonction pour envoyer la photo vers l'API
function uploadImage() {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const photoName = addPhotoFormPhotoName.value;
  const photoCategory = addPhotoFormPhotoCategory.value;
  const photoFile = addPhotoFormPhotoFile.files[0];

  const formData = new FormData();
  formData.append("photoName", photoName);
  formData.append("photoCategory", photoCategory);
  formData.append("photoFile", photoFile);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log("Image uploaded successfully");
      // Fermer la fenêtre modale et afficher la galerie
      hideModal(addPhotoModal, addPhotoForm);
      showModal();
    } else {
      console.error("Error uploading image");
    }
  })
  .catch(error => {
    console.error(`Error uploading image: ${error}`);
  });
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

addPhotoBtn.addEventListener("click", () => {
  uploadImage();
});

// Ajoute un événement de clic sur le bouton "addPhotoDiv"
addPhotoButton.addEventListener('click', () => {
  // Ouvre la boîte de dialogue de sélection de fichiers
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = false;
  input.onchange = (event) => {
    // Récupère le fichier sélectionné
    const file = event.target.files[0];
  // Crée un objet FileReader pour lire le contenu du fichier
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    // Crée un élément img pour l'aperçu de l'image
    const imageElement = document.createElement('img');
    imageElement.src = event.target.result;

    // Remplace le contenu de la div "bloc_preview" par l'aperçu de l'image
    previewBlock.innerHTML = '';
    previewBlock.appendChild(imageElement);
  };
};
input.click();
});