import Head from "next/head";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen grid place-content-center">
        <h1 className="text-2xl font-bold">Welcome to Fóram</h1>
      </main>
    </div>
  );
}
