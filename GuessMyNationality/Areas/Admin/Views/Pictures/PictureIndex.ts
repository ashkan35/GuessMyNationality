function RemovePic(id, input) {
    
    if (confirm("Do you realy want to delete this?"))
    $.ajax({
        url: "/Admin/Pictures/DeletePicture",
        data: { id },
        method: "post",
        success: function (result) {
            if (result.result) {
                $(input.closest("tr")).fadeTo(1000, 0.01, function () {
                    $(this).slideUp(150, function () {
                        $(this).remove();
                    });
                });
                
            }
            else {
                alert(result.message);
            }
        }
    });
}
function NationalityChanged(Nationality) {
    console.log(Nationality);
}
