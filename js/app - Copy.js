/**
 KMRS MOBILE
 Version 1.0
 */
/**
 Default variable declarations
 */
var ajax_url = krms_config.ApiUrl;
var ajax_url_append = krms_config.append_api;
var dialog_title_default = krms_config.DialogDefaultTitle;
var search_address;
var ajax_request;
var cart = [];
var networkState;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
//    setTimeout(function () {
//        navigator.splashscreen.hide();
//    }, 3000);
    //setStorage('device_id', 'e3kI:APA91bGNX6z6xWj6P3mD-bBsUsxqtR87Lxzmvssb6DiZ4lhmuQpF_Zkp10g5GPKD5Lam-iR7Gi_ZF75mH-siTeDxxkW6_yIdNOtu9E6A1_s7tQ90e4YovY5RxPgsOOafnLW9BjDii5yi');
    //setStorage('device_platform', 'Android');
    if (!empty(krms_config.pushNotificationSenderid)) {
        console.log("sender id :" + krms_config.pushNotificationSenderid);
        var push = PushNotification.init({
            "android": {
                "senderID": krms_config.pushNotificationSenderid
            },
            "ios": {
                "alert": "true",
                "badge": "true",
                "sound": "true"
            },
            "windows": {}
        });
        push.on('registration', function (data) {
            console.log("registration:" + data);
            var oldDeviceId = getStorage('device_id');
            setStorage("device_id", data.registrationId);
            setStorage("device_platform", device.platform);
            var params = "registrationId=" + data.registrationId;
            params += "&device_platform=" + device.platform;
            params += "&client_token=" + getStorage("client_token");
            params += "&old_device_id=" + oldDeviceId;
            callAjax("registerMobile", params);
            //callAjax("getMyagenda", params);
        });
        push.on('notification', function (data) {

            console.log("registration:" + data);
            showNotification(data.title, data.message);

            push.finish(function () {
                console.log("finish successfully called:");
                //alert('finish successfully called');
            });
        });
        push.on('error', function (e) {
            console.log("Push erorr:" + e);
        });
    }
}
jQuery.fn.exists = function () {
    return this.length > 0;
}

function dump(data) {
    console.debug(data);
}

function setStorage(key, value) {
    localStorage.setItem(key, value);
}

function getStorage(key) {
    return localStorage.getItem(key);
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

function explode(sep, string) {
    var res = string.split(sep);
    return res;
}

function urlencode(data) {
    return encodeURIComponent(data);
}
$(document).on("keyup", ".numeric_only", function () {
    if ($(this).hasClass('range1_5')) {
        if (this.value.length > 1) {
            var ch = this.value;
            this.value = ch.charAt(0);
        }
        this.value = this.value.replace(/[^1-5\-().]/g, '');

    } else {
        this.value = this.value.replace(/[^0-9\-().]/g, '');
    }
});



$(document).on({
    'DOMNodeInserted': function () {
        $('.pac-item, .pac-item span', this).addClass('needsclick');
    }
}, '.pac-container');

ons.bootstrap();
ons.ready(function () {
    dump('ready');
    refreshConnection();
    setTimeout('getLanguageSettings()', 1100);
}); /*end ready*/
function refreshConnection() {
    if (!hasConnection()) {
        $(".home-page").hide();
        $(".no-connection").show();
    } else {
        $(".home-page").show();
        $(".no-connection").hide();
    }
}

function hasConnection() {
    return true;
    networkState = navigator.network.connection.type;
    if (networkState == "Connection.NONE" || networkState == "none") {
        return false;
    }
    return true;
}

function createElement(elementId, elementvalue) {
    var content = document.getElementById(elementId);

    content.innerHTML = elementvalue;
    ons.compile(content);
}

ons.ready(function () {
    /*kNavigator.on('prepush', function(event) {
     dump("prepush");
     });*/
});
document.addEventListener("pageinit", function (e) {
    dump("pageinit");
    dump("pagname => " + e.target.id);
    appdata.pagename = e.target.id;
    switch (e.target.id) {

        default:
            break;
    }
}, false);

function onsenAlert(message, dialog_title) {
    if (typeof dialog_title === "undefined" || dialog_title == null || dialog_title == "") {
        dialog_title = dialog_title_default;
    }
    dump(dialog_title);
    ons.notification.alert({
        message: message,
        title: dialog_title
    });
}

function hideAllModal() {
    setTimeout('loaderSearch.hide()', 1);
    setTimeout('loader.hide()', 1);
    setTimeout('loaderLang.hide()', 1);
}

function alreadyRegisterForAlert() {
//    ons.createDialog('mydialog.html').then(function (dialog) {
//        $(".mydialog-title").html('Aicog 2017 Ahmedabad');
//        $(".mydialog-message").html('You already set alert for this program');
//        dialog.show();
//    });
}

function registerForAlert(pr_id)
{
    if (pr_id !== '') {
        setStorage('program_id', pr_id);
    }
    var params = "registrationId=" + getStorage("device_id");
    params += "&device_platform=" + getStorage("device_platform");
    params += "&cn_program_id=" + getStorage("program_id");
    params += "&cn_user_id=" + getStorage("user_id");
    params += "&title=Test title";
    params += "&message=Test message";
    params += "&datetime_notify=2016-09-21 09:00:00";

    callAjax("checkReminder", params);
}

function setmenu(obj) {
    var obj = $(obj);
    obj.attr('onclick', 'setmenuback(this)');
    obj.next().hide();
}

function setmenuback(obj) {
    var obj = $(obj);
    obj.attr('onclick', 'setmenu(this)');
    obj.next().show();
}

/*mycallajax*/
function callAjax(action, params) {
    if (!hasConnection()) {
        if (action != "registerMobile") {
            //  onsenAlert(getTrans("CONNECTION LOST", 'connection_lost'));
        }
        return;
    }
    /*add language use parameters*/
    params += "&lang_id=" + getStorage("default_lang");
    dump(ajax_url + action + '&' + params);
    ajax_request = $.ajax({
        url: ajax_url + action,
        data: params,
        type: 'POST',
        async: false,
        dataType: 'jsonp',
        timeout: 6000,
        crossDomain: true,
        beforeSend: function () {
            if (ajax_request != null) {
                /*abort ajax*/
                hideAllModal();
                ajax_request.abort();
            } else {
                /*show modal*/
                switch (action) {
                    case "registerMobile":
                        break;
                    default:
                        loader.show();
                        break;
                }
            }
        },
        complete: function (data) {
            ajax_request = null;
            hideAllModal();
        },
        success: function (data) {
            appdata.response = data;
            dump(data);
            if (data.code == 0) {
                switch (action) {
                    default:
                        //onsenAlert("Sorry but something went wrong during processing your request");
                        //onsenAlert(data.msg);
                        break;
                }
            } else {
                /*failed condition*/
                switch (action) {
                    default:
                        // onsenAlert(data.msg);
                        break;
                }
            }
        },
        error: function (request, error) {
            hideAllModal();
            if (action == "getLanguageSettings" || action == "registerMobile") {
            } else {
                //onsenAlert(getTrans("Network error has occurred please try again!", 'network_error'));
            }
        }
    });
}

function setHome() {
    dump("setHome");
    var options = {
        closeMenu: true,
        animation: 'slide',
        callback: setHomeCallback
    };
    menu.setMainPage('home.html', options);
}

function setHomeCallback() {
    refreshConnection();
}


function empty(data) {
    if (typeof data === "undefined" || data == null || data == "") {
        return true;
    }
    return false;
}
/*end ready*/

/*sliding menu*/
ons.ready(function () {
    console.log("On ready stage");

    menu.on('preopen', function () {
        console.log("Menu page is going to open");
        translatePage();
    });
});

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '')
            .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + (Math.round(n * k) / k)
                        .toFixed(prec);
            };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
                .join('0');
    }
    return s.join(dec);
}
var translator;
var dictionary;

function getLanguageSettings() {
    if (!hasConnection()) {
        return;
    }
    // callAjax("getLanguageSettings", '');
}

function translatePage() {
    dump("TranslatePage");
    //if (getStorage("translation")!="undefined"){
    if (typeof getStorage("translation") === "undefined" || getStorage("translation") == null || getStorage("translation") == "") {
        return;
    } else {
        dictionary = JSON.parse(getStorage("translation"));
    }
    if (!empty(dictionary)) {
        //dump(dictionary);
        var default_lang = getStorage("default_lang");
        //dump(default_lang);
        if (default_lang != "undefined" && default_lang != "") {
            dump("INIT TRANSLATE");
            translator = $('body').translate({
                lang: default_lang,
                t: dictionary
            });
        }
    }
    appdata.ontranslationComplete();
}

function getTrans(words, words_key) {
    var temp_dictionary = '';
    /*dump(words);
     dump(words_key);	*/
    if (getStorage("translation") != "undefined") {
        temp_dictionary = JSON.parse(getStorage("translation"));
    }
    if (!empty(temp_dictionary)) {
        //dump(temp_dictionary);
        var default_lang = getStorage("default_lang");
        //dump(default_lang);
        if (default_lang != "undefined" && default_lang != "") {
            //dump("OK");
            if (array_key_exists(words_key, temp_dictionary)) {
                //dump('found=>' + words_key +"=>"+ temp_dictionary[words_key][default_lang]);
                return temp_dictionary[words_key][default_lang];
            }
        }
    }
    return words;
}

function about_page() {
    menu.setMainPage('page_about.html', {
        closeMenu: true
    });
}

function personal_inquiry() {
    sNavigator.pushPage("personal_inquiry.html");
    menu.setMainPage('personal_inquiry.html', {
        closeMenu: true
    });
}

function page_contact() {
    menu.setMainPage('page_contact.html', {
        closeMenu: true
    });
}
function page_contact_map() {
    sNavigator.pushPage("inquire_acc.html");
    menu.setMainPage('page_contact_map.html', {
        closeMenu: true
    });
}

function inquire_acc() {
    sNavigator.pushPage("inquire_acc.html");
    menu.setMainPage('inquire_acc.html', {
        closeMenu: true
    });

}

$.extend($.expr[':'], {
    'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});
String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};
var appdata = {
    search2: function (string) {
        if (string) {
            $('[modifier="tappable"]').removeClass('insearch').find('.restauran-title:containsi("' + string + '")').closest('[modifier="tappable"]').show().addClass('insearch');
            $('[modifier="tappable"]').find('.item_description:containsi("' + string + '")').closest('[modifier="tappable"]').show().addClass('insearch');
            $('[modifier="tappable"]').not('.insearch').hide();
            $('.my-row-bdr-nn-outer').addClass('my-row-bdr-nn-no');
        } else {
            $('#searhMenuInput').val('');
            $('[modifier="tappable"]').show();
            $('.my-row-bdr-nn-outer').removeClass('my-row-bdr-nn-no');
        }
    },
    pagename: '',
    ontranslationComplete: function () {

        var t = 0;
        if (this.pagename == 'page-home' || this.pagename == '') {

            $(document).on("keyup", ".search-input", function () {
                $('.pac-container').addClass('needsclick');
                $('.pac-item').addClass('needsclick');
            });
        }
        console.log(this.pagename);
        if (this.pagename == 'page-signup') {
            $('[name=contact_phone]').mask('(000)-000-0000');
        }

    },
    allHtml: '',
    texthide: function (obj) {
        $(obj).find('i').toggle();
        var target = $(obj).prev();
        if (target.hasClass('ellipsis')) {
            target.removeClass('ellipsis');
            target.css('white-space', 'normal');
            $('.navigation-bar__center').css('height', 'auto');
            $('.navigation-bar').css('height', 'auto');
        } else {
            target.addClass('ellipsis');
            $('.navigation-bar').css('height', '44px');
        }
    },
    shortText: function (obj) {
        var maxLength = 10;
        this.allHtml = obj.html();
        // if(this.allHtml.length>maxLength){
        if (!obj.hasClass('ellipsis')) {
            // obj.addClass('ellipsis').after('<span class="morebtn" onclick="popUpAddressSearh();"><i class="fa fa-pencil" style="font-size: 18px;"></i></span>');
        }
        //}
    },
    htmlTemplate: '',
    renderHtml: function (html, object) {
        $.each(object, function (index, value) {
            html = html.replaceAll(index, value);
        });
        return html;
    },
    creteHtml: function (template, data) {
        this.htmlTemplate = $('#' + template).html();
        if (this.htmlTemplate) {
            return this.renderHtml(this.htmlTemplate, data);
        }
    },
    creteHtmldata: function (template, data) {
        this.htmlTemplate = $('#' + template).html();
        var html = '';
        if (this.htmlTemplate) {
            $.each(data, function (index, value) {
                html = html + appdata.renderHtml(appdata.htmlTemplate, value);
            });
        }
        return html;
    },
    dataToHtml: function (html, object) {
        $.each(object, function (index, value) {
            html = html.replaceAll('_' + index + '_', value || '');
        });
        return html;
    },
    renderHtmldata: function (template, data) {
        this.htmlTemplate = $('#' + template).html();
        var html = '';
        if (this.htmlTemplate) {
            $.each(data, function (index, value) {
                html = html + appdata.dataToHtml(appdata.htmlTemplate, value);
            });
        }
        return html;
    }
}


jQuery(document).ready(function () {

});