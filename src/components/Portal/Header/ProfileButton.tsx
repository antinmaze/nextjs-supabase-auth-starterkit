"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const ProfileButton = () => {

  return (
    <>
      <Link href="/profile"
        className="px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white 
        sm:hidden md:hidden lg:inline-flex"
      >
        Profile
      </Link>
      <form action="/api/auth/signout/" method="post">
      <button 
        className=" px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white 
        sm:hidden md:hidden lg:inline-flex"
        type="submit"
      >
        Sign Out
      </button>
      </form>
    </>
  );

};
export default ProfileButton;