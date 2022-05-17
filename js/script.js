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






let musicIdx = 0;
window.addEventListener('load', () => {
    loadMusic(musicIdx);
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
}
const prevMusic = function(){
    musicIdx--;
    musicIdx < 0 ? musicIdx = musics.length - 1 : musicIdx = musicIdx; 
    loadMusic(musicIdx);
    playMusic();
}
const pauseMusic = function(){
    container.classList.remove("paused");
    playPauseBtn.querySelector('i').innerText = "play_arrow";
    mainAudio.pause();
}
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = container.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', () => {
    nextMusic();
});
prevBtn.addEventListener('click', () => {
    prevMusic();
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
})