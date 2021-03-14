function CountDown(){
    var count = 4;

    $("span").text(count);

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
function startGame() {



    //setInterval(function () {
    //    $.ajax({
    //        url: "/Home/GetCountDownViewComponent",
    //        method: "post",
    //        success: function (result) {
    //            $(".content").html(result);
    //        }
    //    });}, 6000);
    AddScore(null, null, null);
    $(".StartButton").hide('slow');
    $(".ShowScore").hide('slow');
    StartShowingPictures();
}
var i = 0;
var j = 0;
function StartShowingPictures() {

    if (i > 0) {
        j = 4000;
    }
    setTimeout(function () {   //  call a 4s setTimeout when the loop is called
        GetGamePictureAndStartMoving();   //  your code here
        i++;                    //  increment the counter
        if (i < 10) {           //  if the counter < 10, call the loop function
            StartShowingPictures();             //  ..  again which will tr vigger another
        }                                 //  ..  setTimeout()
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
    }, j)
}
//function RestartGame() {
//    $.ajax({
//        url: "/Home/GetStartButtonViewComponent",

//        method: "post",
//        success: function (result) {
//            $(".content").replaceWith(result);
//        }
//        });
//}

function GetGamePictureAndStartMoving() {
    $.ajax({

        url: "/Home/GetGamePictureViewComponent",
        method: "post",
        success: function (result) {
            $(".content").replaceWith(result);
            $.when(StartAnimation()).done(function () {
            });
        }
    })
}
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

function StartAnimation() {
    $(".image-box").animate({
        top: '200px',
    }, 3000, function () { $(this).remove(); });

    $("#draggable").draggable({
        containment: "body",
        opacity: 0.8,
        start: function () {
            $(".image-box").stop()
        },
        stop: function (event, ui) {


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




