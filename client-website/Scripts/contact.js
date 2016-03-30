var contact = (function () {
    var $private = {}, $public = {};
    $(function () {
        $private.attachEvents();
    });
   
    $private.attachEvents = function () {
        $("#send_button").on("click", $private.sendContact);
    };

    $private.sendContact = function (event) {
        event.preventDefault();
        var newContact = {
            name: $("#first_name").val() + " " + $("#last_name").val(),
            email: $("#email").val()
        };
        icasei.contactProxy.create(newContact).then($private.showMessage);
    };

    $private.showMessage = function () {
        $("#success_message").show("slow");
    };


})(icasei.contactProxy);