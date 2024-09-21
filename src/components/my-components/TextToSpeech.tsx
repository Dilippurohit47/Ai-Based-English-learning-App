import React, { useState, useEffect } from "react";
import { IoVolumeMute } from "react-icons/io5";
import { Button } from "../ui/button";
import { IoVolumeHighSharp } from "react-icons/io5";
interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    synth.cancel();

    setUtterance(u);

    u.onend = () => {
      setIsPaused(false);
    };

    synth.speak(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  };

  const handleResume = () => {
    const synth = window.speechSynthesis;
    synth.resume();
    setIsPaused(false);
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={isPaused ? handleResume : handlePause}
        className="hover:ring-1 ring-red-400"
      >
        {isPaused ? <IoVolumeMute /> : <IoVolumeHighSharp />}
      </Button>
      <Button onClick={handleStop} className="" variant="secondary">
        Stop
      </Button>
    </div>
  );
};

export default TextToSpeech;
