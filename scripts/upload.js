const Languages = {
    'Select a Language': 'English',
    'English': 'English',
    'Portuguese': 'Portuguese',
    'Spanish': 'Spanish',
    'French': 'French',
    'German': 'German',
    'Chinese': 'Chinese'
}

const Models = {
    'Select an AI Model': 'gpt-3.5-turbo',
    'gpt-3.5-turbo': 'gpt-3.5-turbo'
}

const Voices = {
    'Select a Voice': 'alloy',
    'alloy': 'alloy',
    'echo': 'echo',
    'fable': 'fable',
    'onyx': 'onyx',
    'nova': 'nova',
    'shimmer': 'shimmer',
}

export const uploadAudio = async (props) => {
    try{
        const {language, model, temperature, voice} = props

        const audioPlayer = document.querySelector('#audioPlayer')
        
        const audioURL = audioPlayer.src
        const responseAudio = await fetch(audioURL)
        const audioBlob = await responseAudio.blob()

        const formData = new FormData()

        formData.append('audio', audioBlob, 'audio.wav')

        formData.append('language', Languages[language])
        formData.append('model', Models[model])
        formData.append('temperature', temperature)
        formData.append('voice', Voices[voice])

        const response = await fetch('http://192.168.15.147:5000/upload', {
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

