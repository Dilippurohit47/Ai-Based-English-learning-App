import React, { useEffect, useRef } from "react";
export interface ChatType {
  name: string;
  res: string;
}

interface ChatProps {
  chat: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]); 

  return (
    <div className="bg-[#080c1185] h-[85%] scroll-container overflow-y-auto overflow-x-hidden  rounded-2xl mt-5 px-8 py-5  w-3/4     ">
      {chat.map((item, index) =>
        item.name === "ai" ? (
          <div className="flex items-center gap-4  mt-2 mb-2 ">
            <img
              src={
                "https://cdn.vectorstock.com/i/1000v/33/66/artificial-intelligence-icon-sign-logo-vector-49693366.avif"
              }
              alt="no image render"
              className="w-8 h-8 object-cover rounded-full "
            />
            <p className="text-1xl  font-normal">{item.res}</p>
          </div>
        ) : (
          <div className=" w-[70vw]  mb-2 mt-2 flex justify-end gap-4">
            <p className="text-1xl font-normal">{item.res}</p>
            <img
              src={
                "https://cdn.vectorstock.com/i/1000v/33/66/artificial-intelligence-icon-sign-logo-vector-49693366.avif"
              }
              alt="no image render"
              className="w-8 h-8 object-cover rounded-full "
            />
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
