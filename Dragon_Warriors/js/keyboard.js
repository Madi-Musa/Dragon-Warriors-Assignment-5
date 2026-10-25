const menuLinks = document.querySelectorAll("#mainNavbar .nav-link");

menuLinks.forEach(function (link, index) {
    link.addEventListener("keydown", function (event) {
        let nextIndex;

        if (event.key === "ArrowRight") {
            nextIndex = (index + 1) % menuLinks.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (index - 1 + menuLinks.length) % menuLinks.length;
        } else {
            return;
        }

        event.preventDefault();
        menuLinks[nextIndex].focus();
    });
});