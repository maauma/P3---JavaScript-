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
    const img = document.createElement("img");
    img.src = image.imageUrl;
    gallery.appendChild(img);
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

addPhotoForm.addEventListener("submit", event => {
  event.preventDefault();
  const photoName = addPhotoFormPhotoName.value;
  const photoCategory = addPhotoFormPhotoCategory.value;
  const photoFile = addPhotoFormPhotoFile.files[0];

  // Code pour envoyer la photo au serveur via une requête AJAX ou Fetch
  // ...

  closeModal(addPhotoModal);
});

