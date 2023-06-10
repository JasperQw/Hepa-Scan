"use client";

import { Poppins } from "next/font/google";
import SideBar from "./(components)/SideBar";
import Table from "./(components)/Table";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  async function deleteAll() {
    await fetch("/api/deleteAll");
  }
  return (
    <div className="h-screen overflow-scroll w-full dark:bg-black flex justify-center pl-[30rem]">
      <SideBar />
      <div className="flex flex-col gap-10 mt-7 h-[90%] overflow-scroll justify-between pb-[2px]">
        <h1
          className={`${poppins.className} text-white text-3xl text-center w-full underline decoration-indigo-600 underline-offset-8`}
        >
          History
        </h1>
        <div className="h-[80%]">
          <Table />
        </div>

        <button
          onClick={deleteAll}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
