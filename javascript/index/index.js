document.addEventListener("DOMContentLoaded", function() {
  incluirHeader();
});

function incluirHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o header:', error));
}