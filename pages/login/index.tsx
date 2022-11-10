import React from "react";
import type { NextPage } from "next";
import {
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Account from "../../components/Account/Account";

const Login: NextPage = () => {
  
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  // if (user) {
  //   router.push("/login/account");
  // }

  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      {!session ? (
        <div className=" w-1/4">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["discord"]}
          />
        </div>
      ) : (
        <Account session={session}/>
      )}
    </div>
  );
};

export default Login;
