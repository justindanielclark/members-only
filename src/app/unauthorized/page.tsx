"use client";

import { useEffect, useRef, useState } from "react";
import MainContainer from "@/lib/sharedComponents/MainContainer";

export default function Unauthorized() {
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timeLeft, setTimeleft] = useState(5);
  useEffect(() => {
    timerID.current = setTimeout(() => {
      if (timeLeft === 1) {
        window.location.assign("/");
      } else {
        setTimeleft((x) => x - 1);
      }
    }, 1000);
    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current);
      }
    };
  });
  return (
    <MainContainer className="relative h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1>To access a URL like this, you would need to be logged in</h1>
        <p>You are being redirected to the homepage in {timeLeft} seconds...</p>
      </div>
    </MainContainer>
  );
}
