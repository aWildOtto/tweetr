/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(function(){
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
function createTweetElement(data){
    var timeAgo = moment(data.created_at).fromNow();
    var str = `<article class="clear">
          <header>
            <img src="${data.user.avatars.regular}">
            <span>${data.user.name}</span>
            <p class = "handle">${data.user.handle}</a>
          </header>
          <p class = "headerP">${escape(data.content.text)}</p>
          <footer>
            <p>${timeAgo}</p>               
            <div class="options">         
              <a href="/"><img src="/images/like.png"></a>
              <a href="/"><img src="/images/comment.png"></a>
              <a href="/"><img src="/images/share.png"></a>
            </div>
          </footer>
        </article>`;
    return str;
}
function loadTweets(){
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).done(function(data){
    renderTweets(data);
  });

}
function renderTweets(data){
  $('#all-tweets').empty();
  var reversedData = data.reverse(); 
  for(var i of reversedData){
    $('#all-tweets').append(createTweetElement(i));
  }
}
function flashMsg(str){
  $(".tweetArea").after(`<p id = 'flash'>${str}</p>`);
  setTimeout(function(){
    $("#flash").fadeOut();
    $("#flash").remove();
  },2000);
}

$("#compose").on("click",function(){
  $(".new-tweet").slideToggle(500,function(){
    $(".new-tweet").find("textarea").focus();
  });
});

loadTweets();
$("#newtweetsubmit").on("submit",function(event){
      event.preventDefault();
      var tweeted = $(".tweetArea").val();

      if(tweeted.length === 0){
        flashMsg("Empty tweet");
        return;
      }else if(tweeted.length > 140){
        flashMsg("Over the limit");
        return;
      }else if(tweeted === null){
        flashMsg("Message null");
        return;
      }
      
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).done(function(){
        $(".tweetArea").val("");
        loadTweets();
      });
    });

});
