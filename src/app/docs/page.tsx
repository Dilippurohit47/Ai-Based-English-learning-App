"use client";
import React, { useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import DocsSingleBox from "../../components/my-components/DocsSingleBox"
import { Documents } from "@/lib/constant";


const page = () => {

  return (
    <div className=" items-center  px-11 py-14 text-2xl same-bg mt-16 justify-center">
     <DocsSingleBox  Documents={Documents}/>
    </div>
  );
};

export default page;
