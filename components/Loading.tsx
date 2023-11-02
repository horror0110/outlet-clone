"use client";
import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";

const Loading = () => {
  const { spinner }: any = useContext(GlobalContext);
  return (
    spinner && (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-200 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-600"></div>
      </div>
    )
  );
};

export default Loading;
