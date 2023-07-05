import Link from "next/link";
export default function InvalidParamsContent() {
  return (
    <>
      <p>Unable to process a request for search without being provided search parameters.</p>
      <Link href={"/dashboard"} className="underline">
        <p>Click me to return to the dashboard</p>
      </Link>
    </>
  );
}
