function onSuccessSaveInscriptionAdmin(data) {
    if (data.etat == "ok") {
        $("#ModalAddUser").modal("hide");
        $().toastmessage('showSuccessToast', "User ajouté avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        if (data.etat == "emailExiste") {
            $().toastmessage('showWarningToast', "L'adresse mail est déja utilisée.");
        }
        else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'ajout de user.");
        }
    }
}

function beforeShowActivDesactiveModal(idUser, etat) {
    $("#idUserActDes").val(idUser);
    if (etat == "ACTIVE") {
        $("#disableUser").show();
        $("#h4disableUser").show();
        $("#activerUser").hide();
        $("#h4activerUser").hide();
    }
    else {
        $("#disableUser").hide();
        $("#activerUser").show();
        $("#h4disableUser").hide();
        $("#h4activerUser").show();
    }
}

function onSuccessEditEtatAdmin(data) {
    if (data.etat == "ok") {
        $("#activerDesactiverUser").modal("hide");
        $().toastmessage('showSuccessToast', "Etat modifié avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la modification de l'état.");
    }
}


$("#validAddUser").click(function () {
    if (!$("#historyCheck").is(':checked')) {
        $("#historyCheck").attr("value", false);
        $("#informerUser").attr("value", false);
    }
    else {
        $("#historyCheck").attr("value", true);
        $("#informerUser").attr("value", true);
    }
});

function initDeleteUser(idUser) {
    $("#idUserDelete").val(idUser);
}

function onSuccessDeleteAdmin(data) {
    if (data.etat == "ok") {
        $("#delete-modal").modal("hide");
        $().toastmessage('showSuccessToast', "User supprimé avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la suppression du user.");
    }
}

function initInitPwd(idUser) {
    $("#idUserInit").val(idUser);
}

function onSuccessInitPwdAdmin(data) {
    if (data.etat == "ok") {
        $("#myModalInitMotPassMode").modal("hide");
        $().toastmessage('showSuccessToast', "Mot de passe initialisé avec succès.");
    }
    else {
        if (data.etat == "confirmNotPwd") {
            $().toastmessage('showWarningToast', "Mot de passe et confirmation ne sont pas identiques.");
        }
        else {
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'initialisation du mot de passe.");
        }
    }
}


$('.unmaskPwd').on('click', function () {
    if ($("#pwd").attr('type') == 'password')
        changeType($("#pwd"), 'text');

    else
        changeType($("#pwd"), 'password');

    return false;
});

$('.unmaskConfirm').on('click', function () {
    if ($("#confirmPwd").attr('type') == 'password')
        changeType($("#confirmPwd"), 'text');

    else
        changeType($("#confirmPwd"), 'password');

    return false;
});


function changeType(x, type) {
    if (x.prop('type') == type)
        return x; // ça serait facile.
    try {
        // Une sécurité d'IE empêche ceci
        return x.prop('type', type);
    }
    catch (e) {
        // On tente de recréer l'élément
        // En créant d'abord une div
        var html = $("<div>").append(x.clone()).html();
        var regex = /type=(\")?([^\"\s]+)(\")?/;
        // la regex trouve type=text ou type="text"
        // si on ne trouve rien, on ajoute le type à la fin, sinon on le remplace
        var tmp = $(html.match(regex) == null ?
           html.replace(">", ' type="' + type + '">') :
           html.replace(regex, 'type="' + type + '"'));

        // on rajoute les vieilles données de l'élément
        tmp.data('type', x.data('type'));
        var events = x.data('events');
        var cb = function (events) {
            return function () {
                //Bind all prior events
                for (i in events) {
                    var y = events[i];
                    for (j in y) tmp.bind(i, y[j].handler);
                }
            }
        }(events);
        x.replaceWith(tmp);
        setTimeout(cb, 10); // On attend un peu avant d'appeler la fonction
        return tmp;
    }
}

////////////// Articles Achetés  /////////////////////
function onSuccessArticlesAchetes() {
    $("#popupArticlesAchetes").css("display", "block");
    $("#modalArticlesAchetes").modal("show");
}

function onSuccessSaveArticlesUserAdmin(data) {
    $("#modalArticlesAchetes").modal("hide");
    if (data.etat == "ok") {
        $().toastmessage('showSuccessToast', "Acrticles affectés avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'affectation des articles.");

    }
}

//Abonnements
function onSuccessAbonnement() {
    $("#modalAbonnement").modal("show");
}
//Commandes
function onSuccessAffecterCommande() {
    $("#modalCommandes").modal("show");
}
function onSuccessSaveAbonnementUserAdmin(data) {
    if (data.etat == "ok") {
        $("#modalAbonnement").modal("hide");
        $().toastmessage('showSuccessToast', "Abonnement affecté avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de l'affectation de l'abonnement.");
    }
}

//Edit TRAINER
function onSuccessEditTrainer() {
    $("#modalEditTrainer").modal("show");
}

function onSuccessSaveEditTrainerAdmin(data) {
    if (data.etat == "ok") {
        $("#modalEditTrainer").modal("hide");
        $().toastmessage('showSuccessToast', "Trainer mise à jour avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la mise à jour du trainer.");
    }
}
//Edit USER

function onSuccessEditUserPopup() {
    $("#modalEditUser").modal("show");
}
function onSuccessSaveEditUserAdmin(data) {
    if (data.etat == "ok") {
        $("#modalEditUser").modal("hide");
        $().toastmessage('showSuccessToast', "User mise à jour avec succès.");
        setTimeout(function () {
            window.location.reload();
        }, 1500);
    }
    else {
        if (data.etat == "mailexist")
        {
            $("#modalEditUser").modal("hide");
            $().toastmessage('showWarningToast', "L'adresse mail est déja utilisée, une erreur s'est produite.");
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        }
        else
        {
            $("#modalEditUser").modal("hide");
            $().toastmessage('showWarningToast', "Une erreur s'est produite lors de la mise à jour du user.");
        }
        
    }
}