import { uploadAudio } from './upload.js'

document.addEventListener('DOMContentLoaded', () => {
    const send = document.querySelector('#send')
    const audioPlayer = document.querySelector('#audioPlayer')

    const languageSelect = document.querySelector('#lang-select .btn-select .sbtn-text')
    const aiModel = document.querySelector('#ai-model .btn-select .sbtn-text')
    
    send.addEventListener('click', async () => {
        try{
            const language = languageSelect.textContent
            const model = aiModel.textContent

            const response = await uploadAudio({language, model})
            const audioBlob = await response.blob()
            const audioURL = URL.createObjectURL(audioBlob)
        
            audioPlayer.src = audioURL
            audioPlayer.play()
        }catch(error){
            console.error(error)
        }
    })
})
