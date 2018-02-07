$(document).ready(function () {
    $("#liEvaluation").addClass("active");
    $("#liTabBord").removeClass("active");
    $("#liProposition").removeClass("active");
    $("#liCalendrier").removeClass("active");

    $('#submitimporter').click(function (event) {

        onBeginSubmit();
        event.preventDefault();
        if ($('#formImportEval')[0].checkValidity()) {
            $("#loading-form-import-exam").css("display", "block")
            var dataString;
            var action = $("#formImportEval").attr("action");
            if ($("#formImportEval").attr("enctype") == "multipart/form-data") {
                dataString = new FormData($("#formImportEval").get(0));
                contentType = false;
                processData = false;
            } else {
                // regular form, do your own thing if you need it
            }
            $.ajax({
                type: "POST",
                url: action,
                data: dataString,
                dataType: "json", //change to your own, else read my note above on enabling the JsonValueProviderFactory in MVC
                contentType: contentType,
                processData: processData,
                success: function (data) {
                    $().toastmessage('showSuccessToast', "Import effectué avec succès.");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //do your own thing
                }
            });
        }
    });
    $("#submitimporter").click(function (event) {

    }); //end .submit()
});


$("#validcreateQuestionnaire").on("click", function (e) {
    $.each($(".SelecttrainingPresentielCreate option:selected"), function () {
        $("#trainingId").val($(this).val());
    });
});

$("#submitimporter").on("click", function (e) {
    onBeginSubmit();
    $.each($(".SelecttrainingPresentiel option:selected"), function () {
        $("#trainingPresentielId").val($(this).val());
    });
});

function onSuccessImportEvaluation(data) {

    if (data.etat == "ok") {
        $("#submitimporter").attr('disabled', 'disabled');
        $().toastmessage('showSuccessToast', "Import effectué avec succès.");
        setTimeout(function () {
            window.location.href = "/questionnairedetail/" + $.base64.encode(data.idEval);
        }, 2500);
    }
    else {
        $("#submitimporter").attr('disabled', 'disabled');
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'import de l'évaluation.");

    }
}
function onSuccessAddEval(data) {

    if (data.idEval != "-1") {
        window.location.href = "/questionnairedetail/" + $.base64.encode(data.idEval);
    }
    else {
        $().toastmessage('showWarningToast', "Erreur lors de la création de l'évaluation.");
    }
}
function openPopupDeletEval(idEval) {
    $("#idEvalDelete").val(idEval);
    $("#modalDeleteEval").modal();
}

function onSuccessDeleteEval() {
    location.reload();
}
function openPopupModifModel(idEval) {
    $("#idEvalDelete").val(idEval);
    $("#modalModifModel").modal();
}

function openPopupAddExam(idEval, titreEval) {
    $("#idEvalExam").val(idEval);
    $("#titreEval").val(titreEval);
    $("#modalAddExam").modal();
}
$('#dateFinExam').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});
$('#dateDebutExam').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});

function onSuccessAddExam(data) {
    if (data.msg == "ErreurDFDD") {
        $().toastmessage('showWarningToast', "La date de fin doit être supérieure ou égale à la date du début de l'examen.");
    }
    else {
        window.location.href = "evaluationadmin/detailexam/" + data.idExam;
    }
}

(function ($) {
    'use strict';
    var datatableInit = function () {
        $('#datatable-details').dataTable(
            {
                //Si la nbr de records <10 ne pas afficher la pagination
                "bPaginate": $('#datatable-details tbody tr').length > 10,
                "iDisplayLength": 10,
                "bAutoWidth": false,
                "aoColumnDefs": [
                    { "bSortable": true, "aTargets": [0, 2] }
                ],
                searching: false,
                lengthChange: false,
                "bInfo": false,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.13/i18n/French.json"
                }
            }
            );
    };
    $(function () {
        datatableInit();
    });
}).apply(this, [jQuery]);

function RedirectTolistquizs() {
    var idTraining = $("#idFormationCalendar").val();

    var passerquiz = true;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
function RedirectTononpasquizs() {
    var idTraining = $("#idFormationCalendar").val();
    console.log("111");
    var passerquiz = false;
    location.href = "/listquizs/" + $.base64.encode(idTraining) + "/" + passerquiz;
}
function RedirectToEditTraining() {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/moncatalogue/editerFormationPresentiel/" + $.base64.encode(idTraining);
}
$("#formationsListSelect").on("change", function (e) {
    var idTraining = $("#formationsListSelect option:selected").val();
    location.href = "/modeles/" + $.base64.encode(idTraining);
});

function RedirectTolistquestionnaires() {
    var idTraining = $("#idFormationCalendar").val();
    location.href = "/listquestionnaires/" + $.base64.encode(idTraining);
}
