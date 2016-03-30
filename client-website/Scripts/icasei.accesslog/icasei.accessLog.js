var icasei = icasei || {};

icasei.accessLogProxy = (function () {
    var $public = {}, $private = {};

    $private.API_URL = "http://localhost:3000";

    $public.sendInfo = function (access) {
        return jQuery.ajax({
            dataType: "json",
            type: "POST",
            url:  $private.API_URL + "/accesses.json",
            crossDomain: true,
            data: { access: access }
        });
    };

    return $public;
})(jQuery);

icasei.accessLog = (function () {
    var $public = {}, $private = {};

    $private.USER_ID_KEY = "icasei.accessLog.userId";

    $private.createCookie = function (name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    $private.getCookie = function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    };

    $private.newGuid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    $private.getCurrentUserId = function () {
        var guid = $private.getCookie($private.USER_ID_KEY);
        if (guid === "") {
            guid = $private.newGuid();
            $private.createCookie($private.USER_ID_KEY, guid);
        }
        return guid;
    };

    $private.logError = function (xhr, textStatus, errorThrown) {
        console.log("Error was thrown by icasei.accesslog server: " + errorThrown);
    };

    $public.track = function () {
        var access = {
            url: window.location.href,
            guid: $private.getCurrentUserId(),
            accessDateTime: new Date()
        };
        icasei.accessLogProxy.sendInfo(access).fail($private.logError);
    };

    return $public;
})(icasei.accessLogProxy);


icasei.accessLog.track();