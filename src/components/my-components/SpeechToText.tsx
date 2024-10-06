import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface ChatInputProps {
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  input: string | undefined;
  addMessage: (name: string, response: string) => void;
  setPrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
}
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number; // Optionally add confidence level
  results: any;
}

const NativeSpeechRecognitionTest: React.FC<ChatInputProps> = ({
  setInput,
  input,
  addMessage,
  setPrompt,
}) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognition = useRef<any>(null);
  const silenceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Browser doesn't support Speech Recognition.");
      return;
    }

    recognition.current = new (window as any).webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = false;
    recognition.current.lang = "en-US";

    recognition.current.onstart = () => setListening(true);

    recognition.current.onresult = (event: SpeechRecognitionResult) => {
      const newTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscript(newTranscript);
      setInput((prev) => (prev ? `${prev} ${newTranscript}` : newTranscript));

      if (silenceTimeout.current) {
        clearTimeout(silenceTimeout.current);
      }

      silenceTimeout.current = setTimeout(() => {
        recognition.current.stop();
      }, 2000);
    };

    recognition.current.onerror = (event: any) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    recognition.current.onend = () => {
      console.log("Speech recognition ended.");
      setListening(false);
    };

    return () => {
      recognition.current.stop();
      if (silenceTimeout.current) {
        clearTimeout(silenceTimeout.current);
      }
    };
  }, [setInput]);

  useEffect(() => {
    if (input) {
      console.log("trans change");
      recognition.current.stop();

      addMessage("user", input);
      setInput("");
      setPrompt(input);
      setTranscript("");
    }
  }, [transcript]);

  const startListening = () => {
    recognition.current.start();
  };

  const stopListening = () => {
    recognition.current.stop();
    if (silenceTimeout.current) {
      clearTimeout(silenceTimeout.current);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={startListening} disabled={listening}>
        <FaMicrophone className={`${listening ? "text-blue-600" : ""}`} />
      </button>
      <button onClick={stopListening} disabled={!listening}>
        <FaMicrophoneSlash className={`${listening ? "text-red-600" : ""}`} />
      </button>
    </div>
  );
};

export default NativeSpeechRecognitionTest;
