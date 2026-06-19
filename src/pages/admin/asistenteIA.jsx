import {useState} from 'react'
import {GoogleGenAI} from '@google/genai'
import {RespuestaIA} from './respuestaIA';

export function Dashboard(){
    const [message, setMessage] = useState("");
    const [responseIA, setResponseIA] = useState("");
      const genAi = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GENAI_API_KEY
    });

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
        const response = await genAi.models.generateContent({
            model:'gemini-3.5-flash',
            contentType:'text',
            contents: message
        });
        
        console.log(response.text);
        setResponseIA(response.text);
    } catch (error) {
            console.error("Error:", error);
            setResponseIA("Error al obtener la respuesta.");
        }
    }
    return(
        <div>
            <h1>Prompt</h1>
            <form>
                <label>Escribe tu mensaje:</label>
                <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                <button type="submit" onClick={handleSubmit}>Enviar</button>
            </form>
            <RespuestaIA respuesta={responseIA} />
        </div>
    )
}