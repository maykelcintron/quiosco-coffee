'use client'; // Esto es importante para usar hooks

import { FormEvent, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Componente de chat para interactuar con el modelo Gemini de Google.
 * Permite enviar mensajes y recibir respuestas generadas por IA.
 */

// Define el tipo para los mensajes
type Message = {
    text: string;
    sender: 'user' | 'bot';
};

const systemPrompt = `
Eres un asistente virtual especializado para Fresh Coffee, 
una aplicación que ofrece una experiencia única para los amantes del café, pizzas, hamburguesas, donas y galletas.
Tu tarea es ayudar a los usuarios a navegar por la aplicación, responder preguntas frecuentes y proporcionar asistencia técnica básica.
Eres amigable, profesional y siempre mantienes un tono positivo.
Tu objetivo es mejorar la experiencia del usuario y resolver sus dudas de manera eficiente.
Eres un experto en la aplicación Fresh Coffee y conoces todas sus características y funcionalidades.
Tu conocimiento se limita a la aplicación Fresh Coffee y no debes proporcionar información sobre otros temas o aplicaciones
Como contexto utiliza todo el codigo de la aplicación, incluyendo las funcionalidades de pedidos, menús, pagos y cualquier otra característica relevante.

Tus responsabilidades incluyen:
- Guiar a los usuarios sobre cómo usar las funciones principales
- Responder preguntas frecuentes sobre la aplicación
- Ayudar a resolver problemas técnicos comunes
- Proporcionar información sobre actualizaciones y nuevas características

Reglas:
- Mantén tus respuestas concisas y relevantes para la aplicación
- Si no sabes la respuesta, di "No estoy seguro, pero puedo ayudarte a contactar al equipo de soporte"
- Nunca proporciones información sobre otras aplicaciones o temas no relacionados
`;

// Añade historial de conversación como contexto

export default function GeminiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
    // Animación para el panel del chat

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    //setMessages(prev => [...prev, userMessage]);

    const buildPrompt = (userInput: string) => {
        return `
        ${systemPrompt}
        
        Historial de conversación:
        ${messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n')}
        
        Usuario: ${userInput}
        Asistente: 
        `;
    };

    
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
        const result = await model.generateContent(buildPrompt(input));
        const response = await result.response;
        const text = response.text();
        
        setMessages(prev => [...prev, { text, sender: 'bot' }]);
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        setMessages(prev => [...prev, { text: 'Error al obtener respuesta', sender: 'bot' }]);
    } finally {
        setIsLoading(false);
        setInput('');
    }
};

    return (
        <>
            {/* Botón flotante */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-yellow-300 shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl hover:scale-110 ${isOpen ? 'transform rotate-45 scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            aria-label="Abrir chat"
        >
            💬
        </button>

        {/* Panel del chat */}
        <div className={`fixed bottom-10 right-6 w-88 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Asistente Virtual</h3>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
            >
                ✕
            </button>
            </div>
            
            {/* Área de mensajes */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                <p>¡Hola! ¿En qué puedo ayudarte hoy?</p>
                </div>
            ) : (
                messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`mb-3 max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'ml-auto bg-indigo-600 text-white rounded-br-none' : 'mr-auto bg-gray-200 text-gray-800 rounded-bl-none'}`}
                >
                    {msg.text && (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                </div>
                ))
            )}
            {isLoading && (
                <div className="flex justify-start mb-3">
                <div className="bg-gray-200 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>
            
            {/* Formulario de entrada */}
            <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                />
                <button 
                type="submit" 
                className="bg-yellow-500 text-white p-2 rounded-r hover:bg-yellow-400 transition-colors disabled:opacity-50"
                disabled={isLoading}
                >
                →
                </button>
            </div>
            </form>
        </div>
        </>
    );
}