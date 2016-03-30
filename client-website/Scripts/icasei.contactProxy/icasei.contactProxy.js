var icasei = icasei || {};

icasei.contactProxy = (function () {
    var $public = {}, $private = {};

    $private.API_URL = "http://localhost:3000";

    $public.create = function (contact) {
        return jQuery.ajax({
            dataType: "json",
            type: "POST",
            url:  $private.API_URL + "/contacts.json",
            crossDomain: true,
            data: {contact : contact}
        });
    };

    return $public;
})(jQuery);
 
 