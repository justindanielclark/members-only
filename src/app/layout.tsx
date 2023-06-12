import "./globals.css";
import NextAuthProvider from "./lib/providers/NextAuthProvider";
import RootLayout from "./components/RootLayout";

export const metadata = {
  title: "MembersOnly",
  description: "Built by JClark",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col text-white h-screen max-h-screen">
        <NextAuthProvider>
          <RootLayout>{children}</RootLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
