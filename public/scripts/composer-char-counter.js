$(function(){
    function counter_sub_btn(){
        counterAction(0);
    }
    function counter_text_area(){
        var len = $(this).val().length;
        counterAction(len);
     }
    function counterAction(len){
        var counter = $('.counter').first();
        counter.text(140-len);
        if(len > 140){
            counter.addClass('overLimit');
        }else{
            counter.removeClass('overLimit');
        }
    }
    $('.tweet_area').first().on("input keyup keydown blur change focus",counter_text_area);
    $('.submit_btn').on("click",counter_sub_btn);

});