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
           $('#enter-building-type-wrapper').fadeIn();
       });
    });

    $('#zip-code-text-input').blur(function() {
        $('#zip-code-label').css('color', main_color).text('Zip Code');
    });

    $("#zip-code-text-input").on("focus", function() {
        $('#zip-code-label').css('color', main_color).text('Zip Code');
    });

});

// Building Type scripts

function changeElementState(element, isSelect){
    if(!isSelect){
        element.type.removeClass('building-type-active').addClass('building-type-disabled');
    } else {
        element.type.removeClass('building-type-disabled').addClass('building-type-active');
    }
    return isSelect;
};

function onElementClick(element, arrayOfElements) {
    arrayOfElements.forEach(function(entry) {
        if(entry == element){
            entry.reverse();
        } else {
            entry.disable();
        }
    });
}


function buildingType (type) {
    this.type = type;
    this.isSelected = false;
    this.reverse = function () {
        this.isSelected = changeElementState(this, !this.isSelected);
    };
    this.disable = function () {
        this.isSelected = false;
        changeElementState(this, false);
    };
}

$('document').ready(function () {

    var buildingTypeHouse      = new buildingType($('#building-type-house'));
    var buildingTypeApartment  = new buildingType($('#building-type-apartment'));
    var buildingTypeCommercial = new buildingType($('#building-type-commercial'));
    var buildingTypeOther      = new buildingType($('#building-type-other'));

    var buildingTypes = [buildingTypeCommercial,buildingTypeHouse,buildingTypeApartment, buildingTypeOther];

    buildingTypes.forEach(function(buildingType) {
        $(buildingType.type).on('click', function () {
            onElementClick(buildingType, buildingTypes);
        });
    });

    $('#btn-building-type').on('click', function () {

        var i = 0;

        buildingTypes.forEach(function (buildingType) {
            if (buildingType.isSelected) {
                i++;
            }
        });

        if (i == 1) {
            $('#enter-building-type-wrapper').fadeOut(function () {
                 $('#enter-zip-wrapper').fadeIn();
            });
         } else {
            alert('Pick Building Type');
        }


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
}

$('document').ready(function () {
    $('#block-interapter').hide();
    $('#open-side-menu-icon').on('click', function () {
        slideMenu.toggle();
    })

    $('#block-interapter').on('click', function () {
       if(slideMenu.isOpened){
           slideMenu.toggle();
       }
    });

});