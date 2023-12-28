"use client";
import { LooItem, Loos, useLoos } from "@/query/useLoos";
import { Loo } from "../loo/loo";
import { useState } from "react";

export const LooList = () => {
  const [loo, setLoo] = useState<LooItem | undefined>();
  const [search, setSearch] = useState<string>("");
  const { data } = useLoos({ text: search });

  const handleClick = (value: LooItem) => {
    setLoo(value);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        className="rounded pl-12 py-2 md:py-4 focus:outline-none w-full my-12"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="px-5 mt-16">
          {data?.map((value) => (
            <Loo
              key={value.id}
              name={value.name}
              notes={value.notes}
              onClick={() => handleClick(value)}
            />
          ))}
        </div>
        {loo && (
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {loo.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {loo.notes}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              All gender: {loo.allGender ? "Yes" : "No"}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Baby change: {loo.babyChange ? "Yes" : "No"}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Active: {loo.active ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
