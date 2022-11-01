import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const NavbarHeader = (): JSX.Element => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/home"); //sending the gang back to the root page
  };

  return (
    <header className="bg-[#3f056e] bg-opacity-80 font-light text-slate-50">
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/1045/1045191.png"
            width={100}
            height={100}
            className={"cursor-pointer object-contain"}
            alt="whale icon"
          />
        </Link>
        <ul className="flex space-x-4">
          <li className="headerLink">
            <Link href="/explore">Explore</Link>
          </li>
          <li className="headerLink">
            {" "}
            <Link href="/myCollection">My Collection</Link>
          </li>
          {user ? (
            <>
              <li>Welcome To The Imaginaton Parallax {user?.email}</li>
              <li>
                <button onClick={() => signOutUser()}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default NavbarHeader;
