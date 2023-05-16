import React, { useEffect, useState } from "react";


const AudioRecorder = ({ onFinish }) => {

 const [stream, setStream] = useState(null);
 const [content, setContent] = useState(null);
 const [isRecording, setIsRecording] =  useState(false);
 const [voiceRecorder, setVoiceRecorder] = useState(null);

  const onAudioClick = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(audioStream);

      setStream(audioStream);
      setVoiceRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (e) {
      console.log("User didn't allowed us to access the microphone.");
    }
  };

  const onStopRecording = () => {
    if (!isRecording || !stream || !voiceRecorder) return;

    const tracks = stream.getAudioTracks();

    for (const track of tracks) {
      track.stop();
    }

    voiceRecorder.stop();

    setVoiceRecorder(null);
    setIsRecording(false);
  };

  /**
   * This hook is triggered when we start the recording
   */
  useEffect(() => {
    if (!isRecording || !voiceRecorder) return;

    voiceRecorder.start();

    voiceRecorder.ondataavailable = ({ data }) => setContent(data);
  }, [isRecording, voiceRecorder]);

  /**
   * This hook will call our callback after finishing the record
   */
 useEffect(() => {
    if (isRecording || !content || !stream) return;
    onFinish({ id: stream.id, audio: content });
    setStream(null);
    setContent(null);
  }, [isRecording, content]);

  return (
    <button
      onClick={!isRecording ? onAudioClick : onStopRecording}
      className="bg-blue-200 rounded-lg p-2 border hover:border-blue-300"
    >
      {!isRecording ? "Audio" : "Stop recording"}
    </button>
  );
};

export default AudioRecorder;