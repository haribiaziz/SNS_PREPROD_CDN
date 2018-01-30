$('#dateFinSession').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});

$('#dateDebut').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});

function onSuccessAddTrainer(data) {
    if (data.erreur == false) {
        $().toastmessage('showSuccessToast', "Formateur ajoutée avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "L'email est déja utilisé pour un compte utilisateur. Merci de contacter notre support.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
}



$('#descriptionTrainer').summernote({
    dialogsInBody: true
});

function onSuccessAddTrngSession(data) {
    if (data.etat == "ok") {
        $("#submitaddtrng").attr('disabled', 'disabled');
        $().toastmessage('showSuccessToast', "Session formation ajoutée avec succès.");
        setTimeout(function () {
            var idTrainingSession = $.base64.encode(data.idSessionTraining);
            var idTraining = $.base64.encode(data.idTraining);
            window.location.href = "/detailssession/" + idTraining + "/" + idTrainingSession;
        }, 1500);
    }
    else {
        if (data.etat == "DfSupDd") {
            $().toastmessage('showWarningToast', "La date de fin doit être supérieure ou égale à la date du début de la session.");
        } else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'ajout de la session formation.");
        }
    }
}

$(function () {
    $('#cp3').colorpicker()
});

