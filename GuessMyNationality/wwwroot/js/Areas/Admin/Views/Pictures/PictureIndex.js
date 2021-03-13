function RemovePic(id, input) {
    if (confirm("Do you realy want to delete this?"))
        $.ajax({
            url: "/Admin/Pictures/DeletePicture",
            data: { id: id },
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
//function NationalityChanged(Nationality) {
//    let url = (new URL(document.location.toString()));
//    url.searchParams.delete("PageId");
//    url.searchParams.set("Ntionality", Nationality);
//    window.location = url;
//}
//# sourceMappingURL=PictureIndex.js.map
function NationalityChanged(Nationality) {
    if (Nationality != "Please select") {
        let url = (new URL(document.location.toString()));
        url.searchParams.delete("PageId");
        url.searchParams.set("Ntionality", Nationality);
        window.location = url;
    }
    else {
        let url = (new URL(document.location.toString()));
        url.searchParams.delete("PageId");
        url.searchParams.delete("Ntionality");
        window.location = url;
    }

}