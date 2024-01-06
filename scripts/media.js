const audioPlayer = document.querySelector('#audioPlayer')

const playMedia = document.querySelector('#media')

const timeProgress = document.querySelector('#time-progress')
const timeEnd = document.querySelector('#time-end')

const progress = document.querySelector('.record-progress .progress-bar .progress')

const formatTimeProgress = (timeInSeconds) => {
    if(!timeInSeconds){
        return '00:00'
    }

    const seconds = Math.floor(timeInSeconds % 60)
    const minutes = Math.floor(timeInSeconds / 60)

    const formatedSeconds = seconds.toString().padStart(2, '0')
    const formatedMinutes = minutes.toString().padStart(2, '0')

    return `${formatedMinutes}:${formatedSeconds}`
}

const updateProgressBar = () => {
    const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progress.style.width = `${progressPercentage}%`;
}

const updateMusicProgress = () => {
    const progressInSeconds = audioPlayer.currentTime;
    const durationInSeconds = audioPlayer.duration

    timeProgress.textContent = formatTimeProgress(progressInSeconds)
    timeEnd.textContent = formatTimeProgress(durationInSeconds - progressInSeconds)

    updateProgressBar()
}

const AudioPlayerIcons = {
    PLAY: 'play-outline',
    STOP: 'pause-outline'
}

const playAudio = () => {
    const iconPlayMedia = playMedia.querySelector('ion-icon')
    if(audioPlayer.paused){
        iconPlayMedia.setAttribute('name', AudioPlayerIcons.STOP)
        
        audioPlayer.play()
        setInterval(updateMusicProgress, 100)
    }else{
        iconPlayMedia.setAttribute('name', AudioPlayerIcons.PLAY)
        audioPlayer.pause()
    }
}

playMedia.addEventListener('click', playAudio)
