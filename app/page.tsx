import AddressSearch from "./components/AddressSearch";
import Title from "./components/title";

export default function Home() {
  return (
    <main>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-3xl tracking-tight font-extrabold lg:text-6xl text-rose-500">
            Welcome
          </h1>

          <h4 className="text-sm lg:text-lg">
            Please enter the address, to get the list of transactions.
          </h4>

          <Title />
        </div>

        <AddressSearch />
      </div>
    </main>
  );
}
