"use client"

import React, { useEffect, useReducer, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { initialStateRecording, recordingReducer } from './reducer';
import AudioRecorder from '../../components/AudioRecorder';
import AudioPlayer from '../../components/AudioPlayer';

const Interview = () => {
  const [messages, setMessages] = useState({});
  const [state, dispatch] = useReducer(recordingReducer, initialStateRecording);
  const {
    recording,
    playerAudio,
  } = state;

  const onFinishRecording = ({ id, audio }) => {
    setMessages({ id, audio });
  };

  const onStartUserRecording = () => {
    dispatch({ type: 'USER-START-RECORDING' });
  };
  const onStartPlayAudio = () => {
    dispatch({ type: 'PLAY-AUDIO' });
  };

  const onStopAudio = () => {
    dispatch({ type: 'STOP-RECORDING-PLAY' });
  };

  return (
    <div className='interview-wrap'>
      <Player
        src={playerAudio ? './soundazulclaro.json' : './soundgris.json'}
        style={{ height: '30vh',  maxWidth: '300px', width:'80vw' }}
        autoplay={playerAudio}
        loop={playerAudio}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>

      {messages && <AudioPlayer audio={messages.audio} onStartPlayAudio={onStartPlayAudio} onStopAudio={onStopAudio} />}

      <AudioRecorder
        onFinish={onFinishRecording}
        onStartUserRecording={onStartUserRecording}
        onStopUserRecording={onStopAudio}
        isRecording={recording}
      />

      <Player
        src={recording ? './soundazuloscuro.json' : './soundgris.json'}
        style={{ height: '30vh', maxWidth: '300px', width:'80vw'}}
        autoplay={recording}
        loop={recording}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
    </div>
  );
};

export default Interview;





