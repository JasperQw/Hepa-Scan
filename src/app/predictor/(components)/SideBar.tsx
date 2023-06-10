import Form from "./Form";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function SideBar() {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-[30rem] z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h1
            className={`${poppins.className} mt-3 text-white text-3xl text-center w-full underline decoration-indigo-600 underline-offset-8 `}
          >
            Hepa-Scan
          </h1>
          <Form />
        </div>
      </aside>
    </>
  );
}
