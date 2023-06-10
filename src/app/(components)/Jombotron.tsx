import Link from "next/link";

export default function Jombotron() {
  return (
    <div className="h-screen px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 flex flex-col justify-center items-center">
      <h1 className="z-[100] mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        Predictive power for liver well-being
      </h1>
      <p className="z-[100]  mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
        Unleashing the untapped potential of liver health with visionary
        solutions and groundbreaking technology, transforming the way we
        approach wellness.
      </p>
      <div className="z-[100] flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Link
          href="/predictor"
          className="z-[100] inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get started
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
