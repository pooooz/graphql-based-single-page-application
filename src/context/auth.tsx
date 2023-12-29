"use client";

import { PublicRoutes, Routes } from "@/types/routes";
import { RedirectType, redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuth: boolean;
  handleLogout: () => void;
  handleAuth: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const getInitialAuthValue = () => {
  if (typeof window !== "undefined") {
    const storedUser = window.localStorage.getItem("isAuth");
    if (storedUser) {
      return JSON.parse(storedUser) as boolean;
    }
  }
  return false;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => getInitialAuthValue());
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", JSON.stringify(isAuth));
    }
    if (!isAuth) {
      localStorage.removeItem("isAuth");
      if (!PublicRoutes.includes(pathname as Routes)) {
        router.replace(Routes.LOGIN);
      }
    }
  }, [isAuth, pathname, router]);

  const handleLogout = useCallback(() => {
    setIsAuth(false);
    router.replace(Routes.LOGIN);
  }, [router]);

  const handleAuth = useCallback(() => {
    setIsAuth(true);
    router.replace(Routes.HOME);
  }, [router]);

  const contextValue = useMemo(
    () => ({
      isAuth,
      handleLogout,
      handleAuth,
    }),
    [handleLogout, handleAuth, isAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { isAuth, handleLogout, handleAuth } = useContext(AuthContext);
  return { isAuth, handleLogout, handleAuth };
};
