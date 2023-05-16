// Importar la librería axios
const axios = require('axios');

// Definir la clave de API de OpenAI
const openaiApiKey = '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';

// Configurar la instancia de axios
const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${openaiApiKey}`,
    'Content-Type': 'application/json'
  },
});

// Función para enviar mensajes a la API de Chat GPT
async function sendMessage(message) {
  try {
    const response = await openai.post('/engines/davinci/completions', {
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${message}\nAI:`,
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ['\n', " Human:", " AI:"]
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
  }
}

// Exportar la función sendMessage
module.exports = {
  sendMessage
};
