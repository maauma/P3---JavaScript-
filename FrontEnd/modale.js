// Récupération des éléments HTML
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("modalBtn");
const closeBtns = document.getElementsByClassName("close");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const gallery = document.getElementById("gallery");

const addPhotoModal = document.getElementById("addPhotoModal");
const addPhotoForm = document.getElementById("addPhotoForm");
const addPhotoFormPhotoName = document.getElementById("photoName");
const addPhotoFormPhotoCategory = document.getElementById("photoCategory");
const addPhotoFormPhotoFile = document.getElementById("photoFile");

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
  
    const img = document.createElement("img");
    img.src = image.imageUrl;
    imgContainer.appendChild(img);
  
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

// Événements sur les boutons
modalBtn.addEventListener("click", showModal);

Array.from(closeBtns).forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(modal);
    closeModal(addPhotoModal);
  });
});

window.addEventListener("click", event => {
  if (event.target == modal) {
    closeModal(modal);
  }
  if (event.target == addPhotoModal) {
    closeModal(addPhotoModal);
  }
});

addPhotoBtn.addEventListener("click", () => {
  addPhotoModal.style.display = "block";
});

addPhotoFormPhotoFile.addEventListener("change", event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const imgPreview = document.createElement("img");
    imgPreview.src = reader.result;
    imgPreview.style.maxWidth = "100%";
    imgPreview.style.maxHeight = "200px";

    addPhotoForm.insertBefore(imgPreview, addPhotoFormPhotoFile);
  });

  if (file) {
    reader.readAsDataURL(file);
  }
});


addPhotoForm.addEventListener("submit", event => {
  event.preventDefault();
  const photoName = addPhotoFormPhotoName.value;
  const photoCategory = addPhotoFormPhotoCategory.value;
  const photoFile = addPhotoFormPhotoFile.files[0];

  // Code pour envoyer la photo au serveur via une requête AJAX ou Fetch
  // ...

  closeModal(addPhotoModal);
});
