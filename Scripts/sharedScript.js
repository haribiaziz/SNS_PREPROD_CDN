
$(document).ready(function () {
    (function ($) {
        $(window).load(function () {
            $(".objectifScroll").mCustomScrollbar();
        });
    })(jQuery);

   

    $(".navbar-searchbox button").click(function () {
        var inputSearch = $(this).closest(".navbar-searchbox").find("input[name=query]");
        var query = inputSearch.val();
        if (query.length > 0) {
            goToSearch(query);
        }
        else {
            if (query.length >= 3) {
                searchData(inputSearch);
            }
            else {
                $(this).parent().next().html("");
            }
        }
    });
    $(".toggle-sidebar-left").click(function () {
        $(".menu-responsive").animate({ 'width': 'toggle' });
        $(".overlay-mobile").show();
        $(".wsdown-mobile").hide();
        $('html').css('overflow-y', 'hidden');
    })
    $(".overlay-mobile").click(function () {
        $(".menu-responsive").animate({ 'width': 'toggle' });
        $(".overlay-mobile").hide();
        $(".overlay-mobile-catalogue").hide();
        $(".OpenOpen").css("display", "none");
        $(".hideOpen").css("display", "unset");
        $('html').css('overflow-y', 'auto');
    })
    $(".openCatalogue").click(function () {      
        $(".wsdown-mobile").show();
        $(".overlay-mobile-catalogue").show();
        $(".OpenOpen").css("display", "unset");
        $(".hideOpen").css("display", "none");
        $(".wsdownmenu").addClass("wsdownmenuResp");

    })
   
    $(".OpenOpen").click(function () {
        $(".wsdown-mobile").hide();
        $(".overlay-mobile-catalogue").hide();
        $(".OpenOpen").css("display", "none");
        $(".hideOpen").css("display", "unset");
        $(".wsdownmenu").removeClass("wsdownmenuResp");
    })
    $(".overlay-mobile-catalogue").click(function () {
        $(".wsdown-mobile").hide();
        $(".overlay-mobile-catalogue").hide();
        $(".OpenOpen").css("display", "none");
        $(".hideOpen").css("display", "unset");
        $(".wsdownmenu").removeClass("wsdownmenuResp");
    })
    $('#modalItemAddedToCart').on('hidden.bs.modal', function () {
        $(this).remove();
    })

    $("body > .body").css("padding-bottom", $("#footer").height() + 100 + "px");

});


$(window).resize(function () {
    $("body > .body").css("padding-bottom", $("#footer").height() + 100 + "px");
});

function goToSearch(query) {
    //pour supprimer les caractère dangereux : * / \
    if (query.indexOf('*') > -1)
    {
        query = query.replace('*', '');
    }
    if (query.indexOf('/') > -1) {
        query = query.replace('/', '');
    }
    if (query.indexOf('\\') > -1) {
        query = query.replace('\\', '');
    }
    if (query.indexOf('?') > -1) {
        query = query.replace('?', '');
    }

    if (query.length > 0) {
        window.location = "/Search/" + query;
    }
    else
    {
        location.reload();
    }
}

function searchData(navbarSearch) {
    var inputSearch = navbarSearch.find("input[name=query]");
    var inputhidden = navbarSearch.find("input[type=hidden]");
    var searchIcon = navbarSearch.find("i");

    if (inputSearch.val().length >= 3) {
        if (inputhidden.val() != inputSearch.val()) {
            var query = inputSearch.val();
            searchIcon.attr('class', "fa fa-spinner fa-spin");

            $.ajax({
                url: '/Search/Suggest/' + query,
                data: { "term": query },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    navbarSearch.find("ul").remove();
                    var html = "";
                    html = html + "<ul class='dropdown-menu' role='menu' aria-labelledby='query' style='width:350px; display:block; height: auto;background-color:#ebebeb'>";

                    html = html + "  <div class='tabs tabs-bottom tabs-center tabs-simple' style='margin: 0 0 -10px 0;'>";
                    html = html + " <ul class='nav nav-tabs'>";

                    html = html + " <li id='liTraining' class='active'style='margin-bottom:0px;'>";
                    html = html + " <a href='#Training' id='home-tab' role='tab' data-toggle='tab' aria-controls='home' aria-expanded='true'style='padding: 5px 30px;'>";
                    html = html + "  <span class='text'>Formations (" + response[0].NbrTrainings + ")</span>";
                    html = html + "</a>";
                    html = html + " </li>";
                    html = html + " <li id='liTrainer' style='margin-bottom:0px;'>";
                    html = html + "<a href='#Trainer' role='tab' id='profile-tab' data-toggle='tab' aria-controls='profile' aria-expanded='false'style='padding: 5px 30px;'>";
                    html = html + " <span class='text'>Formateurs (" + response[0].NbrTrainer + ")</span>";
                    html = html + " </a>";
                    html = html + "</li>";
                    html = html + "  </ul>";
                    html = html + "</div>";
                    html = html + " <div id='myTabContent' class='tab-content' style='background-color:#ebebeb;padding:0'>";
                    html = html + " <div role='tabpanel' class='tab-pane fade active in'id='Training' aria-labelledby='home-tab'>";
                    html = html + "<ul style='background-color:#ebebeb;text-align: left;list-style: none;padding: 5px 0;margin: 2px 0 0;width:350px; display:block; height: auto;max-height:300px' class='dropdown-menu-serach'>";
                    for (var i = 0; i < response.length; i++) {
                         if (response[i].Type == "Training")
                         {
                         html = html + "<li><a class='result' href='" + response[i].Url + "' ><img src='/Images/nucleo-icon-2.svg' style='width:20px'>  " + response[i].Text + "</a></li>";
                         }
                     }                
                    html = html + "</ul>" ;        
                    html = html + "</div>";

                    html = html + "<div role='tabpanel' class='tab-pane fade' id='Trainer' aria-labelledby='profile-tab'>";
                    html = html + "<ul style='background-color:#ebebeb;text-align: left;list-style: none;padding: 5px 0;margin: 2px 0 0;width:350px; display:block; height: auto;max-height:300px' class='dropdown-menu-serach'>";
                    for (var i = 0; i < response.length; i++) {
                        if(response[i].Type == "Trainer")
                        {
                            html = html + "<li><a class='result' href='" + response[i].Url + "' ><img src='" + response[i].pic + "' style='width:20px'>  " + response[i].Text + "</a></li>";
                        }
                    }
                    html = html + "</ul>";
                    html = html + "</div>";
                    html = html + "</div>";

                  
                    html = html + "</ul>";
                    html =html+ "";

                    navbarSearch.append(html);

                    navbarSearch.find(".dropdown-menu-serach").mCustomScrollbar({
                        axis: "y"
                    });
                    $(".mCSB_scrollTools").css("left","0");
                    $(".mCSB_scrollTools").css("right", "auto");
                    searchIcon.attr('class', "fa fa-search");
                  
                }, error: function (error) {
                    searchIcon.attr('class', "fa fa-search");
                }
            });
        }
    }
    else {
        navbarSearch.find("ul").remove();
    }

    inputhidden.val(inputSearch.val());
}

$(".navbar-searchbox input[name=query]").on("keyup", function (e) {
    e.preventDefault();
    var query = $(this);
    if (e.which == 13 && query.length > 0) {
        goToSearch(query.val());
    }
    else {
        setTimeout(function () { searchData(query.closest("form.navbar-searchbox")); }, 1000);
    }
});
$(document).click(function (event) {
    if (!$(event.target).closest('.navbar-searchbox').length) {
        $(".navbar-searchbox .dropdown-menu").remove();
    }
});


function OnSuccessupdateHeaderPanier(data) {
    if (data.returnMsg == "ok") {
        $("header .header-panier").html(data.html);
        $("body").append(data.dialogue);
        $("#modalItemAddedToCart").modal('show');
        if ($("#trainerName").text() != "")
            $("#modalItemAddedToCart #trainer").html("Cours con&ccedil;u par" + " :  <i>" + $("#trainerName").text() + "</i>");
    }
    $("#" + data.code + " i").remove();
}

function onBeginSubmitForm(form) {
    $("." + form + " button").prop('disabled', true);
}

function onBeginclickBoutton(id) {
    $("#" + id).addClass('disabled');
    $("#" + id).append(' <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>');
    $("#modalItemAddedToCart").remove();
}

function onSuccessRequestGoogle(data) {
    if (data) {
        window.open(data.url, 'Gmail', 'scrollbars=1, width=800, height=600');
    }
}

function onSuccessGetYahoo(data) {
    if (data) {
        window.open(data.url, 'Yahoo', 'scrollbars=1, width=800, height=600');
    }
}

function onSuccessGetLive(data) {
    if (data) {
        window.open(data.url, 'Live', 'scrollbars=1, width=800, height=600');
    }
}


function readurl(s) {
    var e = {}, i, b = 0, c, x, l = 0, a, r = '', w = String.fromCharCode, L = s.length;
    var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0; i < 64; i++) { e[A.charAt(i)] = i; }
    for (x = 0; x < L; x++) {
        c = e[s.charAt(x)]; b = (b << 6) + c; l += 6;
        while (l >= 8) { ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a)); }
    }
    return r;
}
$(document).ready(function () {
setCarousel();
function setCarousel() {
    if ($('.featured-products-carousel-header').length) {
        $('.featured-products-carousel-header').owlCarousel({
            loop: false,
            responsive: {
                0: {
                    items: 1,
                    autoWidth: true,
                    margin: 90,
                    nav: true,
                },
                700: {
                    items: 2,
                    margin: 30,
                    nav: true,
                    autoWidth: true,

                },
                //600: {
                //    items: 3,
                //    margin: 50,
                //    nav: true,
                //},
                //992: {
                //    items: 3,
                //    margin: 5,
                //    nav: true,
                //    autoWidth: true,

                //},
                1024: {
                    items: 2,
                    margin: 50,
                    nav: true,
                    autoWidth: true,

                },
                1200: {
                    items: 3,
                    autoWidth: true,
                    margin: 50,
                    nav: true,

                }
            },
            
         
            navText: [],
            dots: false,
        });
    }
}
setCarouselCateg();
function setCarouselCateg() {
    if ($('.featured-products-carousel-categTrng').length) {
        $('.featured-products-carousel-categTrng').owlCarousel({
            loop: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 70,
                    nav: false,
                    dots: true
                },
                598: {
                    items: 1,
                    margin: 50,
                    nav: false,
                    dots: true
                },
                768: {
                    items: 1,
                    margin: 50,
                    nav: false,
                    dots: true
                },
                992: {
                    items: 1,
                    margin: 5,
                    nav: false,
                    dots: true
                },
                1024: {
                    items: 1,
                    margin: 50,
                    nav: false,
                    dots: true
                },
                1200: {
                    items: 1,
                    autoWidth: false,
                    margin: 2,
                    nav: true,

                }
            },

          
            navText: [],
            dots: false,
        
        });
    }
}
});
$('.owl-carousel-expert').each(function () {
    if ($(this).length) {
        $(this).owlCarousel({
            items: 1,
            margin: 0,
            autoPlay: 1000,
            navigation: false,
            slideSpeed: 300,
            stopOnHover: true,
            paginationSpeed: 400,
            singleItem: true,
            loop: true,
            nav: false,
            dots: true,
            stagePadding: 0,
            navText: [],
            autoplayHoverPause: true,
            autoplay: true,
        });
    }
});

