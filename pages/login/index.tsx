import React from "react";
import type { NextPage } from "next";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/myprofile");
  }

  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      {!user && (
        <div className=" w-1/4">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["discord", "github"]}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
