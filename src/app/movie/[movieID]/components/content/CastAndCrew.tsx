import { SubMainContainer } from "@/lib/sharedComponents/MainContainer";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import Link from "next/link";
import LinkIcon from "@/lib/sharedComponents/Icons/LinkIcon";
import CastCreditCard from "../CastCreditCard";

type Props = {
  cast: CastCredit[];
  crew: ExpandedCrewCredit[];
  movie: MovieDetails;
};

export default function CastAndCrew({ cast, crew, movie }: Props) {
  if (cast.length === 0 && crew.length === 0) {
    return undefined;
  }
  return (
    <Accordian title="Cast and Crew" openOnLoad={false}>
      <Link
        href={`/movie/${movie.id}/castandcrew`}
        className="flex flex-row gap-1 items-center justify-end text-sm hover:underline py-4 px-4"
      >
        <LinkIcon />
        <span>View Full Cast and Crew</span>
      </Link>

      {cast.length > 0 ? (
        <div className="">
          <h2 className="text-2xl font-bold pl-4">Top Billed Cast:</h2>
          <div className="w-full h-fit">
            <div className="flex flex-row overflow-y-hidden gap-4">
              {cast.slice(0, 10).map((credit) => {
                return <CastCreditCard credit={credit} key={credit.id} />;
              })}
            </div>
          </div>
        </div>
      ) : undefined}

      {crew.length > 0 ? (
        <div className="">
          <h2 className={`text-2xl font-bold pl-4 ${cast.length > 0 ? "mt-4" : ""}`}>Notable Crew:</h2>
          <div className="w-full h-fit">
            <div className="flex flex-row overflow-y-hidden gap-4 justify-start items-stretch">
              {crew.slice(0, crew.length >= 10 ? 10 : crew.length).map((credit) => {
                return <CastCreditCard credit={credit} key={credit.id} />;
              })}
            </div>
          </div>
        </div>
      ) : undefined}
    </Accordian>
  );
}
