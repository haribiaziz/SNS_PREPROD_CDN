$('#searchExam').multiselect({
    search: {
        left: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
        right: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
    },
    fireSearch: function (value) {
        return value.length > 3;
    }
});

//Partie associer exam to session
$("#submiteditexamsession").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembresExam option"), function () {
        membres.push($(this).val());
    });
    $("#membresListExam").val(membres.join(","));
    $("#examId").val($('#examModel').find(":selected").val());
});

function onSuccessSaveSession(data) {
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Modification effectuée avec succès.");
        setTimeout(function () {
            var idExamSession = $.base64.encode(data.idExamSession);
            var idSession = $.base64.encode(data.idSession);
            var idTrainingSession = $.base64.encode(data.idTrainingSession);
            location.href = "/detailexamsession/" + idTrainingSession + "/" + idSession + "/" + idExamSession;
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la modification de l'examen.");
    }

}