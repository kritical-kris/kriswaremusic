const tracks = [
    { title: "Super Blox Bros - Menu", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Super Blox Bros - Menu.ogg" },
    { title: "Bloxxing Fields", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Bloxxing Fields.ogg" },
    { title: "Fire Bloxxer", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Fire Bloxxer.ogg" },
    { title: "BLOX SHOT", source: "Super Blox Bros.", arranger: "Kris Wright", file: "BLOX SHOT.ogg" },
    { title: "Escape from HQ", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Escape from HQ.ogg" },
    { title: "Chaos Canyon", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Chaos Canyon.ogg" },
    { title: "Banlands", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Banlands.ogg" },
    { title: "Blox On and On", source: "Super Blox Bros.", arranger: "Kris Wright", file: "Blox On and On.ogg" }
];

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const trackList = document.getElementById("track-list");
    const heroTitle = document.getElementById("hero-title");

    let currentTrackIndex = 0;
    let isPlaying = false;

    if (!trackList) return;

    function loadTrack(index) {
        currentTrackIndex = index;
        const track = tracks[currentTrackIndex];

        if (audioPlayer) audioPlayer.src = track.file;
        if (heroTitle) heroTitle.textContent = track.title;
        
        displayTracks();
    }

    function playTrack() {
        if (!audioPlayer || tracks.length === 0) return;
        audioPlayer.play().catch(function (err) {
            console.log("Audio play deferred until user interaction:", err);
        });
        isPlaying = true;
        displayTracks();
    }

    function pauseTrack() {
        if (!audioPlayer) return;
        audioPlayer.pause();
        isPlaying = false;
        displayTracks();
    }

    function displayTracks() {
        trackList.innerHTML = "";

        tracks.forEach(function (track, realIndex) {
            const card = document.createElement("div");
            card.className = "sound-item";

            const isCurrent = realIndex === currentTrackIndex;
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
                            <span class="badge-val">${track.arranger}</span>
                        </div>
                    </div>
                </div>
                <button class="circle-play-button">${iconSymbol}</button>
            `;

            card.addEventListener("click", function () {
                if (realIndex === currentTrackIndex) {
                    isPlaying ? pauseTrack() : playTrack();
                } else {
                    loadTrack(realIndex);
                    playTrack();
                }
            });

            trackList.appendChild(card);
        });
    }

    loadTrack(0);
});
