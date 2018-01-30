

var w = 0;
$(document).ready(function () {
    $('.skin-flat input').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red'
    });

    $("#formAddEvaluation > .row").click(function () {
        $('html,body').animate({
            scrollTop: $(this).offset().top - ($(window).height() - $(this).outerHeight(true)) / 2
        }, 500);
    })

    $("#submitQuiz").click(function () {
        $("#formAddEvaluation .row").each(function () {
            var count = 0;
            $(this).find(".iradio_flat-blue").each(function () {
                var input = $(this).find("input");
                var name = input.attr("name").split('.');
                input.attr("name", name[0] + "." + name[1] + ".listChoices[" + count + "].choiceValide")
                count++;
            })
        })
        $("#submitQuiz i").show();
        $("#formAddEvaluation").submit();
    })
    getActiveBlock();
    $('#progression-quiz').scrollToFixed({
        bottom: 0,
        limit: $('#progression-quiz').offset().top,
        preFixed: function () { $(this).css('margin-bottom', '0px'); },
        postFixed: function () { $(this).css('margin-bottom', '-50px'); }
    });
    var pourcentageQuiz = parseFloat(100 / $('#formAddEvaluation .row').size())
    $('#formAddEvaluation input').on('ifToggled', function (event) {
        var nbrReponse = 0;
        var checkbox = $(this).closest(".icheckbox_flat-blue, .iradio_flat-blue");

        checkbox.toggleClass("checked");
        if (checkbox.hasClass("checked")) {
            checkbox.find("input").attr("value", true)
        }
        else {
            checkbox.find("input").attr("value", false)
        }

        $("#formAddEvaluation .row").each(function () {
            if ($(this).find(".icheckbox_flat-blue.checked, .iradio_flat-blue.checked").length > 0)
                nbrReponse = nbrReponse + 1;
        })
        $(".fill-parogression-quiz").css("width", parseInt(nbrReponse * pourcentageQuiz) + "%");
        $(".numeric-progression-quiz").html("<b>" + parseInt(nbrReponse * pourcentageQuiz) + "% </b> Completer")
    });
});
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());

    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
        'total': t,

        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 60000) {
            $("#clockdiv div >").css({
                background: '#F71208'
            });
        }
        if (t.total <= 0) {
            $("#formAddEvaluation").submit();
            clearInterval(timeinterval);
        }
        $("#time").val(t.total);
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);

}
$(document).scroll(function () {
    w = $(window).scrollTop();
    getActiveBlock();
});
function getActiveBlock() {
    var middleViewport = parseFloat($(window).height() / 2);
    $("#formAddEvaluation > .row").each(function () {
        if (parseFloat($(this).position().top - w) <= middleViewport && (parseFloat($(this).offset().top + $(this).outerHeight(true) - w)) >= middleViewport) {
            $(this).css("opacity", "1").addClass("ready").siblings().css("opacity", "0.3").removeClass("ready");
            return false;
        }
    })
}
function openPopupAddChoix(numQuestion, question) {
    $("#idQuestion").val(numQuestion);
    $("#myModalLabel").html('Ajouter choix au question : ' + question);
    $("#modalAddChoix").modal();
}
function onSuccessEval() {
    location.reload();
}
function openPopupEditQuestion(numQuestion, question,description) {
    $('textarea[name="question"]').summernote('code', question);
    $('textarea[name="description"]').summernote('code', description);
    $("#idQuestionEdit").val(numQuestion);
    $("#modalEditQuestion").modal();
}
function openPopupDeletQuestion(numQuestion) {
    $("#idQuestionDelete").val(numQuestion);
    $("#modalDeleteQuestion").modal();
}
function openPopupDeletChoix(idChoix) {
    $("#idChoixDelete").val(idChoix);
    $("#modalDeleteChoix").modal();

}
function openPopupEditChoix(idChoix, choix, isValid) {
    $("#choixEdit").val(choix);
    $("#idChoixEdit").val(idChoix);
    if (isValid != '') {
        $("#isValidChoix").attr("checked", true);
        $("#isValidChoix").prop('value', true);
    }
    else {
        $("#isValidChoix").attr("checked", false);
        $("#isValidChoix").prop('value', false);
    }
    $("#modalEditChoix").modal();
}

function openPopupAddQuestion(evalId) {
    $("#evalId").val(evalId);
    //Init val of textarea du question
    $("#questionNew").summernote({ height: 200 });
    $("#questionNew").summernote("code", "");
    $("#descriptionNew").summernote({ height: 100 });
    $("#descriptionNew").summernote("code", "");
    $("#choixNew").val(" ");
    $("#categorieLabel").val(" ");
    $("#modalAddQuestion").modal();
}

function openPopupSaveEvaluation() {
    //$("#idQuestionDelete").val(numQuestion);
    $("#modalSaveEvaluation").modal();
}

function openPopupDeletEval(idEval) {
    $("#idEvalDelete").val(idEval);
    $("#modalDeleteEval").modal();
}
function onSuccessDeleteEval() {
    window.location.href = "/modeles";
}

function openPopupEditTitleEval() {
    $("#modalEditTitleEval").modal();
}
function onSuccessEdittitleEval() {
    location.reload();
}
