import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import { MovieReviewData, MovieReviewDatum } from "../../../../../../types/types";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import Link from "next/link";
type Props = {
  data: MovieReviewData;
};
export default function Reviews({ data }: Props) {
  if (data.length == 0) {
    return (
      <Accordian title={`Reviews (${data.length})`} openOnLoad={false}>
        <div className="max-w-sm w-sm mx-auto p-6">
          <p className="w-full text-center">Currently, no reviews.</p>
          <p className="w-full text-center">Be the first to add one 😊</p>
        </div>
      </Accordian>
    );
  }
  return (
    <Accordian title="Reviews" openOnLoad={false}>
      <ul className="p-4 grid lg:grid-cols-2 grid-cols-1 [&>*:nth-child(7n+1)]:bg-slate-950/10 [&>*:nth-child(7n+2)]:bg-slate-950/20 [&>*:nth-child(7n+3)]:bg-slate-950/30 [&>*:nth-child(7n+4)]:bg-slate-950/40 [&>*:nth-child(7n+5)]:bg-slate-950/30 [&>*:nth-child(7n+6)]:bg-slate-950/20 [&>*:nth-child(7n+7)]:bg-slate-950/10">
        {data.map((datum) => (
          <Review key={datum.review._id.toString()} datum={datum} />
        ))}
      </ul>
    </Accordian>
  );
}

type ReviewProps = {
  datum: MovieReviewDatum;
};
function Review({ datum }: ReviewProps) {
  return (
    <li className="flex flex-col p-4 rounded-lg">
      <Link
        href={`/profile/${datum.user._id.toString()}`}
        className="flex flex-row gap-4 border-b-white border-b-2 pb-1"
      >
        <ImageWithFallback
          src={datum.user.photoPath}
          width={40}
          height={40}
          alt={`${datum.user.handle} profile photo`}
          crossOrigin=""
          priority={true}
          className="rounded-lg h-10 max-h-10 w-10 max-w-10"
        />
        <div>
          <h2 className="text-xl font-bold">{datum.review.title}</h2>
          <p className="text-xs p-2">
            {datum.user.handle} - {new Date(datum.review.date).toDateString()}
          </p>
        </div>
      </Link>
      <p className="py-3 px-2 text-sm">{datum.review.content}</p>
    </li>
  );
}
