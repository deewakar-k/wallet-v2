"use client";

import { Appbar } from "@wallet/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </>
  );
}
