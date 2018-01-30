function onSuccessSaveInscription(data) {
    if (data.success == "ko") {
        if (data.msg == "exist") {
            $().toastmessage('showWarningToast', "Cet utilisateur existe déjà !");
        }
        else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'inscription.");
        }
    }
    else if (data.success = "ok") {
        document.location.href = "/formation/" + data.urlTraining;
    }
}

function onBeginSubmitForm(form) {
    $("." + form + " button").prop('disabled', true);
}

$(".form-inscription").validate({
    rules: {
        'lastname': "required",
        'firstname': "required",
        'email': {
            required: true,
            email: true,
        },
        'password': "required"
    },

    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorPlacement: function (error, element) {
        return false;  //Suppress all messages
    },
});

$("#BtnInscrire").on("click", function (e) {
    var idTrngSess = $("#listsessions option:selected").val();
    $("#idTrainingSession").val(idTrngSess);
});