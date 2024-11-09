console.log("Arquivo geolocalizacao.js carregado");

// Função para obter a localização do usuário quando solicitado
function getUserLocation() {
    if ("geolocation" in navigator) {
        console.log("Geolocalização disponível no navegador.");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                // Converte latitude e longitude para endereço
                obterEndereco(latitude, longitude);
                
                // Envia a localização para o servidor (opcional)
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

// Função para converter coordenadas em endereço usando OpenStreetMap
function obterEndereco(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                document.getElementById("inputLocalizacao").value = data.display_name;
            } else {
                document.getElementById("inputLocalizacao").value = "Endereço não encontrado";
            }
        })
        .catch(error => {
            console.error("Erro ao obter endereço:", error);
            document.getElementById("inputLocalizacao").value = "Erro ao obter endereço";
        });
}

// Função para enviar a localização ao servidor
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
