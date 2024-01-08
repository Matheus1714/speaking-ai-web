import { uploadAudio } from './upload.js'

document.addEventListener('DOMContentLoaded', () => {
    const send = document.querySelector('#send')
    const audioPlayer = document.querySelector('#audioPlayer')
    
    send.addEventListener('click', async () => {
        try{
            const languageSelect = document.querySelector('#lang-select .btn-select')
            const voiceSelect = document.querySelector('#voice-select .btn-select')
            const aiModelSelect = document.querySelector('#ai-model-select .btn-select')
            const temperatureRange = document.querySelector('#temperature')

            const language = languageSelect.textContent.trim()
            const model = aiModelSelect.textContent.trim()
            const voice = voiceSelect.textContent.trim()
            const temperature = temperatureRange.value / 100

            const response = await uploadAudio({language, model, temperature, voice})
            const audioBlob = await response.blob()
            const audioURL = URL.createObjectURL(audioBlob)
        
            audioPlayer.src = audioURL
            audioPlayer.play()
        }catch(error){
            console.error(error)
        }
    })
})
