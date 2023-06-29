"use client";
import Image from "next/image";
import { useState } from "react";
import manSVG from "../../../public/man.svg";
import womanSVG from "../../../public/woman.svg";

type Props = {
  profile_path: string;
  src: string;
  alt: string;
  crossOrigin: string;
  width: number;
  height: number;
  priority: boolean;
  className?: string;
  gender: 0 | 1 | 2;
};

export default function FallbackPersonImage({
  src,
  alt,
  profile_path,
  crossOrigin,
  width,
  height,
  priority,
  className,
  gender,
}: Props) {
  const [isValid, setIsValid] = useState(profile_path && profile_path !== "");
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
    <Image
      src={gender === 1 ? womanSVG : manSVG}
      alt={alt}
      crossOrigin=""
      width={width}
      height={height}
      className={className ? className : ""}
      priority={priority}
    />
  );
  return content;
}
