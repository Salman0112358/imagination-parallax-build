import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const NavbarHeader = (): JSX.Element => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/home"); //sending the gang back to the root page
  };

  return (
    <header className="bg-[#3f056e] bg-opacity-70">
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1045/1045191.png"
          width={100}
          height={100}
          className={"cursor-pointer object-contain"}
          alt="whale icon"
        />
        <ul className="flex space-x-4">
          <li className="headerLink">Explore</li>
          <li className="headerLink">My Collection</li>
          {user ? (
            <>
            <li>Welcome To The Imaginaton Parallax {user?.email}</li>
            <li><button onClick={() => signOutUser()}>Sign Out</button></li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
    // <Navbar isBordered isCompact>
    //   <Navbar.Brand as={Link} href="/home">
    //     Home
    //   </Navbar.Brand>
    //   <Navbar.Content hideIn="xs" variant="highlight-rounded">
    //     <Link href="/myCollection">My Collection</Link>
    //     <Link href="/explore">Explore Users</Link>
    //   </Navbar.Content>
    //   <Navbar.Content>
    //     {!user ? (
    //       <Link href="/login">
    //         <Button auto flat>
    //           Login
    //         </Button>
    //       </Link>
    //     ) : (
    //       <>
    //         <Navbar.Item>
    //           <Text> Welcome To The Imagination Parallax {user?.email}</Text>
    //         </Navbar.Item>
    //         <Navbar.Item>
    //           <Button auto flat onPress={() => signOutUser()}>
    //             Sign Out
    //           </Button>
    //         </Navbar.Item>
    //       </>
    //     )}
    //   </Navbar.Content>
    // </Navbar>
  );
};

export default NavbarHeader;
