import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TextToSpeech from "./TextToSpeech";
interface ChatInputProps {
  input: string; 
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>; 
  addMessage: (name: string, response: string) => void; 
  setPrompt: React.Dispatch<React.SetStateAction<string | undefined>>; 
  text: string;
}
const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  addMessage,
  setPrompt,
  text,
}) => {
  return (
    <div className="flex w-3/4 items-center justify-center gap-3">
      <Input 
    
        value={input}
        placeholder="Start Your Learning Journey "
        className=" w-2/4 text-black"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        disabled={!input}
        variant={"destructive"}
        onClick={(e) => {
          addMessage("user", input!), setInput("");
          setPrompt(input);
        }}
      >
        Send
      </Button>
      <TextToSpeech text={text} />
    </div>
  );
};

export default ChatInput;
