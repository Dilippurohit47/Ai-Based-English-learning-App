"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";

import "../../app/globals.css";
import Chat from "@/components/my-components/Chat";
import ChatInput from "@/components/my-components/ChatInput";
import { getUser } from "../../../utils/supabse/apis/userApis";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export interface ChatType {
  name: string;
  res: string;
}
const Page = () => {
  const [input, setInput] = useState<string | undefined>("");
  const [prompt, setPrompt] = useState<string | undefined>("");
  const [chat, setChat] = useState<ChatType[]>([]);

  const [speech, setSpeech] = useState<string | undefined>("");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const addMessage = (name: string, response: string) => {
    setChat((prev) => [...prev, { name, res: response }]);
  };

  const { user } = useUser();
  const [userPlan, setUserPlan] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const data = await getUser(user?.id);
        if (data) {
          setUserPlan(data[0].plan);
        }
      }
    };
    fetchUser();
  }, [input]);

  useEffect(() => {
    const fetchData = async () => {
      if (userPlan && userPlan > 0) {
        try {
          if (prompt) {
            const result = await model.generateContent(
              `avoid emojis, As an English tutor, your role is to assist people in learning and practicing English. Focus on correct grammar not on pronounciation,  and real-world conversations. Do not discuss unrelated topics. Please correct any errors in their sentences you have to play role of english tutor and respond  you also have to talk and as conversation questions ,First you have to questions and in user response ask next question, correct only if they are wrong in grammat and  respond only in one or two line please donst ask unnecessary things . User's input: ${prompt}  and if sentence is wrong tell user to speak again that sentence avoid emojis please and give tips to improve sentences and make wrong sentences right not ask to make it right you should make it right  ` ||
                "hello"
            );
            setSpeech(result.response.text());
            addMessage("ai", result.response.text());
          }
        } catch (error) {
          console.error("Error generating content:", error);
        }
      } else {
        if (userPlan) {
          toast.error("I think your plan is over");
        }
      }
    };

    fetchData();
    return () => {};
  }, [prompt]);

  return (
    <div className="  bg-[#080D27] md:pb-8 max-md:px-2  h-[92vh] md:h-[93vh] mt-14 md:pt-20 flex text-white flex-col gap-5 items-center ">
      <Chat chat={chat} />
      <ChatInput
        input={input!}
        setInput={setInput}
        addMessage={addMessage}
        setPrompt={setPrompt}
        text={speech!}
        setSpeech={setSpeech}
      />
    </div>
  );
};

export default Page;
