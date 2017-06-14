/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(function(){
function createTweetElement(data){
    // var $newTweet = $('<article>');
    
    // var $header = $("<header>");
    // var $img = $("<img>");
    // var $span = $("<span>");
    // var $handle = $("<p>");
    
    // $img.attr("src",escape(data.user.avatars));
    // $handle.text(data.user.handle);
    // $handle.addClass("handle");
    // $span.text(data.user.name);

    // $handle.append("</p>");
    // $span.append("</span>");

    // $header.append($img);
    // $header.append($span);
    // $header.append($handle);
    // $header.append("</header>");

    // var $tweetBody = $("<p>");
    // $tweetBody.text(data.content.text);
    // $tweetBody.append("</p>");

    // var $footer = $("<footer>");
    
    // $footer.append("<p>").addClass("headerP").append(data.created_at).append("</p>");
    // $footer.append("<div>").addClass("hv").append("<a>").attr("href","/").append("<img>").attr("scr","images/share.png").append("</a>");
    // $footer.append("<a>").attr("href","/").append("<img>").attr("scr","images/comment.png").append("</a>");
    // $footer.append("<a>").attr("href","/").append("<img>").attr("scr","images/like.png").append("</a>");
    // $footer.append("</div>");
    // $footer.append("</footer>");
    
    // $newTweet.append($header);
    // $newTweet.append($tweetBody);
    // $newTweet.append($footer);
    // $newTweet.append("</article>");

    var date = new Date(data.created_at*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var today = new Date();

    var str = `<article class="clear">
          <header>
            <img src="${data.user.avatars.regular}">
            <span>${data.user.name}</span>
            <p class = "handle">${data.user.handle}</a>
          </header>
          <p class = "headerP">${data.content.text}</p>
          <footer>
            <p>${data.created_at}</p>               
            <div class="options">         
              <a href="/"><img src="/images/like.png"></a>
              <a href="/"><img src="/images/comment.png"></a>
              <a href="/"><img src="/images/share.png"></a>
            </div>
          </footer>
        </article>`
    return str;
}

function renderTweets(data){
 
  for(var i of data){
    $('#all-tweets').append(createTweetElement(i));
  }
}
// Test / driver code (temporary). Eventually will get this from the server.
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


    // var $tweet = createTweetElement(tweetData);

    // // Test / driver code (temporary)
    // console.log($tweet); // to see what it looks like
    renderTweets(data);
});
