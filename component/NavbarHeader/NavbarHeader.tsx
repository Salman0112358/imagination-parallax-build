import React from "react";
import { Navbar, Button, Text } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavbarHeader = (): JSX.Element => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/home"); //sending the gang back to the root page 
  }

  return (
    <Navbar isBordered isCompact>
      <Navbar.Brand as={Link} href="/home">
        Home
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Link href="/myCollection">My Collection</Link>
        <Link href="/explore">Explore Users</Link>
      </Navbar.Content>
      <Navbar.Content>
        {!user ? (
          <Link href="/login">
            <Button auto flat>
              Login
            </Button>
          </Link>
        ) : (
          <>
            <Navbar.Item>
              <Text> Welcome To The Imagination Parallax {user?.email}</Text>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={() => signOutUser()}>
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarHeader;
