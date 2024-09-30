"use client";
import "react-slidedown/lib/slidedown.css";

import { Documents } from "@/lib/constant";
import DocsSingleBox from "../../components/my-components/DocsSingleBox";

const page = () => {
  return (
    <div className=" flex flex-col items-center py-6  lg:px-11 lg:py-14 text-2xl same-bg mt-16 justify-center">
      <DocsSingleBox Documents={Documents} />
    </div>
  );
};

export default page;
