/*
 * Client-side JS logic
*/

$(function(){
//-------------utility functions-----------------
function escape(str) {//escape the tweet body to avoid cross-site scripting
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
function createTweetElement(data){//create an actual html element with the tweets data
    var time_ago = moment(data.created_at).fromNow();
    var str = `<article class="clear">
          <header>
            <img src="${data.user.avatars.regular}">
            <span>${data.user.name}</span>
            <p class = "handle">${data.user.handle}</a>
          </header>
          <p class = "headerP">${escape(data.content.text)}</p>
          <footer>
            <p>${time_ago}</p>               
            <div class="options">         
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
            </div>
          </footer>
        </article>`;
    return str;
}
function loadTweets(){//send a get request to the server to get data
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).done(function(data){
    renderTweets(data);
  });

}
function renderTweets(data){//render all tweets onto html
  $('#all_tweets').empty();
  data.forEach(function(tweet){
    $('#all_tweets').append(createTweetElement(tweet));
  });
}
function flashMsg(str){//send a flash message if a tweet is out of bound
  $(".tweet_area").after(`<p id = 'flash'>${str}</p>`);
  setTimeout(function(){
    $("#flash").fadeOut();
    $("#flash").remove();
  },2000);
}

//-------------jquery actions--------------------
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
        flashMsg("Text length is over the limit");
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
