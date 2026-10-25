(function () {
    var buttons = document.querySelectorAll(".program-filter");
    var cards = document.querySelectorAll(".program-item");
    var status = document.getElementById("filter-status");

    if (!buttons.length || !cards.length) return;

    function describeFilter(filter) {
        switch (filter) {
            case "beginner":
                return "Beginner: 3 days a week, light weights and correct form.";
            case "intermediate":
                return "Intermediate: 4 days a week with progressive overload.";
            case "advanced":
                return "Advanced: 5-6 days a week of high-intensity training.";
            case "all":
            default:
                return "Showing all programs.";
        }
    }

    function toggleCard(card, show) {
        card.classList.toggle("d-none", !show);
        card.classList.remove("program-pop");
        if (show) {
            void card.offsetWidth;
            card.classList.add("program-pop");
        }
    }

    function applyFilter(filter) {
        buttons.forEach(function (button) {
            var active = button.dataset.filter === filter;
            button.classList.toggle("btn-warning", active);
            button.classList.toggle("btn-outline-warning", !active);
            button.setAttribute("aria-pressed", String(active));
        });

        cards.forEach(function (card) {
            toggleCard(card, filter === "all" || card.dataset.level === filter);
        });

        status.textContent = describeFilter(filter);
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            applyFilter(button.dataset.filter);
        });
    });

    document.addEventListener("keydown", function (event) {
        var popup = document.getElementById("subscribe-popup");
        var tag = event.target.tagName;
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (popup && !popup.hidden) return;

        switch (event.key) {
            case "1": applyFilter("all"); break;
            case "2": applyFilter("beginner"); break;
            case "3": applyFilter("intermediate"); break;
            case "4": applyFilter("advanced"); break;
            default: break;
        }
    });

    applyFilter("all");
})();
