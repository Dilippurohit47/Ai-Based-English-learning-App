import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";

import "../../app/globals.css";
import Chat from "@/components/my-components/Chat";
import ChatInput from "@/components/my-components/ChatInput";

export interface ChatType {
  name: string;
  res: string;
}
const Hero = () => {
  const [input, setInput] = useState<string | undefined>("");
  const [prompt, setPrompt] = useState<string | undefined>("");
  const [chat, setChat] = useState<ChatType[]>([
   
    
  ]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const addMessage = (name: string, response: string) => {
    setChat((prev) => [...prev, { name, res: response }]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await model.generateContent(prompt || "hello");
        console.log(result.response.text())
        addMessage("ai", result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    };

    fetchData();

    return () => {};
  }, [prompt]);

  return (
    <div className="bg-[#131D29]  pb-8  h-[90vh] flex text-white flex-col gap-5 items-center ">
      <Chat chat={chat} />
      <ChatInput
        input={input!}
        setInput={setInput}
        addMessage={addMessage}
        setPrompt={setPrompt}
      />
    </div>
  );
};

export default Hero;
