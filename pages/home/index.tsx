import React from 'react'
import type {NextPage} from 'next'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"

const Home : NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

  return (
    <div>THe Home page for a logged in user</div>
  )
}

export default Home