import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import ToastWrapper from "@/lib/sharedComponents/ToastWrapper";

type Props = {
  children: ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastWrapper />
    </>
  );
}

export default RootLayout;
