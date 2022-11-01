import React from 'react'
import type {NextPage} from 'next'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"

const Login : NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    if (user) {
        router.push("/")
    }

  return (
    <div className='py-20'>

      <Auth 
      appearance={{theme : ThemeSupa}}
      supabaseClient={supabaseClient}
      />
    </div>
  )
}

export default Login