/*
Name: 			Demos - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	5.1.0
*/

(function( $ ) {

	'use strict';

	var urlFirstVideoo = $(".plan-menu li:first-child ul li:first-child a").attr('href');
	
   
	$("#urlPlayerr").attr("href", urlFirstVideoo);

	$('.featured-products-carousel').owlCarousel({
	    loop: false,
	    responsive: {
	        0: {
	            items: 1
	        },
	        500: {
	            items: 2
	        },
	        700: {
	            items: 3
	        },
	        950: {
	            items: 3
	        },
	        1000:{
	            items: 2
	        },
	        1200: {
	            items: 2
	        }
	    },
	    margin: 5,
	    nav: true,
	    navText: [],
	    dots: false,
	    autoWidth: false
	});

	$(".plan-menu > li > a").click(function () {
	    var chapter = $(this).parent();
	    if (chapter.hasClass("open")) {
	        chapter.find("ul").slideUp('slow', function () {
	            $(this).closest("li").toggleClass("open");
	            calculSticky();
	        })
	    }
	    else
	        chapter.find("ul").slideDown('slow', function () { calculSticky(); }).closest("li").toggleClass("open", function () { calculSticky(); });
	});

	$(".header-training-bg").hover(
      function () {
          $(this).find(".layer").css("opacity","0.6");
      }, function () {
          $(this).find(".layer").removeAttr("style")
      }
    );
	$("nav-tabs > li").click(function () {
	    calculSticky();
	});

}).apply(this, [jQuery]);

function calculSticky() {
    
        var $this = $('[data-plugin-sticky]'),
            opts;

        var pluginOptions = $this.data('plugin-options');
        if (pluginOptions)
            opts = pluginOptions;

        $this.themePluginSticky(opts);
}

function OnSuccessAddCommentaire(data) {
    if (data.isAdded == "true") {
        $().toastmessage('showSuccessToast', "Commentaire ajout&eacute; avec succ&egrave;s.<br/>En attente de validation par l'admin.");
        $("#CommentairesTrainings").html(data.html);
        $("#CommentairesTrainings input.rating").rating()
        $("[name=commentaire]").val("");
        location.reload();

    }
    else {
        $().toastmessage('showErrorToast', "Probl&egrave;me lors de l&acute;ajout du commentaire.");
    }
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
                    $(".plan-menu li ul li").each(function () {
                        $(this).find("a i:first").removeAttr('class').attr('class', 'fa fa-play-circle');
                    });
                }
                for (var i = 0; i < data.ids.length; i++) {
                    if ($(".plan-menu li ul li[data-video-id = " + data.ids[i] + "]").attr("data-video-id") == data.ids[i]) {
                        $(".plan-menu li ul li[data-video-id = " + data.ids[i] + "] a i:first").removeAttr('class').attr('class', 'fa fa-check');
                        $(".plan-menu li ul li[data-video-id = " + data.ids[i + 1] + "] a ").attr('id', 'videolast');
                        if (data.progression == 0) {
                            var urlFirstVideo = $("#videolast").attr('href');
                            $("#urlPlayer").attr("href", urlFirstVideo);
                        }
                       
                    }
                }
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


$('#importertrngfinished').click(function (event) {


    event.preventDefault();
    if ($('#formImporttrngFinished')[0].checkValidity()) {

        var dataString;
        var action = $("#formImporttrngFinished").attr("action");
        if ($("#formImporttrngFinished").attr("enctype") == "multipart/form-data") {           
            dataString = new FormData($("#formImporttrngFinished").get(0));          
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
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //do your own thing
            }
        });
    }
});
$("#importertrngfinished").click(function (event) {

}); //end .submit()
