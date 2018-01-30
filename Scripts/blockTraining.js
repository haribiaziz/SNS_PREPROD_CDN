function OnSuccessAddFavoris(result) {
    if ($("[data-ajax-loading$=_" + result.trainingId + "] i.active").length > 0) {
        $("[data-ajax-loading$=_" + result.trainingId + "] i").each(function () { $(this).removeClass("active"); $(this).show() })
    }
    else {
        $("[data-ajax-loading$=_" + result.trainingId + "] i").each(function () { $(this).addClass("active"); $(this).show() })
    }
}


function updateBlockTraining() {
    var trgId = []; 
    $(".products-grid li").each(function () {
        if (jQuery.inArray($(this).attr("data-id"), trgId) == -1)
            trgId.push($(this).attr("data-id"));
    })
   
    if (trgId.length > 0) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(trgId),
            url: "/Base/GetDetailTrainings",
            contentType: 'application/json',
            success: function (data) {
                
                var Trainings = data.Trainings;
                for (var i = 0; i < Trainings.length; i++) {
                    
                    //var secondes = Trainings[i].Duree;
                    //var temps = new Date();
                    //temps.setTime(secondes * 1000);
                    //document.getElementById("duree").innerHTML = ((temps.getHours() - 1) + "h" + temps.getMinutes() + "min" + temps.getSeconds() + "sec");

                    //console.log(((temps.getHours() - 1) + "h" + temps.getMinutes() + "min" + temps.getSeconds() + "sec"));

                    //Favoris
                    $("a[data-ajax-loading^= '#loaderFavoris_']").show();
                    if (Trainings[i].IsFavoris)
                        $("a[data-ajax-loading^= '#loaderFavoris_" + Trainings[i].trainingId + "'] > i").addClass("active");
                    else
                        $("a[data-ajax-loading^= '#loaderFavoris_" + Trainings[i].trainingId + "'] > i").removeClass("active");

                 
                 
                    // Progression
                    if (Trainings[i].Progression > 0 && Trainings[i].Progression < 100)
                    {
                        $("[data-id^=" + Trainings[i].trainingId + "] .logoPlayReprise").html(' <i class="fa fa-repeat" style="font-size: 28px;color:#ed9c28;margin-left:40px "></i>&nbsp;');
                        $("[data-id^=" + Trainings[i].trainingId + "] .logoPlayRepriser").html(' <i class="fa fa-repeat" style="font-size: 20px;color:#f89b1c;margin-left:5px;margin-top:-1px;""></i>');
                        $("[data-id^=" + Trainings[i].trainingId + "] .hoverTrainingr").html('Reprendre');
                        $("[data-id^=" + Trainings[i].trainingId + "] .hoverTrainingr").css("margin-top", "0px");
                        $("[data-id^=" + Trainings[i].trainingId + "] .hoverTraining").html('Reprendre');
                        $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg").show();
                        $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg-perc").show().text(Math.round(Trainings[i].Progression) + "%");
                        $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg div").css("width", Math.round(Trainings[i].Progression) + "%");
                        $("[data-id^=" + Trainings[i].trainingId + "] .showed").removeClass("displayed");

                        $("[data-id^=" + Trainings[i].trainingId + "] .addtop").css("margin-top", "-36px");
                        $("[data-id^=" + Trainings[i].trainingId + "] .addtopResp").css("margin-top", "-20px");
                        $("[data-id^=" + Trainings[i].trainingId + "] .addtopResp").css("margin-left", "10px");

                    }
                  
                    else
                    {
                        if(Trainings[i].Progression >= 100)
                        {
                            $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg").show();
                            $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg-perc").show().text(Math.round(Trainings[i].Progression) + "%");
                            $("[data-id^=" + Trainings[i].trainingId + "] .progression-trg div").css("width", Math.round(Trainings[i].Progression) + "%");
                        }
                    }
                    if (Trainings[i].LastVideoUrl != null && Trainings[i].Progression < 100) {
                          //$("li[data-id=" + Trainings[i].trainingId + "] figure a[href^='/tutoriel/']").each(function () {
                            $("[data-id^=" + Trainings[i].trainingId + "] .addtop").each(function () {
                            var href = $(this).attr("href");
                            $(this).attr("href", href + "" + Trainings[i].LastVideoUrl);
                            //$(this).attr("target", "_blank");
                            $(this).attr("target");

                            })
                            $("[data-id^=" + Trainings[i].trainingId + "] .linkn").each(function () {
                                var href = $(this).attr("href");
                                $(this).attr("href", href + "" + Trainings[i].LastVideoUrl);
                                //$(this).attr("target", "_blank");
                                $(this).attr("target");

                            })
                               
                           
                            
                    }
                }
            }
        });
    }
}