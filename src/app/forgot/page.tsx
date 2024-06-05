import { Metadata } from "next";
import SignInForm from "@/components/Auth/SignInForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ForgotForm from "@/components/Auth/ForgotForm";

export const metadata: Metadata = {

  title: "Forgot Password Page | Free Next.js Template for Startup and SaaS",
  description: "This is The Forgot Password Page for Startup Nextjs Template",
  // other metadata
};

const ForgotPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard');
  }
  return (
    <ForgotForm />
  );
};

export default ForgotPage;