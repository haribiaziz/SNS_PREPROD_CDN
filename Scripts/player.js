

$(document).ready(function () {
    if ($("html").width() > 992) {
        $("#planTraining").css("height", $("html").height() - $(".plan-top-block").outerHeight() - $(".progress-training").outerHeight() + "px");
        $("#planTraining").mCustomScrollbar({
            axis: "y",
            theme: "minimal-dark",
            scrollbarPosition: "outside"
        });
        hoverTitleVideo();
    }

    $(".player-menu > li > a").click(function () {
        var chapter = $(this).parent();
        if (chapter.hasClass("open")) {
            chapter.find("ul").slideUp('slow', function () {
                $(this).closest("li").toggleClass("open");
            })
        }
        else
            chapter.find("ul").slideDown('slow').closest("li").toggleClass("open");
    });
});

$(window).resize(function () {

    if ($("html").width() > 992) {
        $("#planTraining").css("height", $("html").height() - $(".plan-top-block").outerHeight() - $(".progress-training").outerHeight() + "px");
        $("#planTraining").mCustomScrollbar({
            axis: "y",
            theme: "minimal-dark",
            scrollbarPosition: "outside"
        });
        hoverTitleVideo();
    }
    else {
        $("#planTraining").height("100%");
        $("#planTraining").mCustomScrollbar({
            axis: "y",
            theme: "minimal-dark",
            scrollbarPosition: "outside"
        });
        $(".playerFormation").show();
    }
});

function hoverTitleVideo() {
    if ($("html").width() > 992) {
        $(".playerFormation").hover(
            function () {
                $(".titreFormation").slideDown("slow");
            }, function () {
                $(".titreFormation").slideUp("slow");
            }
        );
    }
}

function RedirectionAdobe() {
    window.open("https://get.adobe.com/fr/flashplayer/", "_blank");
}


function playVideoHtml5(vtitle, urlVideo, trainingId, videoId, isMobile, authentiated, bgTraining) {
    var jwUrl = urlVideo;
    
    if (isMobile.toLowerCase() === 'false') {
        jwUrl = readurl(urlVideo);
    }

    var video = document.getElementById('video');
    var player = new shaka.Player(video);

    window.player = player;

    video.addEventListener('playing', onPlayingHtml5(videoId, trainingId, authentiated));
    video.addEventListener('ended', onEndedHtml5);

    player.addEventListener('error', onErrorEventHtml5);

    player.load(jwUrl).then(function () {
    }).catch(onErrorHtml5);
}

function onPlayingHtml5(videoId, trainingId, authentiated) {
    var played = $(".player-menu li ul li[data-video-id = " + videoId + "] a i:first").attr("class");
    if (played != "fa fa-check") {
        $.ajax({
            type: "POST",
            url: "/tutoriel/UpdateTrainingHisto",
            data: { idVideo: videoId, idtraining: trainingId },
            success: function (data) {
                if (authentiated == 'true') {
                    $(".player-menu li ul li[data-video-id = " + videoId + "] a i:first").removeAttr('class').attr('class', 'fa fa-check');
                    var progressionVideo = $(".player-menu li ul li[data-video-id = " + videoId + "]").attr("data-progression");

                    var progresseTotal = Math.round(parseFloat($(".progress-training .progress-percent").attr("data-progresse")) + parseFloat(progressionVideo));
                    $(".progress-training .progress-percent").text(progresseTotal + "%");
                    $(".progress-training .progress-fill").css("width", progresseTotal + "%");

                    $(".progress-training .progress-percent").attr("data-progresse", parseFloat($(".progress-training .progress-percent").attr("data-progresse")) + parseFloat(progressionVideo));
                }
            }
        });
    }
}

function onEndedHtml5() {
    $("#blockSuggest").attr("style", "display:block");
    $("#playerVideo").attr("style", "display:none");
}

function onErrorEventHtml5(event) {
    onErrorHtml5(event.detail);
}

function onErrorHtml5(error) {
    for (var i = 0; i < error.data.length; i++) {
        console.error('Error code', error.code, 'object', error.data[i]);
    }

    var url = window.location.href;
    if (url.indexOf('/HTML5') > -1) {
        url = url.replace("/HTML5", "/FLASH");
    } else {
        url += '/FLASH'
    }
    window.location.href = url;
}


function playVideo(vtitle, urlVideo, urlVideoSecured, trainingId, videoId, isMobile, authentiated, bgTraining, urlErrorFlash) {

    shaka.polyfill.installAll();
    var pageUrl = window.location.href;
    if (isMobile.toLowerCase() === 'false') {
        jwUrl = readurl(urlVideo);
    }

    if (shaka.Player.isBrowserSupported() && pageUrl.indexOf('/FLASH') == -1) {
        document.getElementById('playerVideo').innerHTML = "<video id='video' width='100%' poster='" + bgTraining + "' controls autoplay></video>";
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (isChrome) {
            document.getElementById('playerVideo').style.cursor = 'pointer';
            document.getElementById('playerVideo').onclick = function () {
                var video = document.getElementById('video');
                if (video.paused) {
                    video.play();
                }
                else {
                    video.pause();
                }
            };
        }
        return playVideoHtml5(vtitle, urlVideoSecured, trainingId, videoId, isMobile, authentiated, bgTraining)
    }


    jwplayer("playerVideo").setup({
        abouttext: "SmartnSkilled Player",
        title: vtitle,
        file: jwUrl,
        "width": "100%",
        "height": "100%",
        "image": bgTraining,
        primary: "HTML5",
        androidhls: true,
        autostart: true,
        mute: false,
        repeat: false,
        events: {

            "onPlay": function (event) {
                var played = $(".player-menu li ul li[data-video-id = " + videoId + "] a i:first").attr("class");
                if (played != "fa fa-check") {
                    $.ajax({
                        type: "POST",
                        url: "/tutoriel/UpdateTrainingHisto",
                        data: { idVideo: videoId, idtraining: trainingId },
                        success: function (data) {
                            if (authentiated == 'true') {
                                $(".player-menu li ul li[data-video-id = " + videoId + "] a i:first").removeAttr('class').attr('class', 'fa fa-check');
                                var progressionVideo = $(".player-menu li ul li[data-video-id = " + videoId + "]").attr("data-progression");

                                var progresseTotal = Math.round(parseFloat($(".progress-training .progress-percent").attr("data-progresse")) + parseFloat(progressionVideo));
                                $(".progress-training .progress-percent").text(progresseTotal + "%");
                                $(".progress-training .progress-fill").css("width", progresseTotal + "%");

                                $(".progress-training .progress-percent").attr("data-progresse", parseFloat($(".progress-training .progress-percent").attr("data-progresse")) + parseFloat(progressionVideo));
                            }
                        }
                    });
                }
            },
            "onComplete": function (event) {

                $("#blockSuggest").attr("style", "display:block");
                $("#playerVideo").attr("style", "display:none");

            },
        }
    });


    jwplayer("playerVideo").onError(function (error) {


        if (shaka.Player.isBrowserSupported() && pageUrl.indexOf('/FLASH') == -1) {
            document.getElementById('playerVideo').innerHTML = "<video id='video' width='100%' poster='" + bgTraining + "' controls autoplay></video>";
            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            if (isChrome) {
                document.getElementById('playerVideo').style.cursor = 'pointer';
                document.getElementById('playerVideo').onclick = function () {
                    var video = document.getElementById('video');
                    if (video.paused) {
                        video.play();
                    }
                    else {
                        video.pause();
                    }
                };
            }
            return playVideoHtml5(vtitle, urlVideoSecured, trainingId, videoId, isMobile, authentiated, bgTraining)
        }

    });

}

function getInfoVideo(authenticated, idTrg, subscribed, purshased) {
    if (authenticated == 'true') {
        var permission = (subscribed.toLowerCase() == 'true' || purshased.toLowerCase() == 'true') ? true : false;
        $.ajax({
            type: "POST",
            url: "/plan/GetInfoVideoByUser?trgId=" + idTrg,
            contentType: 'application/json',
            success: function (data) {

                if (permission) {
                    $(".player-menu li ul li").each(function () {
                        $(this).find("a i:first").removeAttr('class').attr('class', 'fa fa-play-circle');
                    });
                }
                for (var i = 0; i < data.ids.length; i++) {
                    if ($(".player-menu li ul li[data-video-id = " + data.ids[i] + "]").attr("data-video-id") == data.ids[i]) {
                        $(".player-menu li ul li[data-video-id = " + data.ids[i] + "] a i:first").removeAttr('class').attr('class', 'fa fa-check');
                    }
                }
                $(".progress-training").show();
                $(".progress-training .progress-percent").attr("data-progresse", data.progression);
                $(".progress-training .progress-percent").text(Math.round(data.progression) + "%");
                $(".progress-training .progress-fill").css("width", Math.round(data.progression) + "%");
            }
        });

    }
}

function OnSuccessAddFavorisTraining(result) {
    if ($(".path-favoris-trg[data-ajax-loading$=_" + result.trainingId + "].active").length > 0) {
        $(".path-favoris-trg[data-ajax-loading$=_" + result.trainingId + "]").each(function () { $(this).removeClass("active"); $(this).show() })
    }
    else {
        $(".path-favoris-trg[data-ajax-loading$=_" + result.trainingId + "]").each(function () { $(this).addClass("active"); $(this).show() })
    }
}
