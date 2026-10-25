(function () {
    var form = document.getElementById("signup-form");
    var success = document.getElementById("form-success");
    var errorBox = document.getElementById("form-error");
    if (!form) return;

    var submitButton = form.querySelector('button[type="submit"]');
    var API_URL = "https://jsonplaceholder.typicode.com/posts";

    var fields = {
        fullname: document.getElementById("fullname"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        level: document.getElementById("level"),
        password: document.getElementById("password"),
        confirm: document.getElementById("confirm-password"),
        rules: document.getElementById("rules")
    };

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function getFeedback(input) {
        var parent = input.parentElement;
        return parent.querySelector(".invalid-feedback") ||
               parent.parentElement.querySelector(".invalid-feedback");
    }

    var rules = {
        fullname: function (v) {
            if (!v.trim()) return "Please enter your name.";
            if (v.trim().length < 2) return "Name must be at least 2 characters.";
            if (!/^[A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүІіҺһ\s'-]+$/.test(v.trim()))
                return "Name can contain only letters, spaces and hyphens.";
            return "";
        },
        email: function (v) {
            if (!v.trim()) return "Email is required.";
            if (!emailPattern.test(v.trim())) return "Enter a valid email, e.g. you@example.com.";
            return "";
        },
        phone: function (v) {
            if (!v.trim()) return "";
            var digits = v.replace(/[\s()-]/g, "");
            if (!/^\d{10}$/.test(digits)) return "Phone must contain exactly 10 digits (e.g. 700 000 00 00).";
            return "";
        },
        level: function (v) {
            return v ? "" : "Please choose your level.";
        },
        password: function (v) {
            if (!v) return "Password is required.";
            if (v.length < 8) return "Password must be at least 8 characters.";
            if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Password must contain letters and digits.";
            return "";
        },
        confirm: function (v) {
            if (!v) return "Please confirm your password.";
            if (v !== fields.password.value) return "Passwords do not match.";
            return "";
        },
        rules: function () {
            return fields.rules.checked ? "" : "You must agree before sending.";
        }
    };

    function validateField(name) {
        var input = fields[name];
        var value = input.type === "checkbox" ? input.checked : input.value;
        var message = rules[name](input.type === "checkbox" ? "" : value);
        var feedback = getFeedback(input);

        input.setCustomValidity(message);
        if (feedback) feedback.textContent = message;

        input.classList.toggle("is-invalid", message !== "");
        var filled = input.type === "checkbox" ? input.checked : input.value.trim() !== "";
        input.classList.toggle("is-valid", message === "" && filled);
        return message === "";
    }

    Object.keys(fields).forEach(function (name) {
        var input = fields[name];
        var eventName = (input.tagName === "SELECT" || input.type === "checkbox") ? "change" : "input";
        input.addEventListener(eventName, function () {
            validateField(name);
            if (name === "password" && fields.confirm.value) validateField("confirm");
        });
        input.addEventListener("blur", function () {
            if (input.type !== "checkbox") validateField(name);
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        success.classList.add("d-none");
        errorBox.classList.add("d-none");

        var allValid = true;
        var firstInvalid = null;
        Object.keys(fields).forEach(function (name) {
            if (!validateField(name)) {
                allValid = false;
                if (!firstInvalid) firstInvalid = fields[name];
            }
        });

        if (!allValid) {
            firstInvalid.focus();
            return;
        }

        var data = Object.fromEntries(new FormData(form).entries());
        delete data.password;
        delete data["confirm-password"];

        setSending(true);
        sendApplication(data, handleSuccess, handleError);
    });

    function setSending(isSending) {
        submitButton.disabled = isSending;
        submitButton.textContent = isSending ? "Sending..." : "Send Application";
    }

    function handleSuccess(result) {
        setSending(false);
        form.reset();
        success.textContent = "Application sent (No. " + result.id +
            "). A trainer will contact you within one day.";
        success.classList.remove("d-none");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function handleError(error) {
        setSending(false);
        console.error("Application was not sent:", error);
        errorBox.classList.remove("d-none");
        errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function sendApplication(data, onSuccess, onError) {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Server answered with status " + response.status);
                }
                return response.json();
            })
            .then(onSuccess)
            .catch(onError);
    }

    form.addEventListener("reset", function () {
        success.classList.add("d-none");
        errorBox.classList.add("d-none");
        Object.keys(fields).forEach(function (name) {
            fields[name].classList.remove("is-valid", "is-invalid");
            fields[name].setCustomValidity("");
        });
    });
})();
