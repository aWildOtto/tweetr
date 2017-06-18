/*
 * Client-side JS logic
*/

$(function(){
  let logged_in = false;
//-------------utility functions-----------------
  function escape(str) {//escape the tweet body to avoid cross-site scripting
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  function createTweetElement(data, logged){//create an actual html element with the tweets data
      var time_ago = moment(data.created_at).fromNow();
      var likes = logged_in?`<p>${data.likeCount}</p>`:"";
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
                ${likes}
                <i data-value = "${data._id}" class="like_btn fa fa-thumbs-o-up" aria-hidden="true"></i>
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
  function flashMsg(str, place){//send a flash message if a tweet is out of bound
    place.after(`<p id = 'flash'>${str}</p>`);
    setTimeout(function(){
      $("#flash").fadeOut();
      $("#flash").remove();
    },2000);
  }

//-------------jquery actions--------------------
  $("body").on("click","i.like_btn",function(){
    if(logged_in){
      $.ajax({
        method: 'POST',
        url: '/tweets/like',
        data: "id=" + $(this).data().value
      }).done(function(){
        loadTweets();
      });
    }
  });
  $("#compose").on("click", function(){
    $(".new_tweet").slideToggle(500, function(){
      $(".new_tweet").find("textarea").focus();
    });
  });

  loadTweets();
  $("#new_tweet_submit").on("submit",function(event){
        event.preventDefault();
        var tweeted = $(".tweet_area").val();

        if(tweeted.length === 0){
          flashMsg("Empty tweet", $(".tweet_area"));
          return;
        }else if(tweeted.length > 140){
          flashMsg("Text length is over the limit", $(".tweet_area"));
          return;
        }
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(this).serialize()
        }).done(function(){
          $(".counter").text("140").removeClass('overLimit');
          $(".tweet_area").val("");
          loadTweets();
        });
      });
//----------------AJAX login form submit-----------------------
  $("#log_in_form").on("submit",function(event){
    event.preventDefault();
    var email = $("#log_in_email").val();
    var pw = $("#log_in_password").val();
    if(email.length === 0 || pw.length === 0){
      flashMsg("Password or email is empty", $(".modal_body").last());
      return;
    }
    $.ajax({
        method: 'POST',
        url: '/login',
        data: $(this).serialize()
      }).done(function(){
        $("#log_in").modal("hide");
        $("#login").hide();
        $("#signup").hide();
        $(".hidden_welcome").removeClass("hidden_welcome");
        logged_in = true;
        loadTweets();
      });
  });

  $("#sign_up_form").on("submit",function(event){
    event.preventDefault();
    var email = $("#sign_up_email").val();
    var pw = $("#sign_up_pw").val();
    if(email.length === 0 || pw.length === 0){
      flashMsg("Password or email is empty",$(".modal_body").first());
      return;
    }
    $.ajax({
      method: 'POST',
      url: '/register',
      data: $(this).serialize()
    }).done(function(){
      $("#login_btns").addClass("logged_in");
      $("#sign_up").modal("hide");
      logged_in = true;
      loadTweets();
    });
  });
});
