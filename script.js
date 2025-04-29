let songs = ["ByMySide.mp3", "DawnOfChange.mp3", "Hearty.mp3", "Hope.mp3", "SlowLife.mp3", "Yesterday.mp3"];
let currentSongIndex = 0;

const audio = new Audio();
const songInfo = document.querySelector(".songinfo");
const playbutton = document.querySelector(".songbuttons i.fa-play, .songbuttons i.fa-pause");
const volumeDownBtn = document.querySelector('.volume-down-btn');
const volumeUpBtn = document.querySelector('.volume-up-btn');
const volumeSlider = document.getElementById('volume-slider');


let isPlaying = false;

// Load and play song
function loadSong(index) {
    currentSongIndex = index;
    audio.src = `songs/${songs[index]}`;
    audio.play();
    isPlaying = true;
    updatePlayButton();
    updatePlaybar(songs[index]);
}

// Populate Playlist
function getSongs() {
    const songList = document.getElementById("songList");
    songList.innerHTML = "";

    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = song.replace(".mp3", "");
        li.style.cursor = "pointer";
        li.style.padding = "5px";
        li.style.borderBottom = "1px solid #333";
        li.style.fontFamily = "'Roboto', sans-serif";

        li.addEventListener("click", () => {
            loadSong(index);
        });

        songList.appendChild(li);
    });
}
getSongs();

// Play/Pause button
playbutton.addEventListener("click", () => {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updatePlayButton();
});

// Next song
document.querySelector(".fa-forward-step").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Previous song
document.querySelector(".fa-backward-step").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Update playbar info
function updatePlaybar(songName) {
    songInfo.innerText = songName.replace(".mp3", "");
}

// Update play/pause icon
function updatePlayButton() {
    if (isPlaying) {
        playbutton.classList.remove("fa-play");
        playbutton.classList.add("fa-pause");
    } else {
        playbutton.classList.remove("fa-pause");
        playbutton.classList.add("fa-play");
    }
}

// Volume Control
if (volumeSlider) {
    volumeSlider.addEventListener('input', function () {
        audio.volume = this.value;
    });

    volumeDownBtn.addEventListener('click', function () {
        if (audio.volume > 0) {
            audio.volume -= 0.1;
            volumeSlider.value = audio.volume;
        }
    });

    volumeUpBtn.addEventListener('click', function () {
        if (audio.volume < 1) {
            audio.volume += 0.1;
            volumeSlider.value = audio.volume;
        }
    });
}


function bindCardClickEvents() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const songFile = card.getAttribute("data-song");

        if (songFile) {
            card.addEventListener("click", () => {
                audio.src = `songs/${songFile}`;
                audio.play();
                isPlaying = true;
                updatePlaybar(songFile);
                updatePlayButton();
            });
        }
    });
}

bindCardClickEvents();
