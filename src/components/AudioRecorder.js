'use client'
import { useState } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onData = recordedData => {
    console.log('Datos grabados:', recordedData);
  };

  const onStop = async recordedData => {
    const audioBlob = recordedData.blob;

    console.log('Audio Blob:', audioBlob);
    
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: audioBlob,
      });
  
      const data = await response.body;
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error in transcription:', error);
    }
  };

  return (
    <div>
      <ReactMic
        record={recording}
        onStop={onStop}
        onData={onData}
        mimeType="audio/wav"
        strokeColor="#000000"
        backgroundColor="#ffffff"
      />
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
};

export default AudioRecorder;
