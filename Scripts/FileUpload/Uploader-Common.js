function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        var percentComplete = Math.round(e.loaded * 100 / e.total);
        $("#FileProgress").css("width", percentComplete + '%').attr('aria-valuenow', percentComplete);
        $('#FileProgress span').text(percentComplete + "%");
    }
    else {
        $('#FileProgress span').text('unable to compute');
    }
}

function completeHandler() {
    $('#createView').empty();
    $('.CreateLink').show();
    $.unblockUI();
}


function successHandler(data) {
    if (data.statusCode == 200) {
        //$('#FilesList tr:last').after(data.NewRow);
        if (data.typeDoc == "PPT") {
        $("#docPPT").html(data.html);
            //alert(data.html);
        $().toastmessage('showSuccessToast', "Présentation Uploadé avec succès");
        }
        else if (data.typeDoc == "VIDEO") {
            $("#docVideo").html(data.html);
            $().toastmessage('showSuccessToast', "Vidéo Uploadé avec succès");
        }
        else if (data.typeDoc == "RESSOURCE") {
            $("#docRessource").html(data.html);
            $().toastmessage('showSuccessToast', "Ressource Uploadé avec succès");
        }
        else if (data.typeDoc == "i") {
            $().toastmessage('showSuccessToast', "Image(s) Uploadé avec succès");
        }
        else if (data.typeDoc == "a") {
            $().toastmessage('showSuccessToast', "Partial Uploadé avec succès");
        }
       //$().toastmessage('showSuccessToast', "Opération effectuée avec sucès");
    }
    else {
        //alert(data.status);
        $().toastmessage('showWarningToast', "Erreur !!");
    }
}

function errorHandler(xhr, ajaxOptions, thrownError) {
    alert("There was an error attempting to upload the file. (" + thrownError + ")");
}

function OnDeleteAttachmentSuccess(data) {

    if (data.ID && data.ID != "") {
        $('#Attachment_' + data.ID).fadeOut('slow');
    }
    else {
        alter("Unable to Delete");
        console.log(data.message);
    }
}

function Cancel_btn_handler() {
    $('#createView').empty();
    $('.CreateLink').show();
    $.unblockUI();
}