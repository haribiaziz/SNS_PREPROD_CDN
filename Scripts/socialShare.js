$("document").ready(function(){
    title = $("meta[name=title]").attr("content");
    description = $("meta[name=description]").attr("content");
    base_url = window.location.origin;
    imgsrc = "";
    url = window.location.href;

    social_count = new Object();
    social_count.facebook = function () {
        count_url = "https://api.facebook.com/method/links.getStats?format=json&urls="+url;
        $.getJSON(count_url, function (response) {
            //console.log(response)
            //$('.count.facebook').html(response[0]["share_count"])
        });
        return 0;
    };
    social_count.linkedin = function () {
        count_url = "https://www.linkedin.com/shareArticle?mini=true&url="+url;
        $.getJSON(count_url, function (response) {
                $('.count.linkedin').html(response.count)
        });
        return 0;
    };
    
 

    social_count.googleplus = function () {
        $.ajax({
          type: 'POST',
          url: 'https://clients6.google.com/rpc',
          processData: true,
          contentType: 'application/json',
          data: JSON.stringify({
            'method': 'pos.plusones.get',
            'id': url,
            'params': {
              'nolog': true,
              'id': url,
              'source': 'widget',
              'userId': '@viewer',
              'groupId': '@self'
            },
            'jsonrpc': '2.0',
            'key': 'p',
            'apiVersion': 'v1'
          }),
          success: function(response) {
              $('.count.googleplus').html(response.result.metadata.globalCounts.count)
          }
        });
        return 0;
    };
	social_data = {
        "facebook": {
            "class":"fa fa-facebook",
            "background": "#3b5998",
            "url": "https://www.facebook.com/sharer/sharer.php?u="+url,
            "count": social_count.facebook()
        },
        "googleplus": {
            "class":"fa fa-google-plus",
            "background": "#db4437",
            "url": "https://plus.google.com/share?url="+url,
            "count": social_count.googleplus()
        },
    
        "twitter": {
            "class":"fa fa-twitter",
            "background": "#4ab8ed",
            "url": "https://twitter.com/intent/tweet?text="+title+"&url="+url+"&via=TWITTER-HANDLE",
            "count": 10
        },
       
        "linkedin": {
            "class":"fa fa-linkedin",
            "background": "#0077b5",
            "url": "https://www.linkedin.com/shareArticle?mini=true" + "&url=" + url + "&title=" + title + "&summary=" + description + "&source=" + base_url,
            "count": social_count.linkedin()
        }
    };
    $.social_share = function(socialmedia_list) {
        $social_container = $("<div></div>").addClass("social-container")
		$social_icon = $("<div><span style='display: none;cursor: pointer;'><i class='fa fa-share-alt'style='margin-top: 20px;'></i></span><span style='display: block;cursor: pointer;'><i class='fa fa-angle-left' style='margin-top: 20px;'></i></span></div>").addClass("social-iconShare")
        $social_icon.on("click", function () {
            $social_container.find(".social-icon").toggle();
            $(this).find("span").toggle();
            $(this).show()
        });
        $social_container.append($social_icon);
		$.each(socialmedia_list, function(index, media){
            sicon = social_data[media];
			$social_icon = $("<div></div>").addClass("social-icon");
            $link = $("<a target=\"_blank\"></a>");
            $link.attr("href", sicon.url);
			$symbol = $("<i></i>").addClass(sicon.class);
			$count = $("<div></div>").addClass("count "+media).html(sicon.count);
			$social_icon.append($symbol).append($count);
			$social_icon.css("background", sicon.background);
            $link.append($social_icon);
			$social_container.append($link)
		});
		$("body").append($social_container)
	};
});
