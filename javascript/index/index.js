document.addEventListener("DOMContentLoaded", function() {
  incluirHeader();

  const abrirModal = document.getElementById("abrirModal");

  // Verifica se o elemento existe antes de adicionar o evento
  if (abrirModal) {
      abrirModal.addEventListener("click", function () {
          const modal = new bootstrap.Modal(document.getElementById('locationModal'));
          modal.show();
      });
  } else {
      console.error("Elemento com id 'abrirModal' não encontrado.");
  }
});

function incluirHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o header:', error));
}