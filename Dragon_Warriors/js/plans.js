(function () {
    var radios = document.querySelectorAll('input[name="plan"]');
    var summary = document.getElementById("plan-summary");
    var form = document.getElementById("signup-form");

    if (!radios.length || !summary) return;

    function describePlan(plan) {
        switch (plan) {
            case "basic":
                return "Basic plan: 7,000 ₸/month. Full gym floor access.";
            case "premium":
                return "Premium plan: 12,000 ₸/month. Includes group classes and 1 personal session.";
            case "elite":
                return "Elite plan: 20,000 ₸/month. Weekly personal training and a nutrition plan.";
            default:
                return "Choose a plan to see what is included.";
        }
    }

    function render() {
        var checked = document.querySelector('input[name="plan"]:checked');
        summary.textContent = describePlan(checked ? checked.value : "");
    }

    radios.forEach(function (radio) {
        radio.addEventListener("change", render);
    });

    if (form) {
        form.addEventListener("reset", function () {
            setTimeout(render, 0);
        });
    }

    render();
})();
