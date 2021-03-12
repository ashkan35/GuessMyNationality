function startGame() {
    $.ajax({
        url: "/Home/GetGamePictureViewComponent",
        method: "post",
        success: function (result) {
            $(".content").replaceWith(result);
            StartAnimation();
        }
    });
}
function StartAnimation() {
    $(".image-box").animate({
        top: '150px',
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
            var div1Left = ((window.innerWidth - $('#div1')[0].offsetWidth) / 2) - 10;
            var div1Top = ((window.innerHeight - $('#div1')[0].offsetHeight) / 2) + 14;
            var div2Left = ((window.innerWidth - $('#div2')[0].offsetWidth) / 2) - 10;
            var div2Top = ((window.innerHeight - $('#div2')[0].offsetHeight) / 2) + 14;
            var div3Left = ((window.innerWidth - $('#div3')[0].offsetWidth) / 2) - 10;
            var div3Top = ((window.innerHeight - $('#div3')[0].offsetHeight) / 2) - 32;
            var div4Left = ((window.innerWidth - $('#div4')[0].offsetWidth) / 2) - 10;
            var div4Top = ((window.innerHeight - $('#div4')[0].offsetHeight) / 2) - 32;
            if (left < 20 && top < 20) {
                $("#draggable").animate({
                    left: '-' + div1Left + 'px',
                    top: '-' + div1Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $('#image')[0];
                    var div1 = $('#div1')[0];
                    alert('div-id : ' + div1.id + '\n' + 'image-id : ' + image.id);
                });
            }
            else if (left > 20 && top < 20) {
                $("#draggable").animate({
                    left: '' + div2Left + 'px',
                    top: '-' + div2Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $('#image')[0];
                    var div2 = $('#div2')[0];
                    alert('div-id : ' + div2.id + '\n' + 'image-id : ' + image.id);
                });
            }
            else if (left < 20 && top > 20) {
                $("#draggable").animate({
                    left: '-' + div3Left + 'px',
                    top: '' + div3Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $('#image')[0];
                    var div3 = $('#div3')[0];
                    alert('div-id : ' + div3.id + '\n' + 'image-id : ' + image.id);
                });
            }
            else if (left > 20 && top > 20) {
                $("#draggable").animate({
                    left: '' + div4Left + 'px',
                    top: '' + div4Top + 'px',
                    opacity: '0'
                }, 1000, function () {
                    var image = $('#image')[0];
                    var div4 = $('#div4')[0];
                    alert('div-id : ' + div4.id + '\n' + 'image-id : ' + image.id);
                });
            }
        }
    });
}
//# sourceMappingURL=Game.js.map