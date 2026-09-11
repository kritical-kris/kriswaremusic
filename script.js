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

const spawnlightOriginal = "sbbmt.ogg";
const spawnlightRemix = "sbbmtr.ogg";

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const trackList = document.getElementById("track-list");
    const heroTitle = document.getElementById("hero-title");
    
    // UI Control Elements
    const playAllBtn = document.getElementById("play-all-btn");
    const openMenuBtn = document.getElementById("open-menu-btn");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const sideDrawer = document.getElementById("side-drawer");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    // Hero buttons
    const heroBtns = document.querySelectorAll(".hero-btn");
    const originalBtn = heroBtns[0];
    const remixBtn = heroBtns[1];

    let currentTrackIndex = null;
    let activeHeroFile = null;
    let isPlaying = false;
    let isPlayAllActive = false;

    if (!trackList) return;

    if (heroTitle) {
        heroTitle.textContent = "Spawnlight";
    }

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

    // Auto-advance to the next song when Play All is enabled
    if (audioPlayer) {
        audioPlayer.addEventListener("ended", function () {
            if (isPlayAllActive && typeof currentTrackIndex === "number") {
                const nextIndex = (currentTrackIndex + 1) % tracks.length;
                currentTrackIndex = nextIndex;
                activeHeroFile = null;
                playAudioFile(tracks[nextIndex].file);
            } else {
                isPlaying = false;
                displayTracks();
            }
        });
    }

    // Play All Handler
    if (playAllBtn) {
        playAllBtn.addEventListener("click", function () {
            isPlayAllActive = !isPlayAllActive;
            playAllBtn.classList.toggle("active", isPlayAllActive);

            if (isPlayAllActive) {
                // Start playing from the first song in the list if nothing is playing
                if (typeof currentTrackIndex !== "number") {
                    currentTrackIndex = 0;
                    activeHeroFile = null;
                    playAudioFile(tracks[0].file);
                } else if (!isPlaying) {
                    audioPlayer.play();
                    isPlaying = true;
                    displayTracks();
                }
            }
        });
    }

    // Sidebar Menu Controls
    function toggleDrawer(open) {
        if (open) {
            sideDrawer.classList.add("active");
            sidebarOverlay.classList.add("active");
        } else {
            sideDrawer.classList.remove("active");
            sidebarOverlay.classList.remove("active");
        }
    }

    if (openMenuBtn) openMenuBtn.addEventListener("click", () => toggleDrawer(true));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => toggleDrawer(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", () => toggleDrawer(false));

    // Hero Theme Play Handlers
    if (originalBtn) {
        originalBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (activeHeroFile === spawnlightOriginal && isPlaying) {
                pauseTrack();
            } else {
                activeHeroFile = spawnlightOriginal;
                currentTrackIndex = "hero-original";
                playAudioFile(spawnlightOriginal);
            }
        });
    }

    if (remixBtn) {
        remixBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (activeHeroFile === spawnlightRemix && isPlaying) {
                pauseTrack();
            } else {
                activeHeroFile = spawnlightRemix;
                currentTrackIndex = "hero-remix";
                playAudioFile(spawnlightRemix);
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
                    activeHeroFile = null;
                    playAudioFile(track.file);
                }
            });

            trackList.appendChild(card);
        });
    }

    displayTracks();
});
