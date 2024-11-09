console.log("Arquivo geolocalizacao.js carregado");

// Verifica se o navegador suporta geolocalização
function obterLocalizacaoUsuario() {
    if ("geolocation" in navigator) {
        console.log("Geolocalização disponível no navegador.");
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                enviarLocalizacaoParaServidor(latitude, longitude);
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Permissão para acessar a localização foi negada.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("A localização está indisponível.");
                        break;
                    case error.TIMEOUT:
                        alert("O tempo para obter a localização expirou.");
                        break;
                    default:
                        alert("Ocorreu um erro desconhecido.");
                        break;
                }
            }
        );
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }
}

function enviarLocalizacaoParaServidor(latitude, longitude) {
    console.log("Enviando localização para o servidor...");

    fetch('/api/localizacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Localização enviada com sucesso:", data);
    })
    .catch((error) => {
        console.error("Erro ao enviar localização:", error);
    });
}

document.addEventListener("DOMContentLoaded", obterLocalizacaoUsuario);
