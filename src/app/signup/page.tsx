import { Metadata } from "next";
import SignUpForm from "@/components/Auth/SignUpForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard');
  }
  return (
    <SignUpForm />
  );
};

export default SignupPage;
