import React, { useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { Plus } from "lucide-react";
interface Document {
  title: string;
  desc: string;
}

interface DocsSingleBoxProps {
  Documents: Document[];
}

const DocsSingleBox: React.FC<DocsSingleBoxProps> = ({ Documents }) => {
  const [slide, setSlide] = useState<number | undefined>(undefined);

  return (
    <>
      {Documents.map((doc, index) => (
        <div
          key={index}
          className="border-[1px] m-5 max-md:min-h-40 rounded-lg flex flex-col gap-4 border-[#2600ff2f] w-4/5 md:px-6 px-3 py-4 md:py-10"
          onClick={() =>
            setSlide((prev) => (prev === index ? undefined : index))
          }
        >
          <div className="flex gap-4 justify-between  flex-col md:flex-row items-center">
            <div className="flex gap-4 ">
              <span className="text-p4   md:text-3xl ">{index + 1}.</span>
              <h1 className=" text-white leading-tight text-[1.2rem]  md:text-3xl ">
                {doc.title}
              </h1>
            </div>

            <div className=" border-[#8080802b] border-2 rounded-full p-1 transition-all ease-in-out duration-500 hover:border-[#51b9ff]  ">
              <div className="bg-[#203272] text-[#a3d345] cursor-pointer group  rounded-full px-2 py-2">
                <Plus />
              </div>
            </div>
          </div>
          <SlideDown>
            {slide === index && (
              <p className="text-[#C2C9F3] text-[1rem]  md:text-[18px] leading-normal ">
                {doc.desc}
              </p>
            )}
          </SlideDown>
        </div>
      ))}
    </>
  );
};

export default DocsSingleBox;
