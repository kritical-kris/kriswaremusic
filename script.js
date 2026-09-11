const tracks = [
    { title: "Super Blox Bros - Menu", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Super Blox Bros - Menu.ogg" },
    { title: "Bloxxing Fields", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Bloxxing Fields.ogg" },
    { title: "Fire Bloxxer", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Fire Bloxxer.ogg" },
    { title: "BLOX SHOT", source: "Super Blox Bros.", arranger: "Kris Wright", file: "bloxshot-v2.ogg" },
    { title: "Escape from HQ", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Escape from HQ.ogg" },
    { title: "Chaos Canyon", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Chaos Canyon.ogg" },
    { title: "Banlands", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Banlands.ogg" },
    { title: "Blox On and On", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Blox On and On.ogg" }
];

const mainThemeTrack = {
    title: "Super Blox Bros - Main Theme",
    file: "sbbmt.ogg"
};

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const trackList = document.getElementById("track-list");
    const heroTitle = document.getElementById("hero-title");
    const heroBanner = document.querySelector(".hero-banner");

    let currentTrackIndex = -1; // -1 represents the Hero Main Theme
    let isPlaying = false;

    if (!trackList) return;

    function playAudioFile(filePath) {
        if (!audioPlayer) return;
        audioPlayer.src = filePath;
        audioPlayer.play().then(() => {
            isPlaying = true;
            displayTracks();
        }).catch(err => console.log("User interaction required to start audio:", err));
    }

    function pauseTrack() {
        if (!audioPlayer) return;
        audioPlayer.pause();
        isPlaying = false;
        displayTracks();
    }

    // Hero Banner Play Handler
    if (heroBanner) {
        heroBanner.style.cursor = "pointer";
        heroBanner.addEventListener("click", function () {
            if (currentTrackIndex === -1 && isPlaying) {
                pauseTrack();
            } else {
                currentTrackIndex = -1;
                if (heroTitle) heroTitle.textContent = mainThemeTrack.title;
                playAudioFile(mainThemeTrack.file);
            }
        });
    }

    function displayTracks() {
        trackList.innerHTML = "";

        tracks.forEach(function (track, realIndex) {
            const card = document.createElement("div");
            card.className = "sound-item";

            const isCurrent = (realIndex === currentTrackIndex);
            const iconSymbol = (isCurrent && isPlaying) ? "❚❚" : "▶";

            card.innerHTML = `
                <div class="sound-item-left">
                    <div class="series-icon">🎮</div>
                    <div class="track-details">
                        <div class="track-title-text">${track.title}</div>
                        <div class="track-badges">
                            <span class="badge-label">From</span>
                            <span class="badge-val">${track.source}</span>
                            <span class="badge-label">Arrangement</span>
                            <span class="badge-val" style="color: #ffffff; font-weight: bold;">${track.arranger}</span>
                        </div>
                    </div>
                </div>
                <button class="circle-play-button">${iconSymbol}</button>
            `;

            card.addEventListener("click", function (e) {
                e.stopPropagation();
                if (realIndex === currentTrackIndex) {
                    isPlaying ? pauseTrack() : audioPlayer.play();
                } else {
                    currentTrackIndex = realIndex;
                    if (heroTitle) heroTitle.textContent = track.title;
                    playAudioFile(track.file);
                }
            });

            trackList.appendChild(card);
        });
    }

    displayTracks();
});
