"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  posters: Array<Poster>;
  reversed?: boolean;
};
const NUM_IMAGES = 5;
const PREFERRED_POSTER_SIZE = {
  width: 185,
  height: 278,
};

function generateImage(poster: Poster) {
  return (
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
  );
}

function PosterSlider({ posters, reversed }: Props) {
  const [statePosters, setStatePosters] = useState<Array<Poster>>([...posters]);
  const postersToRender: Array<JSX.Element> = [];
  for (let i = 0; i < NUM_IMAGES; i++) {
    postersToRender.push(generateImage(statePosters[i]));
  }

  return (
    <div className="overflow-hidden w-full max-w-full">
      <div
        className={`flex flex-nowrap gap-2 ${
          reversed ? "justify-end flex-row-reverse" : "justify-start flex-row animate-slideLeft"
        }`}
        onAnimationIteration={() => {
          setStatePosters((x) => [...x.slice(1), x[0]]);
        }}
      >
        {postersToRender}
      </div>
    </div>
  );
}

export default PosterSlider;
