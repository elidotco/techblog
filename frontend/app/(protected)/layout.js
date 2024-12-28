"use client";

import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return <div>{children}</div>;
}
