import {Record} from './record.js'

document.addEventListener('DOMContentLoaded', () => {
    const recorder = new Record()

    recorder.recordAudioControl.addEventListener('click', async (event) => {
        if (event.target === recorder.recordAudioControl){
            await recorder.toggleRecording()
        }
    })
})

// document.addEventListener('DOMContentLoaded', () => {

    

//     // sendElement.addEventListener('click', async() => {
//     //     try{
//     //         if(audioChunks != []){
//     //             const response = await uploadAudio(audioChunks)
//     //             const audioBlob = await response.blob()
//     //             const audioUrl = URL.createObjectURL(audioBlob)

//     //             audioPlayer.src = audioUrl
//     //             audioPlayer.play()
//     //         }
//     //     }catch(error){
//     //         console.error('Ocorreu um problema')
//     //     }
//     // })
// })