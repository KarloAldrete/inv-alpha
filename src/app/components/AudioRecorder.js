import React, { useEffect, useState } from "react";


const AudioRecorder = ({ onFinish, isRecording, onStartUserRecording, onStopUserRecording }) => {

 const [stream, setStream] = useState(null);
 const [content, setContent] = useState(null);
 const [voiceRecorder, setVoiceRecorder] = useState(null);

  const onAudioClick = async () => {
      try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            
            const mediaRecorder = new MediaRecorder(audioStream);
            
      setStream(audioStream);
      onStartUserRecording()
      setVoiceRecorder(mediaRecorder);
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
    onStopUserRecording()
    setVoiceRecorder(null);
    
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
    <button onClick={!isRecording ? onAudioClick : onStopRecording} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 ">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
   {  !isRecording 
      ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
      </svg> 
      :
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
      </svg>
    }
    {!isRecording ? "Grabar" : "Grabando. . ."}
    </span>
    </button>
  );
};

export default AudioRecorder;