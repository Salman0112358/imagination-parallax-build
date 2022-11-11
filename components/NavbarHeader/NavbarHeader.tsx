import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavbarHeader = (): JSX.Element => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/"); //sending the gang back to the root page
  };

  const handleEditUser = () => {
    router.push("/myprofile");
  };

  return (
    <header className="fixed bg-[#3f056e] bg-opacity-80 font-light text-slate-50 py-2 item px-2">
      <div className="flex items-center space-x-2 md:space-x-10">
        <ul className="flex space-x-4">
          <li className="headerLink">
            <Link href="/">Home</Link>
          </li>
          <li className="headerLink">
            {" "}
            <Link href="/myCollection">My Collection</Link>
          </li>
          <li className="headerLink">
            {" "}
            <Link href="/remix">Remix</Link>
          </li>

          <li className="headerLink">
            {" "}
            <Link href="/community">Community</Link>
          </li>
          {user ? (
            <>
              <li className="font-semibold">
                Welcome To The Imaginaton Parallax [{user?.email}]
              </li>
              <li>
                <button onClick={() => signOutUser()}>Sign Out</button>
              </li>
              <li>
                <button onClick={() => handleEditUser()}>Edit Profile</button>
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
