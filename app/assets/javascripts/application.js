// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var warning_color = "#D32F2F";
var main_color    = "#009688";
var accent_color  = "#E91E63";

var zipcode = 'zipcode';


$('document').ready(function () {

    $('#enter-building-type-wrapper').hide();

    $('#btn-enter-zip').on('click', function () {

        zipcode = $("#zip-code-text-input").val();

        if(!$.isNumeric(zipcode) && $('#zip-code-text-input').val()) {
           $('#zip-code-label').css('color', warning_color).text(" Please enter " +
           " valid zip code");
            return;
        } else if (!$('#zip-code-text-input').val()) {
            $('#zip-code-label').css('color', warning_color).text("Zip Code required");
            return;
        }

        $('#enter-zip-wrapper').fadeOut(function () {
            $.ajax({
                type: 'GET',
                url: "/building-type",
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                dataType: "html",
                success: function(resultData) {
                    $('#card-wrapper').append(resultData);
                },
                error: function (resultData) {
                    alert('error');
                }
            });
       });
    });

    $('#zip-code-text-input').blur(function() {
        $('#zip-code-label').css('color', main_color).text('Zip Code');
    });

    $("#zip-code-text-input").on("focus", function() {
        $('#zip-code-label').css('color', main_color).text('Zip Code');
    });

});


// Navbar menu for mobile devices

var slideMenu = {
    type: '#side-menu-wrapper',
    isOpened: false,
    toggle: function () {
        if(this.isOpened){
            $('#open-side-menu-icon').removeClass('slide-menu-icon-wrapper-active');
            $('#block-interapter').fadeOut();
            $(this.type).removeClass('side-menu-wrapper-active').removeClass('text-grey').addClass('side-menu-wrapper-inactive').addClass('text-transparent');
        } else {
            $('#open-side-menu-icon').addClass('slide-menu-icon-wrapper-active');
            $('#block-interapter').fadeIn();
            $(this.type).removeClass('side-menu-wrapper-inactive').addClass('side-menu-wrapper-active');
        }
        this.isOpened = !this.isOpened;
    }
};

$('document').ready(function () {
    $('#block-interapter').hide();
    $('#open-side-menu-icon').on('click', function () {
        slideMenu.toggle();
    });

    $('#block-interapter').on('click', function () {
       if(slideMenu.isOpened){
           slideMenu.toggle();
       }
    });
});




