"use client"

export const initialStateRecording = {
    recording:false,
    playerAudio:false,
  }


export const recordingReducer = (state, action)=>{
    switch (action.type) {
      case "USER-START-RECORDING":
        return{
          ...state,
          recording:true,
          playerAudio:false,
        }

      case "STOP-RECORDING-PLAY":
          return{
            ...state,
            recording:false,
            playerAudio:false,

          }
      case "PLAY-AUDIO":
          return{
            ...state,
            recording:false,
            playerAudio:true,

          }
     
      case "RESTART":
        return initialStateRecording;
      default:
        //Lanzar un error
        return state;
    }
  }