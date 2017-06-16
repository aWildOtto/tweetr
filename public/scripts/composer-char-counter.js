$(function(){
    $('.tweet_area').first().on("input keyup keydown blur change focus", function (){
        var counter = $('.counter').first();
        var len = $(this).val().length;
        counter.text(140-len);
        if(len > 140){
            counter.addClass('overLimit');
        }else{
            counter.removeClass('overLimit');
        }
    });

});