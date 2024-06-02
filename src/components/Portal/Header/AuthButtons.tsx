"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthButtons = () => {
  const usePathName = usePathname();

  return (
    <>
      <Link href="/signin"
        className={`px-7 py-3 text-base font-medium  md:block sm:hidden
        ${usePathName === "/signin"
          ? "text-primary dark:text-white"
          : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
          }`}
      >
        Sign In
      </Link>
      <Link href="/signup"
        className={`px-7 py-3 text-base font-medium md:block sm:hidden
        ${usePathName === "/signup"
          ? "text-primary dark:text-white"
          : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
          }`}
      >
        Sign Up
      </Link>
    </>
  );
};
export default AuthButtons;