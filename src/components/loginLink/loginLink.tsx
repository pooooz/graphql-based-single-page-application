"use client";

import { useAuth } from "@/context/auth";
import { Routes } from "@/types/routes";
import { useRouter } from 'next/navigation'

export const LoginLink = () => {
  const { isAuth, handleLogout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isAuth) {
      handleLogout();
    } else {
      router.replace(Routes.LOGIN);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mr-6 font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underlin"
    >
      {!isAuth ? "Sign in" : "Log out"}
    </button>
  );
};
