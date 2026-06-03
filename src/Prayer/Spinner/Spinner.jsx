import React from "react";
import { Hearts } from 'react-loader-spinner'
export default function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#a54f3a]">
      <Hearts
        height="250"
        width="250"
        color="#321f3f"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
