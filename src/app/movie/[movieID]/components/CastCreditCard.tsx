import Link from "next/link";
import Image from "next/image";
import { preferredProfileSize } from "@/lib/utils/preferredProfileSize";
import manSVG from "../../../../../public/man.svg";
import womanSVG from "../../../../../public/woman.svg";

type Props = {
  credit: CastCredit | ExpandedCrewCredit;
};
export default function CastCreditCard({ credit }: Props) {
  const isCastCredit = credit.hasOwnProperty("character");
  const isCrewCredit = credit.hasOwnProperty("jobs");
  const imageContent = (() => {
    if (credit.profile_path) {
      return (
        <Image
          alt={`${credit.name} poster image`}
          src={`https://image.tmdb.org/t/p/w185${credit.profile_path}`}
          width={preferredProfileSize.width}
          height={preferredProfileSize.height}
          priority={true}
          className=""
        />
      );
    } else {
      return (
        <div
          style={{ width: `${preferredProfileSize.width}px`, height: `${preferredProfileSize.height}px` }}
          className="relative"
        >
          <Image
            alt={`${credit.name} poster image`}
            src={credit.gender === 1 ? womanSVG : manSVG}
            width={preferredProfileSize.width}
            height={preferredProfileSize.height}
            priority={true}
            className="absolute bottom-0"
          />
        </div>
      );
    }
  })();

  return (
    <Link href={`/person/${credit.id}`} className="shrink-0 grow-0 my-4">
      <article className="bg-black/20 hover:bg-black/30 rounded-lg overflow-hidden shadow-slate-700/40 shadow-md max-w-poster">
        {imageContent}
        <div className="p-2">
          <h3 className="font-bold text-sm">{credit.name}</h3>
          {isCastCredit ? <p className="px-1 text-sm h-8 max-h-8">{(credit as CastCredit).character}</p> : undefined}
          {isCrewCredit ? (
            <p className="px-1 text-xs h-8 max-h-8">{(credit as ExpandedCrewCredit).jobs.join(", ")}</p>
          ) : undefined}
        </div>
      </article>
    </Link>
  );
}
