"use client";
import { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import addMovieReview from "@/lib/api/addMovieReview";
import { MovieReview } from "../../../../../../types/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { invalidCharsString } from "@/lib/utils/invalidChars";
type Props = {
  userID: string;
  movie: MovieDetails;
};
type OptionValue = {
  value: string;
  text: string;
};
const optionValues: Array<OptionValue> = [
  { value: "0", text: "☆☆☆☆☆" },
  { value: ".5", text: "✬☆☆☆☆" },
  { value: "1", text: "★☆☆☆☆" },
  { value: "1.5", text: "★✬☆☆☆" },
  { value: "2", text: "★★☆☆☆" },
  { value: "2.5", text: "★★✬☆☆" },
  { value: "3", text: "★★★☆☆" },
  { value: "3.5", text: "★★★✬☆" },
  { value: "4", text: "★★★★☆" },
  { value: "4.5", text: "★★★★✬" },
  { value: "5", text: "★★★★★" },
];

export default function ReviewForm({ userID, movie }: Props) {
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewScore, setReviewScore] = useState<string>("2.5");
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisplayingWarning, setIsDisplayingWarning] = useState<boolean>(false);
  const router = useRouter();

  const isSubmittable = (reviewTitle: string, reviewContent: string): boolean => {
    return reviewTitle.length >= 5 && reviewContent.length >= 5;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittable(reviewTitle, reviewContent)) {
      const review: MovieReview = {
        content: reviewContent,
        date: new Date(),
        movie: movie.id,
        score: parseFloat(reviewScore),
        title: reviewTitle,
        user: userID,
      };
      setIsSubmitting(true);
      const promise = addMovieReview(review)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unable to Complete Add Movie Review");
          }
          return;
        })
        .then(() => {
          window.location.href = `/movie/${movie.id}`;
        })
        .catch((err) => {
          setIsSubmitting(false);
        });
      toast.promise(promise, {
        pending: "Adding Review to Database...",
        success: "Review Added",
        error: "There Was An Error With Adding the Review",
      });
    }
  };
  return (
    <div className="mx-auto max-w-lg">
      <Link href={`/movie/${movie.id}`}>Go Back</Link>
      <form
        action={`/api/moviereview/${movie.id}`}
        method="POST"
        className="flex flex-col items-end gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col pb-1 px-2 gap-1">
          <label htmlFor="movie_title" className="text-2xl font-bold">
            Review Title:
          </label>
          <input
            name="movie_title"
            id="movie_title"
            type="text"
            className="bg-slate-700 px-1 py-0.5"
            placeholder={`${movie.title}: A Review`}
            value={reviewTitle}
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex flex-col pb-1 px-2">
          <label htmlFor="movie_score" className="text-2xl font-bold">
            Score:
          </label>
          <select
            onChange={(e) => {
              setReviewScore(e.target.value);
            }}
            name="movie_score"
            id="movie_score"
            className="bg-slate-700 px-1 py-1 text-yellow-500 flex"
            defaultValue={"2.5"}
            value={reviewScore}
          >
            {optionValues.map((entry) => (
              <option value={entry.value} key={entry.value}>
                {entry.text}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col pb-1 px-2">
          <label htmlFor="movie_content" className="text-2xl font-bold">
            Content:
          </label>
          <textarea
            name="movie_content"
            id="movie_content"
            rows={6}
            className="bg-slate-700 px-1 py-0.5"
            placeholder="A brief description of what you did and didn't like about the movie"
            value={reviewContent}
            onChange={(e) => {
              setReviewContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="text-xs w-full p-2">
          <p className="font-bold underline underline-offset-2">A valid review submission has:</p>
          <ul className="list-disc pl-4">
            <li>A title that is at least 5 valid characters</li>
            <li>Content comprised of at least 20 valid characters</li>
          </ul>
          <p>Invalid Chars are the following: {invalidCharsString.split("").join(" ")}</p>
        </div>

        <button className="bg-green-800 px-2 py-1 text-center rounded-lg">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
