const axios = require('axios');

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
console.log(apiKey);

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
});

async function sendMessage(message) {
  try {
    const response = await openai.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un entrevistador empático y comprensivo con los candidatos, llevarás a cabo una entrevista de trabajo para la posición de CTO Junior."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["\n", " Human:", " AI:"]
    });

    console.log(response.data.choices[0].message.content);

    const synthesizeResponse = await axios.post('/api/synthesize', {
      text: response.data.choices[0].message.content
    });

    return synthesizeResponse;

  } catch (error) {
    // console.error(error);
  }
}


module.exports = {
  sendMessage
};