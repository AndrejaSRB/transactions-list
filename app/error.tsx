"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-2xl tracking-tight font-extrabold lg:text-6xl text-rose-500">
            Unexpected error
          </h1>
          {error?.message && (
            <p className="mb-4 text-xl tracking-tight font-bold text-rose-600 md:text-2xl">
              {error?.message}
            </p>
          )}
          <p className="mb-8 text-md font-light text-white">
            We apologize for the inconvenience. Please try again later.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              onClick={() => reset()}
              className="px-4 lg:px-6 py-2 lg:py-3 rounded-lg w-32 lg:w-44 mt-4 bg-rose-500 text-white transition-colors hover:bg-rose-600">
              Try Again
            </button>

            <Link
              href="/"
              className="p-4 text-rose-500 hover:texts-rose-900 transition-colors rounded">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
