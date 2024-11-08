$(document).ready(function () {
    function showStep(stepToShow, stepToHide) {
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

    $('#finishBtn').click(async function () {
        const password = $('#txtSenha').val();
        const confirmPassword = $('#txtConfirmaSenha').val();

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        const data = {
            nome: $('#txtPrimeiroNome').val(),
            sobrenome: $('#txtSobrenome').val(),
            email: $('#txtEmail').val(),
            celular: $('#txtCelular').val(),
            ativo: true,
            recebe_novidade: $('#txtRecebeUpdate').is(':checked'),
            sexo: $('#cmbSexo').val(),
            senha: password
        };

        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Cadastro concluído com sucesso!');
                window.location.href = '/';
            } else {
                alert(`Erro ao cadastrar: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao cadastrar cliente.');
        }
    });
});
