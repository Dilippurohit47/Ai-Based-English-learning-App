import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";

interface ChatInputProps {
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  input: string | undefined;
  addMessage: (name: string, response: string) => void;
  setPrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
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

    recognition.current.onresult = (event: any) => {
      const newTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(newTranscript);
      setInput((prev) => (prev ? `${prev} ${newTranscript}` : newTranscript));

      recognition.current.onend = () => {
        console.log("Speech recognition ended.");
        setListening(false);
      };

  

      if (silenceTimeout.current) {
        clearTimeout(silenceTimeout.current);
      }
      silenceTimeout.current = setTimeout(() => {
        stopListening();
      }, 1000); 
    };

    recognition.current.onerror = (event: any) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    return () => {
      recognition.current.stop();
    };
  }, [input, addMessage, setInput, setPrompt]);

  useEffect(() =>{
    console.log("2nd usefef")
    if (input) {
      addMessage("user", input!);
      setInput("");
      setPrompt(transcript);
      setTranscript("");
    }
  },[transcript])

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
    <div>
      <button onClick={startListening} disabled={listening}>
        <FaMicrophone className={` ${listening ? "text-blue-600" : ""} `} />
      </button>
    </div>
  );
};

export default NativeSpeechRecognitionTest;
