(function () {
    var buttons = document.querySelectorAll(".faq-question");

    function setState(button, open) {
        var panel = document.getElementById(button.getAttribute("aria-controls"));
        button.setAttribute("aria-expanded", String(open));
        panel.classList.toggle("is-open", open);
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            setState(button, button.getAttribute("aria-expanded") !== "true");
        });
    });

    window.addEventListener("resize", function () {
        buttons.forEach(function (button) {
            if (button.getAttribute("aria-expanded") === "true") {
                setState(button, true);
            }
        });
    });
})();
