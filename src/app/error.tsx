"use client";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";
import Link from "next/link";
export default function Custom404() {
  return (
    <MainContainer>
      <SubHeader>There has been an error!</SubHeader>
      <div className="p-4">
        <Link href={"/"}>Click here to return to the homepage</Link>
      </div>
    </MainContainer>
  );
}
