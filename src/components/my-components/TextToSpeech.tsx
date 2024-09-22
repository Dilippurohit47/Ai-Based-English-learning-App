import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaVolumeHigh } from "react-icons/fa6";

interface TextToSpeechProps {
  text: string;
  setSpeech: Dispatch<SetStateAction<string | undefined>>;
  setStartSpeaking: Dispatch<SetStateAction<boolean>>
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  setStartSpeaking,
  setSpeech
}) => {
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
        onClick={() => {
          handleStop(); 
          setStartSpeaking(false); 
          setSpeech("")
        }}
        className="flex gap-2 items-center "
        variant="secondary"
>
        Stop  <p className="translate-y-[2px]"><FaVolumeHigh/></p>
      </Button>
    </div>
  );
};

export default TextToSpeech;
