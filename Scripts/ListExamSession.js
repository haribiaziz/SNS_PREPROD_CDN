function openPopupDeleteExam(idExamSession) {
    $("#idExamSessionDelete").val(idExamSession);
    $("#modalDeleteExamSession").modal();
}

function openmodulencours() {
    $("#modalEncours").modal();
}

function onSuccessDeleteExamSession(data) {
    $("#modalDeleteExamSession").modal('hide');
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Examen supprimé avec succès.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la suppression de l'examen.");
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}

$("#submitaddmembres").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembres option:selected"), function () {
        membres.push($(this).val());
    });
    $("#membresList").val(membres.join(","));
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

//Partie associer exam to session
$("#submitaddexamsession").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembresExam option"), function () {
        membres.push($(this).val());
    });
    $("#membresListExam").val(membres.join(","));
    $("#examId").val($('#examModel').find(":selected").val());
});

//Partie associer quiz
$("#submitaddquiz").on("click", function (e) {
    var membres = [];
    $.each($(".SelectMembresQuiz option"), function () {
        membres.push($(this).val());
    });  
    $("#membresListQuiz").val(membres.join(","));
    $("#examIdQuiz").val($('#examModelquiz').find(":selected").val());
});
//Partie associer quiz
$("#submitadddemande").on("click", function (e) {
    var membres = [];   
    $.each($(".SelectMembresQuiz option"), function () {
        membres.push($(this).val());
    });
    $("#membresListQuiz").val(membres.join(","));
    $("#examIdQuiz").val($('#examModelquiz').find(":selected").val());
});


function submitaddquizmembre(UserId) {

    var examIdQuiz = $('#examModelquiz').find(":selected").val();
    $.ajax({
        type: "POST",
        url: "/evaluationadmin/AddQuiz",
        data: { membresListQuiz: UserId, examIdQuiz: examIdQuiz },
        success: function (data) {
            if (data.etat == "ok") {
                $().toastmessage('showSuccessToast', "Invitation envoyée aux membres pour passer l'examen.");
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
            }
            else {
                $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres pour passer le quiz.");
            }
        }
    });

}

function submitquizmembre(UserId, IdModel) {
   
   
        $.ajax({
            type: "POST",
            url: "/evaluationadmin/AddQuiz",
            data: { membresListQuiz: UserId, examIdQuiz: IdModel },
            success: function (data) {
                if (data.etat == "ok") {
                    $().toastmessage('showSuccessToast', "Invitation envoyée aux membres pour passer l'examen.");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
                else {
                    $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres pour passer le quiz.");
                }
            }
        });

}

function onSuccessAddquiz(data) {
    $(".form-associer-quiz button").prop('disabled', false);
    if (data.etat == "ok") {
        $("#modalAssocierQuiz").modal('hide');
        $().toastmessage('showSuccessToast', "Invitation envoyée aux membres pour passer l'examen.");
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
    else {
        if (data.etat == "selectmember") {
            $().toastmessage('showWarningToast', "Vous devez sélectionner au moins un membre pour valider ce quiz.");
        }
        else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'invitation des membres pour passer le quiz.");
        }
    }
}
function onSuccessAddExamToSession(data) {
    $(".form-associer-exam button").prop('disabled', false);
    if (data.etat == "ok") {
        $("#modalAssocierExam").modal('hide');
        $().toastmessage('showSuccessToast', "Invitation envoyée aux membres pour passer l'examen.");
        setTimeout(function () {
            location.reload();
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

$('#searchExam').multiselect({
   
    search: {
        left: '<div><i style="display:none;right: 15px; position: absolute;top: 5px;" class="fa fa-spinner fa-pulse fa-2x fa-fw" id="loading-leftsearch"></i><input type="text" name="q" class="form-control" placeholder="Cherchez..." id="leftSearch" /></div>',
        right: '<input type="text" name="q" class="form-control" placeholder="Cherchez..." />',
    },
    fireSearch: function (value) {
        return value.length > 3;
    }
});

//le titre recoit par defaut le nom de l'exam model
$(document).on('change', '#examModel', function () {
    $("#titreExamSession").val($(".selectpicker option:selected").text());
});
//pour la 1er fois le titre recoit par defaut le nom de l'exam model
$(document).ready(function () {
    $("#titreExamSession").val($(".selectpicker option:selected").text());
});

$("#formationsListSelect").on("change", function (e) {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/listquestionnaires/" + $.base64.encode(idTraining);
});

$("#formationsListSelectmembre").on("change", function (e) {
    var idTraining = $("#formationsListSelectmembre option:selected").val();
    location.href = "/ListDemandeQuiz/" + $.base64.encode(idTraining);
});

$("#formationselearginingListSelect").on("change", function (e) {
    var idTraining = $("#formationselearginingListSelect option:selected").val();
    location.href = "/listquizs/" + $.base64.encode(idTraining);
});


$("#sessionsListSelect").on("change", function (e) {
    var idSession = $("#sessionsListSelect option:selected").val();
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/listquestionnaires/" + $.base64.encode(idTraining) + "/" + $.base64.encode(idSession);
});

function RedirectToEditTraining() {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/moncatalogue/editerFormationPresentiel/" + $.base64.encode(idTraining);
}

//Edit Session
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

function RedirectTolistquiz() {
    var idTraining = $("#idFormationCalendar").val();
    var passerquiz = true;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
function RedirectTononpasquizs() {
    var idTraining = $("#idFormationCalendar").val();
    var passerquiz = false;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
$("#leftSearch").keyup(function (event) {    
    var valsearch = $("#leftSearch").val();  
    if (valsearch === '' || valsearch === null) {       
        $("#searchExam").html("");       
    }
    else { 
        $("#loading-leftsearch").css("display", "block");
        $.ajax({
            type: "POST",
            url: "/getlistmemberbyquerry/" + valsearch,
            success: function (data) {               
                $("#searchExam").html(data.options);
                $("#loading-leftsearch").css("display", "none");
            }
        });
    }

});

function onSuccessImportMembre(data) {
    if (data.etat == "ok") {       
        $("#searchExam").html(data.options);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la modification de la session.");
    }
}