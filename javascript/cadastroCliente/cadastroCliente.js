$(document).ready(function () {
    function showStep(stepToShow, stepToHide) {
        // Oculta a etapa atual e mostra a próxima etapa
        $(stepToHide).removeClass('active').hide();
        $(stepToShow).addClass('active').show();
    }

    $('#nextBtn').click(function () {
        showStep('#step-2', '#step-1');
    });
    
    $('#nextBtn2').click(function () {
        showStep('#step-3', '#step-2');
    });
    
    $('#backBtn').click(function () {
        showStep('#step-1', '#step-2');
    });

    $('#backBtn2').click(function () {
        showStep('#step-2', '#step-3');
    });

    // Validação de senha e finalização do cadastro
    $('#finishBtn').click(function () {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
        } else {
            alert('Cadastro concluído!');
            // Aqui você pode adicionar a lógica de envio do formulário
        }
    });
});