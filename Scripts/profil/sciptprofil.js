$(document).ready(function () {
  
    if (!$('#checkbox-professionnel').is(':checked')) {
        
        $(".block-professionne").hide()
    }
    else {       
        $(".block-professionne").show()
      
    }
    $('#checkbox-professionnel').click(function () {       
        if ($('#checkbox-professionnel').is(':checked')) {
            $(".block-professionne").show()
        }
        else {
            $(".block-professionne").hide()
        }

    });   
})
var $imageupload = $('.imageupload');
$imageupload.imageupload({   
    maxFileSizeKb: 512
});



$('#datetimepicker4').datetimepicker({
    format: 'DD/MM/YYYY',
    pickTime: false
});

$(".form-info-personnel").validate({

    rules: {
        'infoUser.FirstName': "required",
        'infoUser.LastName': "required",
        'infoUser.Email': {
            required: true,
            email: true,
            notAllowedSmartnskilledDomain: true
        },
    },
    messages: {
        'infoUser.FirstName': "Veuillez saisir votre nom svp",
        'infoUser.LastName': "Veuillez saisir votre prénom svp",
        'infoUser.Email': "Veuillez saisir votre adresse mail (l'email ne doit pas appartenir au domaine SmartnSkilled)"
    },

    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');        
    },
    errorContainer: ".form-info-personnel .alert",
    errorLabelContainer: ".form-info-personnel .alert",
});

$.validator.addMethod('notAllowedSmartnskilledDomain', function (value) {
    return /^([\w-.]+@(?!SmartnSkilled\.([a-z]{1,6}))([\w-]+.)+[\w-]{2,4})?$/.test(value.toLowerCase());
}, 'Free email addresses are not allowed.');

$(".form-professionnel").validate({
    rules: {
        'selectedFunctionId': {
            required: '#checkbox-professionnel:checked'
        },
        'professionnel.NomStruct': {
            required: '#checkbox-professionnel:checked'
        },
        'professionnel.Trainer': {
            required: '#checkbox-professionnel:checked'
        },
        'professionnel.PhoneTrainer': {
            required: '#checkbox-professionnel:checked'
        },
        'professionnel.EmailTrainer': {
            email: true,
            notAllowedSmartnskilledDomain: true,
            required: '#checkbox-professionnel:checked'
        }
    },
    messages: {
        'selectedFunctionId': "Veuillez choisir votre profession svp",
        'professionnel.NomStruct': "Veuillez saisir le nom de votre employeur svp",
        'professionnel.EmailTrainer': "Veuillez saisir l'email du formateur (l'email ne doit pas appartenir au domaine Smartnskilled)",
        'professionnel.Trainer': "Veuillez saisir le nom et prénom du formateur svp",
        'professionnel.PhoneTrainer': "Veuillez saisir le N° de télèphone svp"
    },

    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorContainer: ".form-professionnel .alert",
    errorLabelContainer: ".form-professionnel .alert",
});

function onBeginProfilForm(form) {
    $("." + form + " button").prop('disabled', true);
}
function onSuccessProfilForm(data) {  
    $("#companyId").val(data.compId);
    $("." + data.form + " button").prop('disabled', false);
    $("." + data.form + " button").append("<i class='fa fa-check-circle'></i>");
    $().toastmessage('showSuccessToast', "Sauvegarde effectuée avec succès.");
    setTimeout(function () { $("." + data.form + " button .fa-check-circle").remove(); }, 5000);
}

function onSuccessSubmitPersonnelForm(res) {

    onSuccessProfilForm(res);
    $("#userbox figure").html("<img class='img-circle' src='" + res.img + "'  height='24' />");
}

function onSuccessReinitialiserPwd(data)
{
    $("#btnRePwd").prop("disabled", false);
    if( data.etat == "ok")
    {
        $().toastmessage('showSuccessToast', "Mot de passe réinitialisé avec succès.");
    }
    else
    {
        $().toastmessage('showWarningToast', "L'ancienne mot de passe n'existe pas, veuillez vérifier svp.");
    }
}