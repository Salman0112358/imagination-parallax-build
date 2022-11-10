import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import Account from "../../components/Account/Account";

const myProfile: NextPage = () => {
  const session = useSession();
  const user = useUser();

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

export default myProfile;
