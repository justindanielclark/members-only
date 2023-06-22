import MainContainer from "@/lib/sharedComponents/MainContainer";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import Link from "next/link";

export default async function notFound() {
  const session = await getSessionOnServer();
  const content = (() => {
    if (session) {
      return (
        <Link href={"/dashboard"} className="underline text-lg">
          Click me to return to your dashboard
        </Link>
      );
    }
    return (
      <Link href={"/"} className="underline text-lg">
        Click me to return to the landing page
      </Link>
    );
  })();

  return (
    <MainContainer className="relative h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-xl">Unfortunately, no such page exists.</p>
        {content}
      </div>
    </MainContainer>
  );
}
