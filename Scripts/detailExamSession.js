function onSuccessAddMembreToExamSession(data) {
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Membre Ajouté avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Erreur lors de l'ajout !");
    }
}

function openPopupDeleteMembre(membreExamSessionId, examSessionId) {
    $("#membreExamSessionId").val(membreExamSessionId);
    $("#examSessionId").val(examSessionId);
    $("#modalDeleteMembre").modal();
}

function openmodulencours() {
    $("#modalEncours").modal();
}

function opendetailsQuestionnaire(idQuestionnaire, membreSessionId, ExamenId)
{
    //Initialiser le contenue du popup
    //$.ajax({
    //    url: "/detailresultquestionnaire/" + $.base64.encode(idQuestionnaire) + "/" + membreSessionId + "/" + membreExamSessionId,
    //    success: function (data) {
    //        $("#contenuePopup").html(data);
    //    }
    //});  

    //$("#modalDetailQuestionnaire").modal();
    location.href = "/detailresultquestionnaire/" + $.base64.encode(idQuestionnaire) + "/" + $.base64.encode(membreSessionId) + "/" + $.base64.encode(ExamenId);
}


function onSuccessDeleteMembre(data) {
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Membre supprimé avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la suppression du membre.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}

$("#submitaddmembres").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembres option"), function () {
        membres.push($(this).val());
    });
    $("#membresListExam").val(membres.join(","));
});



function onSuccessInvitMembre(data) {
    $("#modalInviterMembre").modal('hide');
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Invitations envoyées avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres.");
    }
}

$('#searchExam').multiselect({
    search: {
        left: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
        right: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
    },
    fireSearch: function (value) {
        return value.length > 3;
    }
});

$("#formationsListSelect").on("change", function (e) {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/detailexamsession/" + $.base64.encode(idTraining);
});
$("#formationsListQuizSelect").on("change", function (e) {
    var idTraining = $("#formationsListQuizSelect option:selected").val();
    var passerquiz = true;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
});
function RedirectTononpasquizs() {
    var idTraining = $("#idFormationCalendar").val();
    var passerquiz = false;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
function RedirectTolistquizs() {
    var idTraining = $("#idFormationCalendar").val();
    var passerquiz = true;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
$("#sessionsListSelect").on("change", function (e) {
    var idSession = $("#sessionsListSelect option:selected").val();
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/detailexamsession/" + $.base64.encode(idTraining) + "/" + $.base64.encode(idSession);
});
$("#questionnaireListSelect").on("change", function (e) {
    var idSession = $("#sessionsListSelect option:selected").val();
    var idTraining = $("#formationsListSelect option:selected").val();
    var idQuestionnaire = $("#questionnaireListSelect option:selected").val();
    location.href = "/detailexamsession/" + $.base64.encode(idTraining) + "/" + $.base64.encode(idSession) + "/" + $.base64.encode(idQuestionnaire);
});

function redirectToEditQuestionnaire() {
    var idQuestionnaire = $("#questionnaireListSelect option:selected").val();
    location.href = "/calendriercentre/editexamsession/" + $.base64.encode(idQuestionnaire);

}
function RedirectToEditTraining() {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/moncatalogue/editerFormationPresentiel/" + $.base64.encode(idTraining);
}

$('#dateFinSession').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});

$('#dateDebutSession').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});



function onSuccessEditSession(data) {
    if (data.etat == "ok") {
        $("#modalEditSession").modal('hide');
        $().toastmessage('showSuccessToast', "Session modifiée avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la modification de la session.");
    }
}