import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GenericModal } from "../GenericModal/GenericModal";
import PromptSubmission from "../PromptSubmission/PromptSubmission";

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
    <header className="fixed bg-[#3f056e] bg-opacity-80 font-light text-xl text-slate-50 py-2 item px-2 hover:bg-[#800337]">
      <div className="w-screen flex items-center space-x-2 md:space-x-10 max-[1170px]:justify-center">
        <ul className="flex space-x-4 items-center">
          <li className="headerLink">
            <Link className="button" href="/">
              Explore
            </Link>
          </li>
          <li className="headerLink">
            {" "}
            <Link className="button" href="/remix">
              Remix
            </Link>
          </li>
          <li className="headerLink">
            {" "}
            <Link className="button" href="/community">
              Community
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={() => signOutUser()}>Sign Out</button>
              </li>
              <li>
                <button onClick={() => handleEditUser()}>Edit Profile</button>
              </li>
              <li>{user.email}</li>
            </>
          ) : (
            <li>
              <Link className="button" href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default NavbarHeader;
