import "../styles/globals.css";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { use, useState } from "react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionContextProvider>
  );
}
