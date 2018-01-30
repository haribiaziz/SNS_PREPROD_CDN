/**
 * bootstrap-imageupload v1.1.2
 * https://github.com/egonolieux/bootstrap-imageupload
 * Copyright 2016 Egon Olieux
 * Released under the MIT license
 */

//if ("undefined" == typeof jQuery) throw new Error("bootstrap-imageupload's JavaScript requires jQuery."); !function (e) { "use strict"; function i(i) { b = e.extend({}, e.fn.imageupload.defaultOptions, i); var n = this, a = n.find(".file-tab"), o = n.find(".panel-heading .btn:eq(0)"), d = a.find('input[type="file"]'), l = a.find(".btn:eq(1)"), r = n.find(".url-tab"), s = n.find(".panel-heading .btn:eq(1)"), h = r.find(".btn:eq(0)"), g = r.find(".btn:eq(1)"); u(a), m(r), f(a), t.call(n), o.off(), d.off(), l.off(), s.off(), h.off(), g.off(), o.on("click", function () { e(this).blur(), f(a) }), d.on("change", function () { e(this).blur(), p(a) }), l.on("click", function () { e(this).blur(), u(a) }), s.on("click", function () { e(this).blur(), c(r) }), h.on("click", function () { e(this).blur(), v(r) }), g.on("click", function () { e(this).blur(), m(r) }) } function n() { var e = this; e.addClass("imageupload-disabled") } function t() { var e = this; e.removeClass("imageupload-disabled") } function a() { var e = this; i.call(e, b) } function o(e) { var i = []; return i.push('<div class="alert alert-danger alert-dismissible">'), i.push('<button type="button" class="close" data-dismiss="alert">'), i.push("<span>&times;</span>"), i.push("</button>" + e), i.push("</div>"), i.join("") } function d(e) { return '<img src="' + e + '" alt="Image preview" class="thumbnail" style="max-width: 142px">' } function l(e) { return e.substr(e.lastIndexOf(".") + 1).toLowerCase() } function r(i, n) { if (i.size / 1024 > b.maxFileSizeKb) return void n(!1, "File is too large (max " + b.maxFileSizeKb + "kB)."); var t = l(i.name); e.inArray(t, b.allowedFormats) > -1 ? n(!0, "Image file is valid.") : n(!1, "type de fichier non compatible.") } function s(i, n) { var t = null, a = 3e3, o = !1, d = new Image; d.onload = function () { if (!o) { window.clearTimeout(t); var a = i; a.indexOf("?") !== -1 && (a = a.split("?")[0].split("#")[0]); var d = l(a); e.inArray(d, b.allowedFormats) > -1 ? n(!0, "Image URL is valid.") : n(!1, "type de fichier non compatible.") } }, d.onerror = function () { o || (window.clearTimeout(t), n(!1, "Image could not be found.")) }, d.src = i, t = window.setTimeout(function () { o = !0, d.src = "???", n(!1, "Loading image timed out.") }, a) } function f(e) { var i = e.closest(".imageupload"), n = i.find(".panel-heading .btn:eq(0)"); if (!n.hasClass("active")) { var t = i.find(".url-tab"); i.find(".panel-heading .btn:eq(1)").removeClass("active"), n.addClass("active"), t.hide(), e.show(), m(t) } } function u(e) { e.find(".alert").remove(), e.find(".btn:eq(1)").hide(), e.find("input").val("") } function p(e) { var i = e.find(".btn:eq(0)"), n = e.find(".btn:eq(1)"), t = i.find("input"); if (e.find(".alert").remove(), e.find("img").remove(), n.hide(), t[0].files && t[0].files[0]) { i.prop("disabled", !0); var a = t[0].files[0]; r(a, function (l, r) { if (l) { var s = new FileReader; s.onload = function (t) { e.prepend(d(t.target.result)), i.find("span").text("Change"), n.css("display", "inline-block") }, s.onerror = function () { e.prepend(o("Error loading image file.")), t.val("") }, s.readAsDataURL(a) } else e.prepend(o(r)), t.val(""); i.prop("disabled", !1) }) } } function c(e) { var i = e.closest(".imageupload"), n = i.find(".panel-heading .btn:eq(1)"); if (!n.hasClass("active")) { var t = i.find(".file-tab"); i.find(".panel-heading .btn:eq(0)").removeClass("active"), n.addClass("active"), t.hide(), e.show(), u(t) } } function m(e) { e.find(".alert").remove(), e.find("img").remove(), e.find(".btn:eq(1)").hide(), e.find("input").val("") } function v(i) { var n = i.find('input[type="text"]'), t = i.find(".btn:eq(0)"), a = i.find(".btn:eq(1)"); i.find(".alert").remove(), i.find("img").remove(), a.hide(); var l = n.val(); return l ? (n.prop("disabled", !0), t.prop("disabled", !0), void s(l, function (r, s) { r ? (i.find('input[type="hidden"]').val(l), e(d(l)).insertAfter(t.closest(".input-group")), a.css("display", "inline-block")) : i.prepend(o(s)), n.prop("disabled", !1), t.prop("disabled", !1) })) : void i.prepend(o("Please enter an image URL.")) } var b = {}, h = { init: i, disable: n, enable: t, reset: a }; e.fn.imageupload = function (i) { var n = arguments; return this.filter("div").each(function () { if (h[i]) h[i].apply(e(this), Array.prototype.slice.call(n, 1)); else { if ("object" != typeof i && i) throw new Error('Method "' + i + '" is not defined for imageupload.'); h.init.apply(e(this), n) } }) }, e.fn.imageupload.defaultOptions = { allowedFormats: ["jpg", "jpeg", "png", "gif"], maxWidth: 250, maxHeight: 250, maxFileSizeKb: 2048 } }(jQuery);







/**
 * bootstrap-imageupload v1.1.2
 * https://github.com/egonolieux/bootstrap-imageupload
 * Copyright 2016 Egon Olieux
 * Released under the MIT license
 */

if (typeof jQuery === 'undefined') {
    throw new Error('bootstrap-imageupload\'s JavaScript requires jQuery.');
}

(function ($) {
    'use strict';

    var options = {};

    var methods = {
        init: init,
        disable: disable,
        enable: enable,
        reset: reset
    };

    // -----------------------------------------------------------------------------
    // Plugin Definition
    // -----------------------------------------------------------------------------

    $.fn.imageupload = function (methodOrOptions) {
        var givenArguments = arguments;

        return this.filter('div').each(function () {
            if (methods[methodOrOptions]) {
                methods[methodOrOptions].apply($(this), Array.prototype.slice.call(givenArguments, 1));
            }
            else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
                methods.init.apply($(this), givenArguments);
            }
            else {
                throw new Error('Method "' + methodOrOptions + '" is not defined for imageupload.');
            }
        });
    };

    $.fn.imageupload.defaultOptions = {
        allowedFormats: ['jpg', 'jpeg', 'png'],
        maxWidth: 200,
        maxHeight: 200,
        maxFileSizeKb: 2048,
        refreshImgById: null,
        ajaxSuccessMethode: null,
        refreshImgByjaxSuccessMethode: null,
    };

    // -----------------------------------------------------------------------------
    // Public Methods
    // -----------------------------------------------------------------------------

    function init(givenOptions) {
        options = $.extend({}, $.fn.imageupload.defaultOptions, givenOptions);

        var $imageupload = this;
        var $fileTab = $imageupload.find('.file-tab');
        var $fileTabButton = $imageupload.find('.panel-heading .btn:eq(0)');
        var $browseFileButton = $fileTab.find('input[type="file"]');
        var $removeFileButton = $fileTab.find('.btn:eq(1)');
        var $urlTab = $imageupload.find('.url-tab');
        var $urlTabButton = $imageupload.find('.panel-heading .btn:eq(1)');
        var $submitUrlButton = $urlTab.find('.btn:eq(0)');
        var $removeUrlButton = $urlTab.find('.btn:eq(1)');

        // Do a complete reset.
        resetFileTab($fileTab);
        resetUrlTab($urlTab);
        showFileTab($fileTab);
        enable.call($imageupload);

        // Unbind all previous bound event handlers.
        $fileTabButton.off();
        $browseFileButton.off();
        $removeFileButton.off();
        $urlTabButton.off();
        $submitUrlButton.off();
        $removeUrlButton.off();

        $fileTabButton.on('click', function () {
            $(this).blur();
            showFileTab($fileTab);
        });

        $browseFileButton.on('change', function () {
            $(this).blur();
            submitImageFile($fileTab);
        });

        $removeFileButton.on('click', function () {
            $(this).blur();
            resetFileTab($fileTab);
        });

        $urlTabButton.on('click', function () {
            $(this).blur();
            showUrlTab($urlTab);
        });

        $submitUrlButton.on('click', function () {
            $(this).blur();
            submitImageUrl($urlTab);
        });

        $removeUrlButton.on('click', function () {
            $(this).blur();
            resetUrlTab($urlTab);
        });
    }

    function disable() {
        var $imageupload = this;
        $imageupload.addClass('imageupload-disabled');
    }

    function enable() {
        var $imageupload = this;
        $imageupload.removeClass('imageupload-disabled');
    }

    function reset() {
        var $imageupload = this;
        init.call($imageupload, options);
    }

    // -----------------------------------------------------------------------------
    // Private Methods
    // -----------------------------------------------------------------------------

    function getAlertHtml(message) {
        var html = [];
        html.push('<div class="alert alert-danger alert-dismissible">');
        html.push('<button type="button" class="close" data-dismiss="alert">');
        html.push('<span>&times;</span>');
        html.push('</button>' + message);
        html.push('</div>');
        return html.join('');
    }

    function getImageThumbnailHtml(src) {
        return '<img src="' + src + '" alt="Image preview" class="thumbnail" style="max-width: 142px;">';
    }

    function getFileExtension(path) {
        return path.substr(path.lastIndexOf('.') + 1).toLowerCase();
    }

    function isValidImageFile(file, callback) {
        // Check file size.
        if (file.size / 1024 > options.maxFileSizeKb) {
            callback(false, 'File is too large (max ' + options.maxFileSizeKb + 'kB).');
            return;
        }

        // Check image format by file extension.
        var fileExtension = getFileExtension(file.name);
        if ($.inArray(fileExtension, options.allowedFormats) > -1) {
            callback(true, 'Image file is valid.');
        }
        else {
            callback(false, 'File type is not allowed.');
        }
    }

    function isValidImageUrl(url, callback) {
        var timer = null;
        var timeoutMs = 3000;
        var timeout = false;
        var image = new Image();

        image.onload = function () {
            if (!timeout) {
                window.clearTimeout(timer);

                // Strip querystring (and fragment) from URL.
                var tempUrl = url;
                if (tempUrl.indexOf('?') !== -1) {
                    tempUrl = tempUrl.split('?')[0].split('#')[0];
                }

                // Check image format by file extension.
                var fileExtension = getFileExtension(tempUrl);
                if ($.inArray(fileExtension, options.allowedFormats) > -1) {
                    callback(true, 'Image URL is valid.');
                }
                else {
                    callback(false, 'File type is not allowed.');
                }
            }
        };

        image.onerror = function () {
            if (!timeout) {
                window.clearTimeout(timer);
                callback(false, 'Image could not be found.');
            }
        };

        image.src = url;

        // Abort if image takes longer than 3000ms to load.
        timer = window.setTimeout(function () {
            timeout = true;
            image.src = '???'; // Trigger error to stop loading.
            callback(false, 'Loading image timed out.');
        }, timeoutMs);
    }

    function showFileTab($fileTab) {
        var $imageupload = $fileTab.closest('.imageupload');
        var $fileTabButton = $imageupload.find('.panel-heading .btn:eq(0)');

        if (!$fileTabButton.hasClass('active')) {
            var $urlTab = $imageupload.find('.url-tab');

            // Change active tab buttton.
            $imageupload.find('.panel-heading .btn:eq(1)').removeClass('active');
            $fileTabButton.addClass('active');

            // Hide URL tab and show file tab.
            $urlTab.hide();
            $fileTab.show();
            resetUrlTab($urlTab);
        }
    }

    function resetFileTab($fileTab) {
        $fileTab.find('.alert').remove();
        //$fileTab.find('img').remove();
        $fileTab.find('.btn span').text('Ajouter une photo');
        $fileTab.find('.btn:eq(1)').hide();
        $fileTab.find('input').val('');
    }

    function submitImageFile($fileTab) {
        var $browseFileButton = $fileTab.find('.btn:eq(0)');
        var $removeFileButton = $fileTab.find('.btn:eq(1)');
        var $fileInput = $browseFileButton.find('input');

        $fileTab.find('.alert').remove();
        $fileTab.find('img').remove();
        $browseFileButton.find('span').text('Ajouter une photo');
        $removeFileButton.hide();

        // Check if file was uploaded.
        if (!($fileInput[0].files && $fileInput[0].files[0])) {
            return;
        }

        $browseFileButton.prop('disabled', true);

        var file = $fileInput[0].files[0];

        isValidImageFile(file, function (isValid, message) {
            if (isValid) {
                var fileReader = new FileReader();

                fileReader.onload = function (e) {
                    // Show thumbnail and remove button.
                    //$fileTab.prepend(getImageThumbnailHtml(e.target.result));
                    $browseFileButton.find('span').text('Changer');
                    $removeFileButton.css('display', 'inline-block');
                    var params =
                    {
                        "param1": e.target.result,
                        "param2": getFileExtension(file.name),
                        "param3": "IMG_USER",
                        "param6": "loadImagesUser",
                    }
                    $.ajax({
                        url: '/Base/UploadFile',
                        type: "POST",
                        data: params,
                        //loadingelementid: "overlayLoading",
                        success: function (res) {
                            $fileTab.prepend(getImageThumbnailHtml(res));
                            $('#infoUser_PhotoUrl').val(res);
                            if (options.ajaxSuccessMethode != null) {
                                callAjxMethode(options.ajaxSuccessMethode, options.refreshImgByjaxSuccessMethode, res);
                            }
                        }
                    });
                };

                fileReader.onerror = function () {
                    $fileTab.prepend(getAlertHtml('Error loading image file.'));
                    $fileInput.val('');
                };

                fileReader.readAsDataURL(file);
            }
            else {
                $fileTab.prepend(getAlertHtml(message));
                $browseFileButton.find('span').text('Ajouter une photo');
                $fileInput.val('');
            }

            $browseFileButton.prop('disabled', false);
        });
    }

    function showUrlTab($urlTab) {
        var $imageupload = $urlTab.closest('.imageupload');
        var $urlTabButton = $imageupload.find('.panel-heading .btn:eq(1)');

        if (!$urlTabButton.hasClass('active')) {
            var $fileTab = $imageupload.find('.file-tab');

            // Change active tab button.
            $imageupload.find('.panel-heading .btn:eq(0)').removeClass('active');
            $urlTabButton.addClass('active');

            // Hide file tab and show URL tab.
            $fileTab.hide();
            $urlTab.show();
            resetFileTab($fileTab);
        }
    }

    function resetUrlTab($urlTab) {
        $urlTab.find('.alert').remove();
        $urlTab.find('img').remove();
        $urlTab.find('.btn:eq(1)').hide();
        $urlTab.find('input').val('');
    }

    function submitImageUrl($urlTab) {
        var $urlInput = $urlTab.find('input[type="text"]');
        var $submitUrlButton = $urlTab.find('.btn:eq(0)');
        var $removeUrlButton = $urlTab.find('.btn:eq(1)');

        $urlTab.find('.alert').remove();
        $urlTab.find('img').remove();
        $removeUrlButton.hide();

        var url = $urlInput.val();
        if (!url) {
            $urlTab.prepend(getAlertHtml('Please enter an image URL.'));
            return;
        }

        $urlInput.prop('disabled', true);
        $submitUrlButton.prop('disabled', true);

        isValidImageUrl(url, function (isValid, message) {
            if (isValid) {
                // Submit URL value.
                $urlTab.find('input[type="hidden"]').val(url);

                // Show thumbnail and remove button.
                $(getImageThumbnailHtml(url)).insertAfter($submitUrlButton.closest('.input-group'));
                $removeUrlButton.css('display', 'inline-block');
            }
            else {
                $urlTab.prepend(getAlertHtml(message));
            }

            $urlInput.prop('disabled', false);
            $submitUrlButton.prop('disabled', false);
        });
    }

    function callAjxMethode(metode, idImg, imgUrl) {
        $.ajax({
            url: '/Base/' + metode,
            type: "POST",
            data: { fileUrl: imgUrl },
            //loadingelementid: "overlayLoading",
            success: function (res) {
                if (idImg != null)
                    idImg.html("<img class='img-circle' src='" + res + "'  height='24' />");
            }
        });
    }
}(jQuery));
