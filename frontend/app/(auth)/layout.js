"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return <div>{children}</div>;
}
