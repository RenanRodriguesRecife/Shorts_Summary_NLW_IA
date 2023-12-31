import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio){
    try{
        //return transcriptionExample
        console.log("Realizando a transcrição...")
        const transcribe = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-small"
        )

        const transcription = await transcribe(audio, {
            chunk_length_s: 30,
            stride_length_s: 5,
            language: "portuguese",
            task: "transcribe",
        })

        console.log("Transcrição finalizada com sucesso")
        return transcription?.text.replace("[Música]","") //a interrogação é para evitar retornar null
    }catch(error){
        console.log("Erro na transcrição",error)
        throw new Error(error)
    }
}