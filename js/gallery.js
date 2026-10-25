const mainPhoto = document.getElementById("main-photo");
const caption = document.getElementById("photo-caption");
const photos = document.querySelectorAll(".gallery-photo");

photos.forEach(function (photo) {
    photo.addEventListener("click", function () {
        mainPhoto.src = photo.src;
        mainPhoto.alt = photo.alt;
        caption.textContent = photo.alt;
    });
});