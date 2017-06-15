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
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
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
  $('#all_tweets').empty();
  var reversedData = data.reverse(); 
  for(var i of reversedData){
    $('#all_tweets').append(createTweetElement(i));
  }
}
function flashMsg(str){
  $(".tweet_area").after(`<p id = 'flash'>${str}</p>`);
  setTimeout(function(){
    $("#flash").fadeOut();
    $("#flash").remove();
  },2000);
}

$("#compose").on("click",function(){
  $(".new_tweet").slideToggle(500,function(){
    $(".new_tweet").find("textarea").focus();
  });
});

loadTweets();
$("#new_tweet_submit").on("submit",function(event){
      event.preventDefault();
      var tweeted = $(".tweet_area").val();

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
        $(".tweet_area").val("");
        loadTweets();
      });
    });

});
