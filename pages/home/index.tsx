import React from 'react'
import type {NextPage} from 'next'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import axios from 'axios';


const Home : NextPage = ({data} : any ) => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    console.log(data)

  return (
    <>
    <div>THe Home page for a logged in user</div>
    </>
    
  )
}

export default Home

export async function getServerSideProps() {
    // Fetch data from external API
    const response = await axios.get("https://lexica.art/api/v1/search?q=apples")
    const data =  response.data
  
    // Pass data to the page via props
    return { props: { data } }
  }