import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Audio received');
    
    // Create an array to store the audio data chunks
    const audioData = [];

    // Create a readable stream to read the audio data chunk by chunk
    const readableStream = req;
    readableStream.on('data', chunk => {
      audioData.push(chunk);
    });

    console.log('Audio data:', audioData);

    // When the stream has ended, send the audio data to the Speech API
    readableStream.on('end', async () => {
      console.log('Audio stream ended');

      const audio = Buffer.concat(audioData);

      console.log('Audio buffer:', audio);

      const speechClient = new SpeechClient({
        keyFilename: 'lib/invenire-apis-google.json',
      });

      try {
        const [response] = await speechClient.recognize({
          config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
          audio: { content: audio },
        });

        console.log('Recognition response:', response);

        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');

        console.log('Transcription generated:', transcription);

        res.status(200).json({ transcription });
      } catch (error) {
        console.error('Error in transcription:', error);
        res.status(500).send('Error in transcription');
      }
    });
  } else {
    res.status(400).send('Unrecognized request method');
  }
}