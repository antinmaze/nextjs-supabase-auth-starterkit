import { Metadata } from "next";
import SignInForm from "@/components/Auth/SignInForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
  // other metadata
};

const SigninPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard');
  }
  return (
    <SignInForm />
  );
};

export default SigninPage;