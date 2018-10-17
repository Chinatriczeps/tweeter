$(document).ready(function () {

    function loadTweets() {
        $.get("/tweets", function (tweets) {
            $("#tweets").empty();
            renderTweets(tweets)
        });

    }
    loadTweets();

    function createTweetElement(tweetData) {
        let $username = $("<h1>").addClass("username").text(tweetData.user.handle);
        let $full_name = $(`<h2 class="fullname">`).text(tweetData.user.name)
        let $avatar = $("<img>").addClass("avatar").attr("src", tweetData.user.avatars.small);
        let $tweetHeader = $("<header>").append($avatar, $username, $full_name);
        let $tweetData = $("<p>").text(tweetData.content.text)
        let $tweet_content = $("<div>").addClass("tweet-content").append($tweetData)
        let $icons = $('<div class="icons">');
        let $iFlag = $('<i class="fa fa-flag">');
        let $iRetweet = $('<i class="fa fa-retweet">');
        let $iHeart = $('<i class="fa fa-heart like-button">');
        $icons.append($iFlag, $iRetweet, $iHeart);
        let $timeStamp = $("<p>").addClass("timestamp").text(timeSince);
        let $footer = $("<footer>").append($icons, $timeStamp)
        let $tweet = $("<article>").addClass("tweet").append($tweetHeader, $tweet_content, $footer);
        return $tweet;
    }

    function renderTweets(tweets) {
        // Loop through tweets
        tweets.forEach(function (element) {
            // Call createTweetElement 
            let result = createTweetElement(element);
            $('#tweets').prepend(result)
        });
    }

    function showMessage(message) {
        alert(message);
    };

    function timeSince(created) {
      //Calculate seconds between now and date created
      let seconds = Math.floor((Date.now() - created) / 1000);
      //Check if year ago or >
      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        return interval + " years ago";
      } else if (interval === 1) {
        return interval + " year ago";
      }
      //Check if month ago or >
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months ago";
      } else if (interval === 1) {
        return interval + " month ago";
      }
      //Check if day ago or >
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      } else if (interval === 1) {
        return interval + " day ago";
      }
      //Check if hour ago or >
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      } else if (interval === 1) {
        return interval + " hour ago";
      }
      //Check if minute ago or >
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      } else if (interval === 1) {
        return interval + " minute ago";
      }
      return "Just now";
    }


    $('#createTweet').on('submit', (event) => {
        event.preventDefault();
        let data = $('#createTweet').serialize();
        let tweetLength = $('#textInput').val().length;
        if (tweetLength === 0) {
            showMessage("Please add text");
            return;
        };
        if (tweetLength > 140) {
            showMessage("Exceeded word limit");
            return;
        } else {
            $('#counter').text("140")
        }


        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: data,
            success: function (result) {
                $('#tweets').prepend(data)
                $('#textInput').val('');
                loadTweets();
            },
            error: function (err) {

            }
        })
    })
});