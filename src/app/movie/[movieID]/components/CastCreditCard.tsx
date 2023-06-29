import Link from "next/link";
import Image from "next/image";
import { preferredProfileSize } from "@/lib/utils/preferredProfileSize";
import FallbackPersonImage from "@/lib/sharedComponents/FallbackPersonImage";
import manSVG from "../../../../../public/man.svg";
import womanSVG from "../../../../../public/woman.svg";

type Props = {
  credit: CastCredit | ExpandedCrewCredit;
};
export default function CastCreditCard({ credit }: Props) {
  const isCastCredit = credit.hasOwnProperty("character");
  const isCrewCredit = credit.hasOwnProperty("jobs");
  return (
    <Link href={`/person/${credit.id}`} className="shrink-0 grow-0 my-2">
      <article className="bg-black/20 hover:bg-black/30 rounded-lg overflow-hidden drop-shadow-lg max-w-poster">
        <FallbackPersonImage
          profile_path={credit.profile_path}
          src={`https://image.tmdb.org/t/p/w185${credit.profile_path}`}
          alt={`Profile Photo - ${credit.name}`}
          width={preferredProfileSize.width}
          height={preferredProfileSize.height}
          priority={true}
          crossOrigin=""
          gender={credit.gender}
          className="w-profile max-w-profile h-profile max-h-profile"
        />
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
