import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center">
          <div className="rounded-md bg-black bg-opacity-20 px-8 py-6 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex flex-row">
              <input className="promptInput" placeholder="Instance Prompt" />
              <input className="promptInput" placeholder="Class Prompt" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
