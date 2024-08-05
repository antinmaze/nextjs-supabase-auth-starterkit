import { Metadata } from "next";
import WelcomeForm from "@/components/Auth/WelcomePage";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const WelcomePage = () => {

  return (
    <WelcomeForm />
  );
};

export default WelcomePage;
