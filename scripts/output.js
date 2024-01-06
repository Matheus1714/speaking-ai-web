import { uploadAudio } from './upload.js'

document.addEventListener('DOMContentLoaded', () => {
    const send = document.querySelector('#send')
    const audioPlayer = document.querySelector('#audioPlayer')
    
    send.addEventListener('click', async () => {
        try{
            const response = await uploadAudio()
            const audioBlob = await response.blob()
            const audioURL = URL.createObjectURL(audioBlob)
        
            audioPlayer.src = audioURL
            audioPlayer.play()
        }catch(error){
            console.error(error)
        }
    })
})
