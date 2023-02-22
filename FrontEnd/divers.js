const token = localStorage.getItem('token');
if (token) {
  const loginElement = document.getElementById('login');

if (localStorage.getItem('token')) {
  loginElement.textContent = 'Logout';
}

loginElement.addEventListener('click', function() {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    location.reload(); // Recharge la page
  }
  loginElement.textContent = 'Login';
});

  // Envoie le token avec chaque requête vers le serveur pour authentifier l'utilisateur
}