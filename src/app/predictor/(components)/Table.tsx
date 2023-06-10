"use client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Table() {
  const [data, setData] = useState([{ name: "", result: "" }]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api");
      const data = await res.json();
      setData(data);
    })();
  }, [data]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-[40rem] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-[15rem]">
              <div className="flex items-center justify-center">
                Patients' Name
              </div>
            </th>

            <th scope="col" className="px-6 py-3 w-[25rem]">
              <div className="flex items-center justify-center">Result</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr
                key={nanoid()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center"
                >
                  <p className="text-center w-full">{row.name}</p>
                </th>
                <td className="px-6 py-4">
                  <p className="text-center w-full">{row.result}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
