const MICRO_ICON = 'mic-outline'
const PAUSE_ICON = 'pause-outline'

document.addEventListener('DOMContentLoaded', () => {
    let mediaRecorder
    let audioChunks = []
    let elapsedTime = 0

    let recording = document.getElementById('toggleButton')
    let audioPlayer = document.getElementById('audioPlayer')
    let deleteElement = document.getElementById('delete')
    let sendElement = document.getElementById('send')
    const icon = document.getElementById('icon')

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
        mediaRecorder = new MediaRecorder(stream)

        function updateTimer() {
            elapsedTime++
            const formattedTime = getFormattedTime(elapsedTime)
            document.getElementById('timer').querySelector('span').textContent = formattedTime
        }

        mediaRecorder.onstart = () => {
            elapsedTime = 0
            updateTimer()
            timerInterval = setInterval(updateTimer, 1000)

            icon.setAttribute('name', PAUSE_ICON)

            audioChunks = []
        }

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data)
            }
        }

        mediaRecorder.onstop = () => {
            clearInterval(timerInterval)
            let audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
            let audioUrl = URL.createObjectURL(audioBlob)
            audioPlayer.src = audioUrl

            icon.setAttribute('name', MICRO_ICON)
        }

        recording.addEventListener('click', () => {
            const iconNameAttr = icon.getAttribute('name')
            if (iconNameAttr === MICRO_ICON) {
                audioChunks = []
                mediaRecorder.start()
            }else {
                mediaRecorder.stop()
            }
        })

        sendElement.addEventListener('click', async() => {
            try{
                if(audioChunks != []){
                    const response = await uploadAudio(audioChunks)
                    const audioBlob = await response.blob()
                    const audioUrl = URL.createObjectURL(audioBlob)

                    audioPlayer.src = audioUrl
                    audioPlayer.play()
                }
            }catch(error){
                console.error('Ocorreu um problema')
            }
        })
        deleteElement.addEventListener('click', () => {
            audioPlayer.pause()
            audioPlayer.src = ''
        })
    })
    .catch(function(err) {
        console.error('Erro ao acessar o microfone:', err);
    })
})