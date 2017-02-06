$( document ).ready(function() {
    function beginSlideShow() {
        setInterval(function() { 
            $('#middle-image').animate({
                left: "-=1000"
            }, 4000, function() {
                $('#middle-image img').get(1).setAttribute('id', '');
                $('#middle-image img').get(0).remove();
                $('#slide-show #middle-image').append('<img src=" ' + Images[SlideShowIndex] + '" id ="second-image">');
                 $('#middle-image').css('left', '0');

                if (++SlideShowIndex > MaxIndex) {
                    SlideShowIndex = 0;
                }
            });
        }, 9000);
    }

    var Images = [];
    var SlideShowIndex = 2;
    var MaxIndex;

    $('#slide-show ul li').each(function(){
        Images.push($(this).text().trim());
    });

    $('#slide-show ul li').promise().done(function() {
        MaxIndex = Images.length - 1
        $('#slide-show #middle-image').append('<img src=" ' + Images[1] + '" id ="second-image">');
        beginSlideShow();
    });

});
