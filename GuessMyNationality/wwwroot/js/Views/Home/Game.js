function startGame() {
    AddScore(null, null, null);
    StartShowingPictures();
}
var i = 0;
var j = 0;
function StartShowingPictures() {
    if (i > 0) {
        j = 4000;
    }
    setTimeout(function () {
        GetGamePictureAndStartMoving(); //  your code here
        i++; //  increment the counter
        if (i < 5) { //  if the counter < 10, call the loop function
            StartShowingPictures(); //  ..  again which will tr vigger another
        } //  ..  setTimeout()
        else {
            RestartGame();
        }
    }, j);
}
function RestartGame() {
    $.ajax({
        url: "/Home/GetStartButtonViewComponent",
        method: "post",
        success: function (result) {
            $(".content").html(result);
        }
    });
}
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
function AddScore(ImageGuid, GameGuid, Nationality) {
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
            $(".image-box").stop();
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
//# sourceMappingURL=Game.js.map