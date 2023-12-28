import { Routes } from "@/types/routes";
import Image from "next/image";
import Link from "next/link";
import { LoginLink } from "../loginLink/loginLink";

export const Header = () => {
  return (
    <header className="shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] relative">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link
          href={Routes.HOME}
          className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <Image
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/graphql_logo_icon_171045.png"
            alt="logo"
            width={144}
            height={72}
            className="w-36"
          />
        </Link>

        <Link href={Routes.HOME}>Home</Link>
        <Link href={Routes.LOOS}>Loos</Link>
        <div className="flex items-center ml-auto lg:order-1">
          <LoginLink />
        </div>
      </div>
    </header>
  );
};
