import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import Link from "next/link";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const session = await getSessionOnServer();
  if (!session) {
    redirect("/");
  }
  return (
    <MainContainer>
      <p>Sup Bitches I am the search page</p>
      <Link href={"/dashboard"}> Back to Dashboard</Link>
    </MainContainer>
  );
}
