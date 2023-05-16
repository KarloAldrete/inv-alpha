import textToSpeech from '@google-cloud/text-to-speech';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new textToSpeech.TextToSpeechClient({
      keyFilename: './invenire-apis-google.json',
    });
    const text = req.body;

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audio = response.audioContent.toString('base64');

    res.status(200).send({ audio });
  } else {
    res.status(400).send('Unrecognized request method');
  }
}
