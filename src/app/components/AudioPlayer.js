import React, { useEffect, useRef } from "react";

const AudioPlayer = ({ audio }) => {
  const ref = useRef(null);

useEffect(() => {
    if (ref && ref.current && audio) {
      ref.current.src = window.URL.createObjectURL(audio);
    }
  }, [ref, audio]);

  return <audio ref={ref} autoPlay={false} controls={false} />;
};

export default AudioPlayer;