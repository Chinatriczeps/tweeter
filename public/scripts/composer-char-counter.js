// Implemented char counter which counts the number of characters and turns red if more than 140
$(document).ready(function () {
    console.log("document ready!");
    $('.new-tweet textarea').on('input', function () {
        let limit = 140 - $(this).val().length;
        console.log(limit)
        $('#counter').text(limit)
        if (limit < 0) {
            $('#counter').css('color', 'red');
            $('.new-tweet').find('.error').slideDown();
        } else {
            $('#counter').css('color', 'black');
            $('.new-tweet').find('.error').slideUp();
        }
    });
});