function fileChangeFunction(fileInput) {
    readURL(fileInput);
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#GamePicture').attr('src', e.target.result.toString());
            $('#PictureName').val(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

//# sourceMappingURL=AddPicture.js.map