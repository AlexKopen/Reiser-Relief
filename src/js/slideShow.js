$( document ).ready(function() {
    function beginSlideShow() {
        setInterval(function() { 
            $('#middle-image').animate({
                left: "-=1000"
            }, 2000, function() {
                // Animation complete.
            });
        }, 5000);
    }

    var Images = [];

    $('#slide-show ul li').each(function(){
        Images.push($(this).text().trim());
    });

    $('#slide-show ul li').promise().done(function() {
         $('#slide-show #middle-image').append('<img src=" ' + Images[1] + '" id ="second-image">');
         beginSlideShow();
    });

});
