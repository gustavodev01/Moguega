document.addEventListener("DOMContentLoaded", function() {
  incluirHeader();
  incluirFooter();
});

function incluirHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o header:', error));
}

function incluirFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o footer:', error));
}