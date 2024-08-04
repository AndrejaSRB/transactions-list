import Link from "next/link";

export default function NotFoundHashPage() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-rose-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-rose-600 md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-8 text-lg font-light text-white">
            Sorry, there is no available data for requested hash. <br /> Or this
            hash does not belong to the address you requested.
            <br />
            And whether that address participated in that transaction
          </p>

          <Link
            href="/"
            className="p-4 bg-rose-800 hover:bg-rose-900 transition-colors rounded">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
