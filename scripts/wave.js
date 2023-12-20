async function startAudioCapture(){
    try{
        // Obter o contexto de áudio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // Obter o elemento canvas
        const canvas = document.getElementById('waveformCanvas')
        const canvasContext = canvas.getContext('2d')

        // Configurar a fonte de áudio
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            const microphone = audioContext.createMediaStreamSource(stream)

            // Criar um analisador de áudio
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256

            // Conectar o microfone ao analisador
            microphone.connect(analyser)

            // Inicializar a matriz de dados de forma de onda
            const dataArray = new Uint8Array(analyser.fftSize)

            // Função para desenhar a forma de onda
            function drawWaveform() {
                analyser.getByteTimeDomainData(dataArray)

                // Limpar o canvas
                canvasContext.clearRect(0, 0, canvas.width, canvas.height)

                // Desenhar a forma de onda
                canvasContext.lineWidth = 4
                canvasContext.strokeStyle = 'rgb(255, 255, 255)'
                canvasContext.beginPath()

                const sliceWidth = canvas.width / analyser.fftSize
                let x = 0

                for (let i = 0; i < dataArray.length; i++) {
                    const v = dataArray[i] / 128.0
                    const y = (v * canvas.height) / 2

                    if (i === 0) {
                        canvasContext.moveTo(x, y)
                    } else {
                        canvasContext.lineTo(x, y)
                    }

                    x += sliceWidth
                }

                canvasContext.lineTo(canvas.width, canvas.height / 2)
                canvasContext.stroke()

                // Chamada recursiva para animação
                requestAnimationFrame(drawWaveform)
            }

            // Iniciar a animação
            drawWaveform()
        })
    }
    catch(error) {
        console.error('Erro ao obter acesso ao microfone:', error)
    }
}

document.querySelector('.record button').addEventListener('click', startAudioCapture)