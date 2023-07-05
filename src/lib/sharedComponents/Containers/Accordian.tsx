"use client";
import { CSSProperties, useRef, useState, useEffect } from "react";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";

const animatingStates = ["initializing", "initialized", "open", "closed"] as const;
type AnimationState = (typeof animatingStates)[number];

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Accordian({ title, children }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setAnimationState("initialized");
  }, [panelRef]);
  const [animationState, setAnimationState] = useState<AnimationState>("initializing");
  const handleClick = () => {
    if (animationState === "closed") {
      setAnimationState("open");
    } else if (animationState === "open" || animationState === "initialized") {
      setAnimationState("closed");
    }
  };
  const generateStyle = (state: AnimationState): CSSProperties => {
    switch (state) {
      case "initializing": {
        return {
          overflow: "hidden",
          transition: "none",
          maxHeight: "0",
        };
      }
      case "initialized": {
        return {
          overflow: "hidden",
          transition: "none",
          maxHeight: `${panelRef.current ? panelRef.current.scrollHeight + "px" : 0}`,
        };
      }
      case "open": {
        return {
          overflow: "hidden",
          transition: "max-height 0.25s ease-out",
          maxHeight: `${panelRef.current ? panelRef.current.scrollHeight + "px" : 0}`,
        };
      }
      case "closed": {
        return {
          overflow: "hidden",
          transition: "max-height 0.25s ease-out",
          maxHeight: 0,
        };
      }
    }
  };
  return (
    <section className="w-full h-fit group/accordian">
      {/* Controls */}
      <button
        className="flex flex-row justify-between w-full p-4 group-even/accordian:bg-slate-950 group-odd/accordian:bg-slate-950/50"
        onClick={handleClick}
      >
        <span className="block font-bold text-2xl">{title}</span>
        {animationState === "closed" ? <PlusIcon /> : <MinusIcon />}
      </button>
      {/* Display */}
      <div style={generateStyle(animationState)} ref={panelRef} className="">
        {children}
      </div>
    </section>
  );
}
