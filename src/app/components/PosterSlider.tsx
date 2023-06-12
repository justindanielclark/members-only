"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  posters: Array<Poster>;
  reversed?: boolean;
};
const ANIMATION_DELAY_MS = 2750;
const ANIMATION_DELAY_VARIATION = 400;
const NUM_IMAGES = 8;
const PREFERRED_POSTER_SIZE = {
  width: 185,
  height: 278,
};

function PosterSlider({ posters, reversed }: Props) {
  const [statePosters, setStatePosters] = useState<Array<Poster>>([...posters]);
  const [animating, setAnimating] = useState<boolean>(false);
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!animating && timerID.current === null) {
      timerID.current = setTimeout(() => {
        timerID.current = null;
        setAnimating(true);
      }, ANIMATION_DELAY_MS + Math.random() * ANIMATION_DELAY_VARIATION - ANIMATION_DELAY_VARIATION / 2);
    }
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, [animating]);
  const postersToRender: Array<Poster> = statePosters.slice(0, NUM_IMAGES);

  const sliderContainerClasses = ["flex", "gap-2"];
  if (reversed) {
    sliderContainerClasses.push("flex-row-reverse");
    if (animating) {
      sliderContainerClasses.push("animate-slideRight");
    }
  } else {
    sliderContainerClasses.push("flex-row, justify-start");
    if (animating) {
      sliderContainerClasses.push("animate-slideLeft");
    }
  }

  return (
    <div className="overflow-hidden w-full max-w-full relative h-[278px]">
      <div
        className={sliderContainerClasses.join(" ")}
        style={{ animationFillMode: "forwards" }}
        onAnimationEnd={() => {
          setAnimating(false);
          setStatePosters((x) => [...x.slice(1), x[0]]);
        }}
      >
        {postersToRender.map((poster) => (
          <Image
            key={poster.id + "_" + poster.title}
            src={`https://image.tmdb.org/t/p/w185/${poster.poster_path}`}
            alt={poster.title}
            crossOrigin=""
            width={PREFERRED_POSTER_SIZE.width}
            height={PREFERRED_POSTER_SIZE.height}
            className="rounded-lg"
            priority={true}
          />
        ))}
      </div>
    </div>
  );
}

export default PosterSlider;
