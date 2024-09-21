import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface ChatInputProps {
  input: string; // Assuming input is a string
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>; // Type for setInput function
  addMessage: (name: string, response: string) => void; // Function type for addMessage
  setPrompt: React.Dispatch<React.SetStateAction<string | undefined>>; // Type for setPrompt function
}
const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  addMessage,
  setPrompt,
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
        variant={"destructive"}
        onClick={(e) => {
          addMessage("user", input!), setInput("");
          setPrompt(input);
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
