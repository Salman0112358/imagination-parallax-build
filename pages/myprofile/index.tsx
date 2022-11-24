import React from "react";

import type { NextPage } from "next";
import { useSession} from "@supabase/auth-helpers-react";

import Account from "../../components/Account/Account";

const MyProfile: NextPage = () => {
  const session = useSession();


  return (
    <div className=" flex justify-center items-center h-screen w-screen  ">
      {session && (
        <div className="w-1/4">
          <Account session={session} />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
