import Footer from "@/components/Portal/Footer";
import Header from "@/components/Portal/Header";
import ScrollToTop from "@/components/Portal/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header user={user} />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";import { createClient } from "@/utils/supabase/server";

