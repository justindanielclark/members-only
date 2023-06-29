"use client";
import Image from "next/image";
import { useState } from "react";
import LinkIcon from "./Icons/LinkIcon";
import Link from "next/link";

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
      <LinkIcon />
    </div>
  );
  return content;
}
