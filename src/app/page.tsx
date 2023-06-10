import React from "react";
import Jombotron from "./(components)/Jombotron";

export default function page() {
  return (
    <div className="h-screen w-full relative">
      <video
        className="top-0 h-screen w-full absolute object-fill"
        muted
        loop
        autoPlay
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
      </video>
      <div className="top-0 absolute h-screen w-full bg-black opacity-70"></div>
      <Jombotron />
    </div>
  );
}
