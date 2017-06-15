$(document).ready(function(){
    $('.tweet_area').first().on("input",function(){
        var len = $(this).val().length;
        var counter = $('.counter').first();
        counter.text(140-len);
        if(len > 140){
            counter.addClass('overLimit');
        }else{
            counter.removeClass('overLimit');
        }
     });
});