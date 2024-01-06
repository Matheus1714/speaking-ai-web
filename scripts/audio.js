import { Record } from './record.js'

document.addEventListener('DOMContentLoaded', () => {
    const recorder = new Record()

    recorder.recordAudioControl.addEventListener('click', async (event) => {
        if (event.target === recorder.recordAudioControl){
            await recorder.toggleRecording()
        }
    })
})

