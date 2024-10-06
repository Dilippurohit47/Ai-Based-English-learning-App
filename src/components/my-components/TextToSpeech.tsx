import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaVolumeHigh } from "react-icons/fa6";

interface TextToSpeechProps {
  text: string;
  setSpeech: Dispatch<SetStateAction<string | undefined>>;
  setStartSpeaking: Dispatch<SetStateAction<boolean>>;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  setStartSpeaking,
  setSpeech,
}) => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    synth.cancel();

    synth.speak(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  const handleResume = () => {
    const synth = window.speechSynthesis;
    synth.resume();
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          handleStop();
          setStartSpeaking(false);
          setSpeech("");
        }}
        className="flex gap-2 items-center "
        variant="secondary"
      >
        Stop{" "}
        <p className="translate-y-[2px]">
          <FaVolumeHigh />
        </p>
      </Button>
      <Button
        onClick={() => {
          setSpeech("");
        }}
        className="flex gap-2 items-center "
        variant="secondary"
      >
        Skip{" "}
        <p className="translate-y-[2px]">
          <FaVolumeHigh />
        </p>
      </Button>
    </div>
  );
};

export default TextToSpeech;
