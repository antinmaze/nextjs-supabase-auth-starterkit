import Breadcrumb from "@/components/Portal/Common/Breadcrumb";
import Features from "@/components/Portal/Features";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features Page | Free Next.js Template for Startup and SaaS",
  description: "This is Features Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Features />
    </>
  );
};

export default ContactPage;
