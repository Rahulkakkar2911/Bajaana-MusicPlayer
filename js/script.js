const container = document.querySelector('.container');
const musicImg = document.querySelector('.img-container img');
const musicNameEl = document.querySelector('.song-details .name');
const musicArtistEl = document.querySelector('.song-details .artist');
const mainAudio = document.querySelector('#main-audio');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');




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