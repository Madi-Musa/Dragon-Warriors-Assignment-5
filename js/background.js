(function () {
    var colors = ["#151515", "#1a2a3f", "#2b1d3a", "#1d3a2a", "#43201f", "#3b3115"];
    var button = document.getElementById("bg-toggle");
    var index = 0;

    button.addEventListener("click", function () {
        index = (index + 1) % colors.length;
        document.body.style.backgroundColor = colors[index];
    });
})();
