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

let conversation = [
  {
    role: "system",
    content: "Eres un entrevistador empático y comprensivo con los candidatos, llevarás a cabo una entrevista de trabajo para la posición de CTO Junior."
  }
];

async function sendMessage(message) {
  try {
    conversation.push({
      role: "user",
      content: message
    });

    const response = await openai.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: conversation,
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["\n", " Human:", " AI:"]
    });

    const aiReply = response.data.choices[0].message.content;
    console.log(aiReply);

    conversation.push({
      role: "system",
      content: aiReply
    });

    const synthesizeResponse = await axios.post('/api/synthesize', {
      text: aiReply
    });

    // muestrame la conversacion y aparte los tokens utilizados por toda la conversacion
    console.log(conversation + "\n" + response.data.choices[0].tokens);

    return synthesizeResponse;

  } catch (error) {
    // console.error(error);
  }
}

module.exports = {
  sendMessage
};