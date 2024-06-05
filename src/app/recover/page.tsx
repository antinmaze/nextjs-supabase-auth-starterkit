import { Metadata } from "next";
import RecoverForm from "@/components/Auth/RecoverForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Recover Page | Free Next.js Template for Startup and SaaS",
  description: "This is Recover Page for Startup Nextjs Template",
  // other metadata
};

const RecoverPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

   if (!user) {
    redirect('/');
  }
  return (
    <RecoverForm />
  );
};

export default RecoverPage;