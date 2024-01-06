const MicroIcons = {
    PLAY: 'mic-outline',
    STOP: 'square-outline'
}

export class Record {
    constructor() {
        this.audioPlayer = document.getElementById('audioPlayer')
        this.recordAudioControl = document.getElementById('recordAudioControl')
        this.wave = document.getElementById('wave')
        this.media = document.getElementById('media')
        
        this.mediaRecorder = null
        this.audioChunks = []
        this.isRecording = false

        this.recordAudioControl.addEventListener('click', () => this.toggleRecording())
    }

    async startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                this.mediaRecorder = new MediaRecorder(stream)

                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        this.audioChunks.push(e.data)
                    }
                }

                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
                    this.audioChunks = []
                    this.audioPlayer.src = URL.createObjectURL(audioBlob)
                }

                this.mediaRecorder.start()
            })
            .catch((error) => {
                console.error('Erro ao obter permissão de áudio: ', error)
            })
    }

    async stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.audioPlayer.addEventListener('loadedmetadata', () => {
                this.audioPlayer.play();
            });
        }
    }

    async toggleRecording() {
        const recordAudioControlIcon = this.recordAudioControl.querySelector('ion-icon')

        if (!this.isRecording) {
            recordAudioControlIcon.setAttribute('name', MicroIcons.STOP)
            this.wave.classList.add('startWave')
            await this.startRecording()
        } else {
            recordAudioControlIcon.setAttribute('name', MicroIcons.PLAY)
            this.wave.classList.remove('startWave')
            await this.stopRecording()
            this.audioPlayer.play()
        }
        this.isRecording = !this.isRecording
    }
}
