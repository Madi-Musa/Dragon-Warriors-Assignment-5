(function () {
    var popup = document.getElementById("subscribe-popup");
    var openBtn = document.getElementById("open-popup");
    var closeBtn = document.getElementById("close-popup");
    var form = document.getElementById("subscribe-form");
    var success = document.getElementById("popup-success");
    var nameInput = document.getElementById("sub-name");
    var emailInput = document.getElementById("sub-email");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!popup || !openBtn) return;

    function openPopup() {
        popup.hidden = false;
        document.body.classList.add("popup-open");
        nameInput.focus();
    }

    function closePopup() {
        popup.hidden = true;
        document.body.classList.remove("popup-open");
        openBtn.focus();
    }

    function resetForm() {
        form.reset();
        success.classList.add("d-none");
        form.classList.remove("d-none");
        nameInput.classList.remove("is-invalid");
        emailInput.classList.remove("is-invalid");
    }

    openBtn.addEventListener("click", function () {
        resetForm();
        openPopup();
    });

    closeBtn.addEventListener("click", closePopup);

    popup.addEventListener("click", function (event) {
        if (event.target === popup) closePopup();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !popup.hidden) closePopup();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var nameOk = nameInput.value.trim().length >= 2;
        var emailOk = emailPattern.test(emailInput.value.trim());

        nameInput.classList.toggle("is-invalid", !nameOk);
        emailInput.classList.toggle("is-invalid", !emailOk);
        if (!nameOk || !emailOk) return;

        form.classList.add("d-none");
        success.classList.remove("d-none");
        setTimeout(closePopup, 2000);
    });
})();
