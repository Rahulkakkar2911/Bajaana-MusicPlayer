const container = document.querySelector('.container');
const musicImg = document.querySelector('.img-container img');
const musicNameEl = document.querySelector('.song-details .name');
const musicArtistEl = document.querySelector('.song-details .artist');
const mainAudio = document.querySelector('#main-audio');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const progressBar = document.querySelector('.progress-bar');
const currTime = document.querySelector('.current');
const durTime = document.querySelector('.duration');
const progressArea = document.querySelector('.progress-area');
const musicList = document.querySelector('.music-list');
const showMoreMusic = document.querySelector('#more-music');
const hideMoreMusic = document.querySelector('#close');
const ultag = document.querySelector('ul');

let musicIdx = 0;
window.addEventListener('load', () => {
    loadMusic(musicIdx);
    playingNow();
})
const loadMusic = function (idx){
    musicNameEl.innerText = musics[idx].musicName; 
    musicArtistEl.innerText = musics[idx].artist;
    musicImg.src = `images/${musics[idx].img}.jpg`; 
    mainAudio.src = `music/${musics[idx].src}.mp3`;
    
}
const playMusic = function(){
    container.classList.add("paused");
    playPauseBtn.querySelector('i').innerText = "pause";
    mainAudio.play();
}
const nextMusic = function(){
    musicIdx = (musicIdx + 1) % musics.length;
    loadMusic(musicIdx);
    playMusic();
    playingNow();

}
const prevMusic = function(){
    musicIdx--;
    musicIdx < 0 ? musicIdx = musics.length - 1 : musicIdx = musicIdx; 
    loadMusic(musicIdx);
    playMusic();
    playingNow();

}
const pauseMusic = function(){
    container.classList.remove("paused");
    playPauseBtn.querySelector('i').innerText = "play_arrow";
    mainAudio.pause();
}
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = container.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();

});

nextBtn.addEventListener('click', () => {
    nextMusic();
    playingNow();
});
prevBtn.addEventListener('click', () => {
    prevMusic();
    playingNow();
})
mainAudio.addEventListener('timeupdate', (e) => {
    //get current time and duration
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;


    mainAudio.addEventListener('loadeddata', () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        durTime.innerText = `${totalMin}:${totalSec}`;


    })
    let currMin = Math.floor(currentTime / 60);
    let currSec = Math.floor(currentTime % 60);
    if(currSec < 10){
        currSec = `0${currSec}`;
    }
    currTime.innerText = `${currMin}:${currSec}`;
});
progressArea.addEventListener('click', (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
    playMusic();
    playingNow();
});
const repeatBtn = document.querySelector('#repeat');
repeatBtn.addEventListener('click', ()=>{
    let text = repeatBtn.innerText;
    switch (text) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
        
        default:
            break;
    }
})
//song ended
mainAudio.addEventListener('ended', () => {
    let text = repeatBtn.innerText;
    switch (text) {
        case "repeat":
            nextMusic();
            playingNow();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIdx);
            playMusic();
            playingNow();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random()) * musics.length);
            do {
                randIndex = Math.floor((Math.random()) * musics.length);
            } while (musicIdx == randIndex);
            musicIdx = randIndex;
            loadMusic(musicIdx);
            playMusic();
            playingNow();
            break;
        
        default:
            break;
    }
});
showMoreMusic.addEventListener('click', ()=>{
    musicList.classList.toggle('show');
});
hideMoreMusic.addEventListener('click', ()=>{
    musicList.classList.toggle('show');
});

for (let i = 0; i < musics.length; i++) {
    let liTag = `
    <li li-index = "${i}">
        <div class="row">
            <span>${musics[i].musicName}</span>
            <p>${musics[i].artist}</p>
        </div>
        <audio class="${musics[i].src}" src="music/${musics[i].src}.mp3"></audio>        
        <span id="${musics[i].src}" class="audio-duration">3:40</span>
    </li>`;
    ultag.insertAdjacentHTML("beforeend", liTag);
    
    const liAudioDuration = document.querySelector(`#${musics[i].src}`);
    const liAudioTag = document.querySelector(`.${musics[i].src}`);
    liAudioTag.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("audio-duration", `${totalMin}:${totalSec}`);
    })
}

const allLiTags = document.querySelectorAll('li');

const clicked = function(element){
    let getLiIndex = element.getAttribute("li-index");
        musicIdx = parseInt(getLiIndex);
        loadMusic(musicIdx);
        playMusic();
        playingNow();
}
const playingNow = function(){
    
    for(let i = 0; i < allLiTags.length; i++) {
        let audioTag = allLiTags[i].querySelector('.audio-duration');
        if(allLiTags[i].classList.contains('playing')){
            allLiTags[i].classList.remove('playing');
            audioTag.innerText = audioTag.getAttribute("audio-duration");
        }
        if(allLiTags[i].getAttribute('li-index') == musicIdx){
                allLiTags[i].classList.add('playing');
                audioTag.innerText = "Playing";
            }
        allLiTags[i].setAttribute('onclick', "clicked(this)");
    }
}
