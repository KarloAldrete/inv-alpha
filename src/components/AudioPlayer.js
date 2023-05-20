import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ audio, onStartPlayAudio, onStopAudio }) => {
  const ref = useRef(null);
  const refButton = useRef(null);
  const [activeAudio, setActiveAudio] = useState(false);

  const handleAudio = () => {
    if(audio){const audioRef = ref.current;
    audioRef.src = audio;
    audioRef.addEventListener('ended', handleAudioEnded);
    if (!activeAudio) {
      setActiveAudio(true);
      onStartPlayAudio();
      audioRef.play();
      console.log(audioRef);
    } else {
      setActiveAudio(false);
      audioRef.pause();
      onStopAudio();
    }}
  };

  useEffect(() => {
    setActiveAudio(false);
    onStartPlayAudio();
    const audioRef = ref.current;
    audioRef.src = audio;
    audioRef.play();
    refButton.current.click();

    return () => {
      audioRef.removeEventListener('ended', handleAudioEnded);
   
    };
  }, [audio]);

  const handleAudioEnded = () => {
    onStopAudio();
    setActiveAudio(false);
  };
  return (
    <button
      ref={refButton}
      onClick={handleAudio}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
       {
       !activeAudio ?
       <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
        </svg>

        }
        {!activeAudio ? "Escuchar" : "Pausar. . ."}
        <audio ref={ref} autoPlay={true} controls={false} />
      </span>
    </button>
  );
};

export default AudioPlayer;
