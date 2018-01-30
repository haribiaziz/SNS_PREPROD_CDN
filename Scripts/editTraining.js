function onSuccessSaveEditTraining(data) {
    $("#submitedittrng").prop('disabled', false);
    if (data.etat == "ok") {
        $("#submitedittrng").attr('disabled', 'disabled');
        $().toastmessage('showSuccessToast', "Opération effectuée avec succès.");
        setTimeout(function () {
            window.location.href = "/tutoriel/" + data.url;
        }, 2000);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur c'est produite lors de la modification de la formation.");
    }
}

jQuery.validator.addMethod("mynumber", function (value, element) {
    return this.optional(element) || /^(\d+|\d+,\d{1,2})$/.test(value);
}, "Please specify the correct number format");

$('textarea').summernote({
    dialogsInBody: true
});

$(".form-edit-proposition-elearning").validate({
    rules: {
        'Title': "required",
        'TrainingPrice': {
            mynumber: true,
        },
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