document.addEventListener("DOMContentLoaded", function() {
  incluirHeader();

  const inputLocalizacao = document.getElementById("abrirModal");
  const botaoVerBarbearias = document.getElementById("botaoVerBarbearias");
  const modal = new bootstrap.Modal(document.getElementById('locationModal'));

  // Verifica se o elemento existe antes de adicionar o evento
  if (inputLocalizacao) {
      inputLocalizacao.addEventListener("click", function () {
          modal.show();
      });
  } else {
      console.error("Elemento com id 'abrirModal' não encontrado.");
  }

  // Adiciona evento de clique ao botão para abrir o modal
  if (botaoVerBarbearias) {
      botaoVerBarbearias.addEventListener("click", function () {
          modal.show();
      });
  } else {
      console.error("Elemento com id 'botaoVerBarbearias' não encontrado.");
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