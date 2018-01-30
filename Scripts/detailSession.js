function onSuccessAddMembreToSession(data) {
    $(".form-associer-exam button").prop('disabled', false);
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Membre(s) ajouté(s) avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Erreur lors de l'ajout !");
    }
}

function onSuccessAddNewMembreToSession(data) {
    $(".form-associer-exam button").prop('disabled', false);
    if (data.etat == "ok") {
        //Initialiser les inputs
        $("#formaddmembretosession input").val('');
        $().toastmessage('showSuccessToast', "Membre(s) ajouté(s) avec succès.");
        //Ajouter membre au table
        var ligne = "<tr role='row' class='odd'><td>" + data.email + "</td><td>" + data.nom + " " + data.prenom + "</td><td>En attente</td>";
        ligne = ligne + "<td></td><td class='center'><em><a class='fa fa-user-times btn-delte cursor' data-toggle='modal' style='color:#ff0000' title='Supprimer membre' onclick='openPopupDeletMembre(" + data.idMembre + ")'></a></em></td>";
        ligne = ligne + "</tr>";
        $("#tbodyListMembre").append(ligne);
        $(".table-responsive").show();
        $(".listMembresVide").hide();
       
    }
    else {
        $().toastmessage('showWarningToast', "Erreur lors de l'ajout !");
    }
}


function onSuccessDeleteMembre(data) {
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Membre supprimé avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Erreur lors de la suppression !");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
}
function onSuccessInvitMembre(data) {
    $("#modalInviterMembre").modal('hide');
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Invitations envoyées avec succès.");
        $("#adressesEmails").val("");
        //setTimeout(function () {
        //    location.reload();
        //}, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres.");
    }
}
function openPopupDeletMembre(ExamMemberId) {
    $("#idMembreSessionDelete").val(ExamMemberId);
    $("#modalDeleteMembre").modal();
}
//Partie add membre
$("#submitaddmembres").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembres option"), function () {
        membres.push($(this).val());
    });
    $("#membresList").val(membres.join(","));
});

//Partie associer exam to session
$("#submitaddexamsession").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembresExam option"), function () {
        membres.push($(this).val());
    });
    $("#membresListExam").val(membres.join(","));
    $("#examId").val($('#examModel').find(":selected").val());
});




function onSuccessAddExamToSession(data) {
    $(".form-associer-exam button").prop('disabled', false);
    $("#modalAssocierExam").modal('hide');
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Invitation envoyée aux membres pour passer l'examen.");
        setTimeout(function () {
            var idTraining = data.idTraining;
            var idTrainingSession = data.idTrainingSession;
            var idExamSession = data.idExamSession;
            location.href = "/detailexamsession/" + $.base64.encode(idTraining) + "/" + $.base64.encode(idTrainingSession) + "/" + $.base64.encode(idExamSession);
        }, 1500);
    }
    else {
        if (data.etat == "selectmember") {
            $().toastmessage('showWarningToast', "Vous devez sélectionner au moins un membre pour valider cet examen.");
        }
        else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres pour passer l'examen.");
        }
    }
}

$('#search').multiselect({
    search: {
        left: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
        right: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
    },
    fireSearch: function (value) {
        return value.length > 3;
    }
});
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
    location.href = "/detailssession/" + $.base64.encode(idTraining);
});

$("#sessionsListSelect").on("change", function (e) {
    var idSession = $("#sessionsListSelect option:selected").val();
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/detailssession/" + $.base64.encode(idTraining) + "/" + $.base64.encode(idSession);
});

function RedirectToEditTraining() {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/moncatalogue/editerFormationPresentiel/" + $.base64.encode(idTraining);
}

//Edit session
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
        $("#regionEditSession").show();
        $().toastmessage('showSuccessToast', "Session modifiée avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la modification de la session.");
    }
}