const tracks = [
    { title: "Super Blox Bros - Menu", source: "Super Blox Bros.", arranger: "Tixeron", file: "Super Blox Bros - Menu.ogg", icon: "sbb.png" },
    { title: "Bloxxing Fields", source: "Super Blox Bros.", arranger: "Tixeron", file: "Bloxxing Fields.ogg", icon: "d2.png" },
    { title: "Fire Bloxxer", source: "Super Blox Bros.", arranger: "Tixeron", file: "Fire Bloxxer.ogg", icon: "fire-bloxxer.png" },
    { title: "BLOX SHOT", source: "Super Blox Bros.", arranger: "Tixeron", file: "bloxshot-v2.ogg", icon: "d2.png" },
    { title: "Escape from HQ", source: "Super Blox Bros.", arranger: "Tixeron", file: "Escape from HQ.ogg", icon: "escape-hq.png" },
    { title: "Chaos Canyon", source: "Super Blox Bros.", arranger: "Tixeron", file: "Chaos Canyon.ogg", icon: "fire-bloxxer.png" },
    { title: "Banlands", source: "Super Blox Bros.", arranger: "Tixeron", file: "Banlands.ogg", icon: "sbb.png" },
    { title: "From Now On (Remix)", source: "Super Blox Bros.", arranger: "Tixeron", file: "Blox On and On.ogg", icon: "d2.png" }
];

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const trackList = document.getElementById("track-list");
    const heroTitle = document.getElementById("hero-title");
    
    // UI Controls
    const playAllBtn = document.getElementById("play-all-btn");
    const openMenuBtn = document.getElementById("open-menu-btn");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const sideDrawer = document.getElementById("side-drawer");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    // All Hero Buttons (Original, Remix, E3)
    const heroBtns = document.querySelectorAll(".hero-btn, .hero-footer-btn");

    let activeFilePath = null;
    let isPlaying = false;
    let isPlayAllActive = false;

    if (heroTitle) {
        heroTitle.textContent = "Spawnlight";
    }

    function playAudioFile(filePath) {
        if (!audioPlayer) return;

        // Load new file if different
        if (activeFilePath !== filePath) {
            audioPlayer.src = filePath;
            activeFilePath = filePath;
        }

        audioPlayer.play().then(() => {
            isPlaying = true;
            updateUI();
        }).catch(err => {
            console.error("Audio failed to play. Check if file exists:", filePath, err);
        });
    }

    function pauseTrack() {
        if (!audioPlayer) return;
        audioPlayer.pause();
        isPlaying = false;
        updateUI();
    }

    // Hero Buttons Click Event
    heroBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const filePath = btn.dataset.file;
            if (!filePath) return;

            if (activeFilePath === filePath && isPlaying) {
                pauseTrack();
            } else {
                isPlayAllActive = false;
                if (playAllBtn) playAllBtn.classList.remove("active");
                playAudioFile(filePath);
            }
        });
    });

    // Auto-advance for Play All mode
    if (audioPlayer) {
        audioPlayer.addEventListener("ended", function () {
            if (isPlayAllActive) {
                const currentIndex = tracks.findIndex(t => t.file === activeFilePath);
                const nextIndex = (currentIndex + 1) % tracks.length;
                playAudioFile(tracks[nextIndex].file);
            } else {
                isPlaying = false;
                updateUI();
            }
        });
    }

    // Play All Handler
    if (playAllBtn) {
        playAllBtn.addEventListener("click", function () {
            isPlayAllActive = !isPlayAllActive;
            playAllBtn.classList.toggle("active", isPlayAllActive);

            if (isPlayAllActive) {
                const currentIndex = tracks.findIndex(t => t.file === activeFilePath);
                if (currentIndex === -1) {
                    playAudioFile(tracks[0].file);
                } else if (!isPlaying) {
                    audioPlayer.play();
                    isPlaying = true;
                    updateUI();
                }
            } else {
                pauseTrack();
            }
        });
    }

    // Sidebar Menu Handlers
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

    // Render Tracklist
    function displayTracks() {
        if (!trackList) return;
        trackList.innerHTML = "";

        tracks.forEach(function (track) {
            const card = document.createElement("div");
            card.className = "sound-item";

            const isCurrent = (track.file === activeFilePath);
            const iconSymbol = (isCurrent && isPlaying) ? "❚❚" : "▶";

            card.innerHTML = `
                <div class="sound-item-left">
                    <div class="series-icon">
                        <img src="${track.icon}" alt="${track.title} icon" class="track-icon-img" />
                    </div>
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
                if (track.file === activeFilePath && isPlaying) {
                    pauseTrack();
                } else {
                    playAudioFile(track.file);
                }
            });

            trackList.appendChild(card);
        });
    }

    // Master UI Refresh Function
    function updateUI() {
        displayTracks();

        // Update Hero Icons
        heroBtns.forEach(btn => {
            const iconSpan = btn.querySelector("span");
            if (iconSpan) {
                const isCurrent = (btn.dataset.file === activeFilePath);
                iconSpan.textContent = (isCurrent && isPlaying) ? "❚❚" : "▶";
            }
        });
    }

    displayTracks();
});
