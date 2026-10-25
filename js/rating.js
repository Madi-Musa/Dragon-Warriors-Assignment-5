const stars = document.querySelectorAll(".rating-star");
const ratingMessage = document.getElementById("rating-message");

let audioContext;
let currentSound;

async function playRatingSound() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    await audioContext.resume();

    if (currentSound) {
        currentSound.stop();
    }

    const sound = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const now = audioContext.currentTime;

    sound.frequency.value = 700;

    volume.gain.setValueAtTime(0.1, now);
    volume.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    sound.connect(volume);
    volume.connect(audioContext.destination);

    currentSound = sound;

    sound.onended = function () {
        sound.disconnect();
        volume.disconnect();

        if (currentSound === sound) {
            currentSound = null;
        }
    };

    sound.start(now);
    sound.stop(now + 0.15);
}

stars.forEach(function (star) {
    star.addEventListener("click", function () {
        const rating = Number(star.dataset.rating);

        stars.forEach(function (item) {
            const selected = Number(item.dataset.rating) <= rating;

            item.classList.toggle("btn-warning", selected);
            item.classList.toggle("btn-outline-warning", !selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        ratingMessage.textContent = `Your rating: ${rating}/5`;

        playRatingSound().catch(function (error) {
            console.error("Sound could not play:", error);
        });
    });
});