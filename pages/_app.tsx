// 1. import `NextUIProvider` component
import '../styles/globals.css'

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import type { AppProps } from "next/app";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader"

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        <NavbarHeader/>
          <Component {...pageProps} />
    </SessionContextProvider>
  );
}
