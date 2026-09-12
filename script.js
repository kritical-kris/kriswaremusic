const tracks = [
    { 
        title: "Super Blox Bros - Menu", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Super Blox Bros - Menu.ogg",
        icon: "sbb.png" 
    },
    { 
        title: "Bloxxing Fields", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Bloxxing Fields.ogg",
        icon: "d2.png" 
    },
    { 
        title: "Fire Bloxxer", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Fire Bloxxer.ogg",
        icon: "fire-bloxxer.png" 
    },
    { 
        title: "BLOX SHOT", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "bloxshot-v2.ogg",
        icon: "d2.png" 
    },
    { 
        title: "Escape from HQ", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Escape from HQ.ogg",
        icon: "escape-hq.png" 
    },
    { 
        title: "Chaos Canyon", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Chaos Canyon.ogg",
        icon: "fire-bloxxer.png" 
    },
    { 
        title: "Banlands", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Banlands.ogg",
        icon: "sbb.png" 
    },
    { 
        title: "From Now On (Remix)", 
        source: "Super Blox Bros.", 
        arranger: "Tixeron", 
        file: "Blox On and On.ogg",
        icon: "blox-on-and-on.png" 
    }
];

const spawnlightOriginal = "sbbmt.ogg";
const spawnlightRemix = "sbbmtr.ogg";

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

    // Hero buttons
    const heroButtons = document.querySelectorAll(".hero-buttons .hero-btn");
    const originalBtn = heroButtons[0];
    const remixBtn = heroButtons[1];

    let currentTrackIndex = null;
    let activeHeroFile = null;
    let isPlaying = false;
    let isPlayAllActive = false;

    if (heroTitle) {
        heroTitle.textContent = "Spawnlight";
    }

    function playAudioFile(filePath) {
        if (!audioPlayer) return;
        audioPlayer.src = filePath;
        
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                displayTracks();
            }).catch(err => {
                console.error("Audio failed to play. Check if file exists:", filePath, err);
            });
        }
    }

    function pauseTrack() {
        if (!audioPlayer) return;
        audioPlayer.pause();
        isPlaying = false;
        displayTracks();
    }

    // Auto-advance for Play All
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

    // Hero Original Button Click
    if (originalBtn) {
        originalBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (activeHeroFile === spawnlightOriginal && isPlaying) {
                pauseTrack();
            } else {
                activeHeroFile = spawnlightOriginal;
                currentTrackIndex = "hero-original";
                playAudioFile(spawnlightOriginal);
            }
        });
    }

    // Hero Remix Button Click
    if (remixBtn) {
        remixBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (activeHeroFile === spawnlightRemix && isPlaying) {
                pauseTrack();
            } else {
                activeHeroFile = spawnlightRemix;
                currentTrackIndex = "hero-remix";
                playAudioFile(spawnlightRemix);
            }
        });
    }

    // Render Tracklist with PNG Icons
    function displayTracks() {
        if (!trackList) return;
        trackList.innerHTML = "";

        tracks.forEach(function (track, realIndex) {
            const card = document.createElement("div");
            card.className = "sound-item";

            const isCurrent = (realIndex === currentTrackIndex);
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
