

var w = 0;
$(document).ready(function () {
    //$('.skin-flat input').iCheck({
    //    checkboxClass: 'icheckbox_flat-red',
    //    radioClass: 'iradio_flat-red'
    //});

    $("#formAddEvaluationParPage > .row").click(function () {
        $('html,body').animate({
            scrollTop: $(this).offset().top - ($(window).height() - $(this).outerHeight(true)) / 2
        }, 500);
    })

    $("#submitQuizevl").click(function () {
        $("#formAddEvaluationParPage .row").each(function () {
            var count = 0;
            $(this).find(".iradio_flat-blue").each(function () {
                var input = $(this).find("input");
                var name = input.attr("name").split('.');
                input.attr("name", name[0] + "." + name[1] + ".listChoices[" + count + "].choiceValide")
                count++;
            })
        })
        $("#submitQuizevl i").show();
        $("#formAddEvaluationParPage").submit();
    })
    getActiveBlock();
    //$('#progression-quiz').scrollToFixed({
    //    bottom: 0,
    //    limit: $('#progression-quiz').offset().top,
    //    preFixed: function () { $(this).css('margin-bottom', '0px'); },
    //    postFixed: function () { $(this).css('margin-bottom', '-50px'); }
    //});
    var pourcentageQuiz = parseFloat(100 / $('#formAddEvaluationParPage .row').size())
    $('#formAddEvaluationParPage input').on('ifToggled', function (event) {
        var nbrReponse = 0;
        var checkbox = $(this).closest(".icheckbox_flat-blue, .iradio_flat-blue");

        checkbox.toggleClass("checked");
        if (checkbox.hasClass("checked")) {
            checkbox.find("input").attr("value", true)
        }
        else {
            checkbox.find("input").attr("value", false)
        }

        $("#formAddEvaluationParPage .row").each(function () {
            if ($(this).find(".icheckbox_flat-blue.checked, .iradio_flat-blue.checked").length > 0)
                nbrReponse = nbrReponse + 1;
        })
        //$(".fill-parogression-quiz").css("width", parseInt(nbrReponse * pourcentageQuiz) + "%");
        //$(".numeric-progression-quiz").html("<b>" + parseInt(nbrReponse * pourcentageQuiz) + "% </b> Completer")
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
            $("#formAddEvaluationParPage").submit();           
           
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
    $("#formAddEvaluationParPage > .row").each(function () {
        if (parseFloat($(this).position().top - w) <= middleViewport && (parseFloat($(this).offset().top + $(this).outerHeight(true) - w)) >= middleViewport) {
            $(this).css("opacity", "1").addClass("ready").siblings().css("opacity", "0.3").removeClass("ready");
            return false;
        }
    })
}
function onSuccessEval() {
    location.reload();
}

function openPopupSaveEvaluation() {
    //$("#idQuestionDelete").val(numQuestion);
    $("#modalSaveEvaluation").modal();
}

