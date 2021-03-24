//Start a function to show count down gif for 5 secends
//then Calls StartGame()
function CountDown() {
    var count = 4;
    $(".StartButton").hide('slow');
    var myTimer = setInterval(function () {
        if (count > 0) {
            count = count - 1;
            $.ajax({
                url: "/Home/GetCountDownViewComponent",
                method: "post",
                success: function (result) {
                    $(".content").html(result);
                }
            });
        }
        else {
            clearInterval(myTimer);
            startGame();
        }
    }, 1070);
}
//Call Add scores by null values to create a new Game and get Score Board
function startGame() {
    AddScore(null, null, null);
    $(".ShowScore").hide('slow');
    StartShowingPictures();
}
//calculate and add scores
//each picture has an optional attribute 'Nationality' with related value
//this function compares the photo nationality with div id and shows true or false to user without befor sending informayion to server
function AddScore(ImageGuid, GameGuid, Nationality) {
    if (GameGuid != null) {
        if ($("[name='Image']").attr('nationality') == Nationality) {
            $("#trueCircle").show('slow');
            $("#trueCircle").hide(1500);
        }
        else {
            $("#falseCircle").show('slow');
            $("#falseCircle").hide(1500);
        }
    }
    $.ajax({
        url: "/Home/GetScoresViewComponent",
        data: { ImageGuid: ImageGuid, GameGuid: GameGuid, nationality: Nationality },
        method: "post",
        success: function (result) {
            $("#ScoreSection").html(result);
        }
    });
}
//call 10 time a function to get a one picture from server each time
//when loop ends, hides the game section and shows the Restart game button and also shows user score in a separate dive
var i = 0;
var j = 0;
function StartShowingPictures() {
    if (i > 0) {
        j = 4000;
    }
    setTimeout(function () {
        GetGamePictureAndStartMoving(); //  your code here
        i++; //  increment the counter
        if (i < 10) { //  if the counter < 10, call the loop function
            StartShowingPictures(); //  ..  again which will tr vigger another
        } //  ..  setTimeout()
        else {
            setTimeout(function () {
                $("#StartButtonB").html("Restart Game");
                $(".StartButton").show('slow');
                $("#ShowScoreH").html("You Got" + "  " + $('#finalScore').html() + "  " + "Scores");
                $(".ShowScore").show('slow');
                i = 0;
                j = 0;
            }, 4000);
        }
    }, j);
}
//get random pictures from server and call the main function "start animation" to animate pictures and handle user drags
function GetGamePictureAndStartMoving() {
    $.ajax({
        url: "/Home/GetGamePictureViewComponent",
        method: "post",
        success: function (result) {
            $(".content").replaceWith(result);
            $.when(StartAnimation()).done(function () {
            });
        }
    });
}
//main function wich animate pictures to bottom of the page and handles user drags
function StartAnimation() {
    //Start animating picture
    $(".image-box").animate({
        top: '200px',
    }, 3000, function () { $(this).remove(); });
    //make pic draggable
    $("#draggable").draggable({
        containment: "body",
        opacity: 0.8,
        start: function () {
            //stop picture falling down on drag start
            $(".image-box").stop();
        },
        stop: function (event, ui) {
            //Calculate how many pixels must animate #draggable to left and top--All positive Numbers
            var left = ui.position.left;
            var top = ui.position.top;
            var div1Left = ((window.innerWidth - $('#Japanese')[0].offsetWidth) / 2) - 10;
            var div1Top = ((window.innerHeight - $('#Japanese')[0].offsetHeight) / 2) + 14;
            var div2Left = ((window.innerWidth - $('#Chinese')[0].offsetWidth) / 2) - 10;
            var div2Top = ((window.innerHeight - $('#Chinese')[0].offsetHeight) / 2) + 14;
            var div3Left = ((window.innerWidth - $('#Korean')[0].offsetWidth) / 2) - 10;
            var div3Top = ((window.innerHeight - $('#Korean')[0].offsetHeight) / 2) - 32;
            var div4Left = ((window.innerWidth - $('#Thai')[0].offsetWidth) / 2) - 10;
            var div4Top = ((window.innerHeight - $('#Thai')[0].offsetHeight) / 2) - 32;
            //calculate mouse movement from the drag start position when user releases the mouse button
            //then animates the picture toward the position calculated before and when animate() ends,calls Add score with related valuse 
            if (left < 20 && top < 20) {
                $("#draggable").animate({
                    left: '-' + div1Left + 'px',
                    top: '-' + div1Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $("[name='Image']")[0];
                    var div1 = $('#Japanese')[0];
                    AddScore(image.id, $("#GameGuid").val(), div1.id);
                });
            }
            else if (left > 20 && top < 20) {
                $("#draggable").animate({
                    left: '' + div2Left + 'px',
                    top: '-' + div2Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $("[name='Image']")[0];
                    var div2 = $('#Chinese')[0];
                    AddScore(image.id, $("#GameGuid").val(), div2.id);
                });
            }
            else if (left < 20 && top > 20) {
                $("#draggable").animate({
                    left: '-' + div3Left + 'px',
                    top: '' + div3Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $("[name='Image']")[0];
                    var div3 = $('#Korean')[0];
                    AddScore(image.id, $("#GameGuid").val(), div3.id);
                });
            }
            else if (left > 20 && top > 20) {
                $("#draggable").animate({
                    left: '' + div4Left + 'px',
                    top: '' + div4Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $("[name='Image']")[0];
                    var div4 = $('#Thai')[0];
                    AddScore(image.id, $("#GameGuid").val(), div4.id);
                });
            }
        }
    });
}
//# sourceMappingURL=Game.js.map