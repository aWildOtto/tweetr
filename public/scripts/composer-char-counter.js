$(document).ready(function(){
    $('.tweetArea').first().on("keyup keydown",function(){
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