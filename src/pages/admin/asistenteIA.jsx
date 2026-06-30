import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import { RespuestaIA } from './respuestaIA';

export function AsistenteIA() {
    const [message, setMessage] = useState("");
    const [responseIA, setResponseIA] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const response = await genAI.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: message
            });

            console.log(response.text);
            setResponseIA(response.text);
        } catch (error) {
            console.error("Error:", error);
            setResponseIA("Error al obtener la respuesta.");
        }
    }

    return (
        <div>
            <h1>Prompt</h1>
            <form onSubmit={handleSubmit}>
                <label>Escribe tu mensaje:</label>
                <textarea value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                <button type="submit">Enviar</button>
            </form>
            <RespuestaIA respuesta={responseIA} />
        </div>
    )
}
