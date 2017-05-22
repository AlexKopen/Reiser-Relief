var menu = (function () {
    'use strict';

    function menuDrop() {
        $('#drop-down-menu').on('click', function () {
            $('header ul').slideToggle();
        });
    }

    function windowResize() {
        var enteredFromDesktop = !Modernizr.mq('(max-width: 768px)');
        $(window).on('resize', function () {
            if (!Modernizr.mq('(max-width: 768px)')) {
                enteredFromDesktop = true;
                $('header ul').css('display', 'inline-block');
            } else {
                if (enteredFromDesktop) {
                    enteredFromDesktop = false;
                    $('header ul').css('display', 'none');
                }
            }
        });
    }

    function init() {
        menuDrop();
        windowResize();
    }

    var menuModule = {
        init: init
    }

    return menuModule;

})();
