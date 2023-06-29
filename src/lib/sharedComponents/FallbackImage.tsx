"use client";
import Image from "next/image";
import { useState } from "react";
import { BiUnlink } from "react-icons/bi";
import { IconContext } from "react-icons";

type Props = {
  src: string;
  alt: string;
  crossOrigin: string;
  width: number;
  height: number;
  priority: boolean;
  className?: string;
};

export default function ImageWithFallback({ src, alt, crossOrigin, width, height, priority, className }: Props) {
  const [isValid, setIsValid] = useState(true);
  const content = isValid ? (
    <Image
      src={src}
      alt={alt}
      crossOrigin=""
      width={width}
      height={height}
      className={className ? className : ""}
      onError={() => {
        setIsValid(false);
      }}
      priority={priority}
    />
  ) : (
    <div className={className + " flex flex-row items-center justify-center bg-slate-900/30"}>
      <IconContext.Provider value={{ color: "white", className: "h-6 w-6" }}>
        <BiUnlink />
      </IconContext.Provider>
    </div>
  );
  return content;
}
