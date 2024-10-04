import React, { Dispatch, SetStateAction, useState } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import NativeSpeechRecognitionTest from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  addMessage: (name: string, response: string) => void;
  setPrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
  text: string;
  setSpeech: Dispatch<SetStateAction<string | undefined>>;
}
const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  addMessage,
  setPrompt,
  text,
  setSpeech,
}) => {
  const [startSpeaking, setStartSpeaking] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    addMessage("user", input!), setInput("");
    setPrompt(input);
  };

  return (
    <div className="flex max-md:flex-col gap-4 md:w-3/4 items-center justify-center ">
      <div className="flex items-center  md:w-2/4 justify-center gap-3">
        <Input
          value={input}
          placeholder="Start Your Learning Journey type or speak something.... "
          className=" w-full text-black text-1xl"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <NativeSpeechRecognitionTest
          setInput={setInput}
          addMessage={addMessage}
          input={input}
          setPrompt={setPrompt}
        />
      </div>

      <div className="flex max-md:w-full  items-center justify-center gap-6">
        <Button
          disabled={!input}
          variant={"destructive"}
          onClick={() => {
            handleSend();
          }}
          className="md:min-w-[5vw] w-full"
        >
          Send
        </Button>

        {startSpeaking ? (
          <TextToSpeech
            text={text}
            setSpeech={setSpeech}
            setStartSpeaking={setStartSpeaking}
          />
        ) : (
          <Button
            onClick={() => setStartSpeaking(true)}
            className="felx gap-2 items-center "
          >
            {" "}
            Start{" "}
            <p className="translate-y-[2px]">
              <FaVolumeHigh />
            </p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
