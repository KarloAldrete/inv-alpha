"use client"

import React, {  useReducer, useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { initialStateRecording, recordingReducer } from './reducer'
import AudioRecorder from '../components/AudioRecorder';
import AudioPlayer from '../components/AudioPlayer';


const Interview = () => {
  const [messages, setMessages] = useState([]);
  const [state, dispatch] = useReducer(recordingReducer, initialStateRecording);
  const {   userRecording,
          userSoundActive,
          IASoundActive,
          iaPlayerAudio,
          userPlayerAudio, } = state

  const onFinish = ({ id, audio }) => {
    setMessages((prevMessages) => [...prevMessages, { id, audio }]);
  };

  const onStartUserRecording = () =>{
    dispatch({type:"USER-START-RECORDING"});
  }
  const onStopUserRecording = () =>{
    dispatch({type:"USER-STOP-RECORDING"});
  }


  return (
    <div className='interview-wrap'>
      
      <Player
        src={iaPlayerAudio ? './soundazulclaro.json' : './soundgris.json'}
        style={{ height: '300px', width: '300px' }}
        autoplay = {iaPlayerAudio}
        loop={iaPlayerAudio}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
  
      <button  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
          Escuchar
        </span>
      </button>
      {messages &&
            messages.map(({ id, audio }) => (
              <AudioPlayer key={id} audio={audio} />
            ))}
     
      <AudioRecorder {...{onFinish, onStartUserRecording, onStopUserRecording}} isRecording={userRecording} />
   
      <Player
        src={userRecording ? './soundazuloscuro.json' : './soundgris.json'}
        style={{ height: '300px', width: '300px' }}
        autoplay = {userRecording}
        loop={userRecording}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>

    </div>
  )
}

export default Interview



