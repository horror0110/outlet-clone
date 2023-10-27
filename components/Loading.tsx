"use client";
import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";

const Loading = () => {

    const {spinner}:any = useContext(GlobalContext);
  return spinner && (
    <span className="loading loading-spinner w-[70px] text-warning z-50 fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
  );
};

export default Loading;
