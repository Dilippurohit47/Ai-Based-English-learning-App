"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";

import "../../app/globals.css";
import Chat from "@/components/my-components/Chat";
import ChatInput from "@/components/my-components/ChatInput";
import { deductCredits, getUser } from "../actions/prismaActions";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export interface ChatType {
  name: string;
  res: string;
}

type role  = "ai" | "user"

interface conversationHistoryType {
  role:role,
  content:string

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
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const getCredits = async () => {
      if (user) {
        const data = await getUser(user.id);
        console.log("credits", data);
        if (data) {
          if (data?.data?.credits) setCredits(data?.data?.credits);
        }
      }
    };
    getCredits();
  }, [user]);

  const [conversationHistory, setConversationHistory] = useState<conversationHistoryType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (credits && credits > 0) {
        try {
          if (prompt) {
            // Add the user's input to the conversation history
            const updatedHistory:conversationHistoryType[] = [
              ...conversationHistory,
              { role: "user", content: prompt },
            ];

            // Generate the AI's response with the full conversation history
            const result = await model.generateContent(`
              Avoid emojis. As an English tutor, your role is to assist people in learning and practicing English. 
              Focus on correct grammar and real-world conversations. Do not discuss unrelated topics.    
              Please correct any errors in their sentences. You have to play the role of an English tutor and respond. 
              You also have to ask conversation questions. First, ask questions, and in the user's response, ask the next question. 
              Correct only if they are wrong in grammar and respond only in one or two lines. Please don't ask unnecessary things. 
              Conversation history: ${JSON.stringify(updatedHistory)}
              User's input: ${prompt}
              If the sentence is wrong, tell the user to speak the sentence again. Avoid emojis, please. 
              Give tips to improve sentences and make wrong sentences right. Do not ask the user to make it right; you should make it right.
              And please explain what is wrong in  sentence and teach them about past,present,grammar,etc
            `);

            // Add the AI's response to the conversation history
            console.log("updated historty",updatedHistory)
              const aiResponse = result.response.text();
              setConversationHistory([ 
                ...updatedHistory,
                { role: "ai", content: aiResponse },
              ]);

            // Update speech and messages
            setSpeech(aiResponse);
            addMessage("ai", aiResponse);

            // Deduct credits
            if (user && result) {
              await deductCredits(user?.id);
              setCredits((prev) => prev - 1);
            }
          }
        } catch (error) {
          console.error("Error generating content:", error);
        }
      } else {
        if (credits && credits < 1) {
          toast.error("Credits over");
        }
      }
    };

    fetchData();
  }, [prompt]);

  useEffect(() => {
    const fetchData = async () => {
      if (credits && credits > 0) {
        try {
          if (prompt) {
            // Add the user's input to the conversation history
            const updatedHistory = [
              ...conversationHistory,
              { role: "user", content: prompt },
            ];

            // Generate the AI's response with the full conversation history
            const result =
              await model.generateContent(`Act as an English tutor. Analyze the conversation history below and focus on the AI's last message. Identify only genuinely complicated words,  grammar topics, or concepts that might be hard for a beginner to understand. Avoid explaining simple or common words like "chill" or "Netflix." For each identified topic or word, provide a short explanation (2-3 points maximum). Keep the explanations simple, clear, and concise. Do not add unnecessary details or examples.

Conversation history: ${JSON.stringify(updatedHistory)}

Instructions:
1. Pick the AI's last message from the history.
2. Identify only advanced or complicated words, grammar topics, or concepts in that message.
3. For each identified topic or word, provide a short explanation ( max 2-3 points).
4. Format the response as a list with clear headings for each topic or word.
5. If no complicated words or topics are found, respond with: "No complicated words or grammar topics found in the last message."
6. Only talk about communication not about writing 
`);

            // Add the AI's response to the conversation history
            const aiResponse = result.response.text();
            console.log(aiResponse);
            // setConversationHistory([
            //   ...updatedHistory,
            //   { role: "ai", content: aiResponse },
            // ]);

            // Update speech and messages
            // setSpeech(aiResponse);
            // addMessage("ai", aiResponse);
          }
        } catch (error) {
          console.error("Error generating content:", error);
        }
      } else {
        if (credits && credits < 1) {
          toast.error("Credits over");
        }
      }
    };

    fetchData();
  }, [prompt]);
  return (
    <div className="bg-[#080D27] md:pb-8 max-md:px-2  h-screen md:pt-28 flex text-white flex-col gap-5 items-center ">
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
