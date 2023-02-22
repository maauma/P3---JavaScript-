// Récupération des éléments du formulaire
const formulaireLogin = document.querySelector('#id_login');
const emailInput = document.querySelector('#id_identifiants');
const passwordInput = document.querySelector('#id_mdp');
const loginButton = document.querySelector('#login');

// URL de l'API pour vérifier les utilisateurs
const apiUrl = 'http://localhost:5678/api/users/login';

// Fonction pour vérifier si un token est présent dans le stockage local
export function checkToken() {
    const token = localStorage.getItem('token');
    alert('Vous êtes déjà connecté !');
    return token !== null;
  }

// Fonction pour envoyer une requête FETCH à l'API
export async function authenticateUser(email, password) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Identifiants invalides');
  }
  const data = await response.json();
  return data.token;
}

// Fonction pour stocker le token dans le stockage local
 function storeToken(token) {
  localStorage.setItem('token', token);
}

// Fonction pour gérer la connexion de l'utilisateur
async function handleLogin(event) {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    const token = await authenticateUser(email, password);
    storeToken(token);
    alert('Vous êtes connecté !');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Identifiants de connexion incorrects. Veuillez réessayer.');
    console.error(error);
  }
}

// Ajout d'un écouteur d'événement au formulaire
formulaireLogin.addEventListener('submit', handleLogin);
