const getFormattedTime = (passedTimeSeconds) => {
    const minutes = Math.floor(passedTimeSeconds / 60)
    const formattedMinutes = String(minutes).padStart(2, '0')

    const seconds = passedTimeSeconds % 60
    const formattedSeconds = String(seconds).padStart(2, '0')
    
    return `${formattedMinutes}:${formattedSeconds}`
}

const uploadAudio = async (audioChunks) => {
    try{
        const send = document.getElementById('send')
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const formData = new FormData()

        formData.append('audio', audioBlob, 'audio.wav')

        // Local Route: http://127.0.0.1:5000/upload
        // Remote Route: https://english-conversation-ai-api.vercel.app/upload

        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            body: formData
        })

        if(!response.ok){
            console.error('Erro na requisição:', response.statusText);
            return;
        }
        return response
    }catch(error){
        console.error(`Ocorreu um erro: ${String(error)}`)
    }
}