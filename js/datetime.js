(function () {
    var output = document.getElementById("current-datetime");

    function render() {
        var now = new Date();
        var datePart = now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        var timePart = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        });
        output.textContent = datePart + ", " + timePart;
        output.setAttribute("datetime", now.toISOString());
    }

    render();
    setInterval(render, 1000);
})();
