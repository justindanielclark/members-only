import Link from "next/link";
import TMDB from "../../../public/TMDB.svg";
import GitHubIcon from "@/lib/sharedComponents/Icons/GithubIcon";
import Image from "next/image";
function Footer() {
  return (
    <footer className="h-12 gap-6 bg-slate-900 border-t border-slate-600 flex flex-row items-center w-full justify-center">
      <Link href={"https://www.themoviedb.org/?language=en-US"} target="_blank">
        <span className="mr-4 hidden sm:inline">Powered By:</span>
        <Image src={TMDB} height={30} alt="TMDB logo" className="inline" />
      </Link>
      <Link href={"https://www.github.com/justindanielclark"} target="_blank">
        <span className="mr-4 hidden sm:inline">Created By:</span>
        <GitHubIcon />
      </Link>
    </footer>
  );
}

export default Footer;
