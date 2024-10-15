import Image from "next/image";
import React, { useEffect, useRef } from "react";

export interface ChatType {
  name: string;
  res: string;
}

interface ChatProps {
  chat: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);
  return (
    <div className=" bg-[#080c1185] h-[78%] md:h-[85%] scroll-container w-full  justify-between overflow-y-auto overflow-x-hidden rounded-[1.5rem]  md:rounded-2xl  md:px-8 px-1 py-5  md:w-3/4     ">
      {chat.map((item, index) =>
        item.name === "ai" ? (
          <div
            key={index}
            className="flex items-center   gap-4  md:w-3/4  mt-4 mb-4 "
          >
            <Image
              src={
                "/ai2.jpg"
              }
              alt="no image render"
              className="md:w-8 md:h-8 h-6  w-6 object-cover rounded-full "
              width={20}
              height={20}
            />
            <p className="md:text-1xl  font-normal">{item.res}</p>
          </div>
        ) : (
          <div
            key={index}
            className=" md:w-[70vw]   mb-4 flex  items-center justify-end gap-4"
          >
            <p className="md:text-1xl font-normal">{item.res}</p>
            <Image
              src={"/profile.png"}
              alt="no image render"
              className="md:w-8 md:h-8 h-6  w-6  object-cover rounded-full "
              width={20}
              height={20}
            />
          </div>
        )
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
