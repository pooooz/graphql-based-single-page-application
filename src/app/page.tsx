import { LoginLink } from "@/components/loginLink/loginLink";
import { Routes } from "@/types/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex flex-col items-center w-full mx-12">
        Home page
        <LoginLink />
      </div>
      <Image
        src={
          "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        width={500}
        height={500}
        alt={"welcome"}
      />
    </main>
  );
}
