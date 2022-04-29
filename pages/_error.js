import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout/Layout";

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container min-h-screen mx-auto text-center grid place-content-center">
          <h1 className="text-4xl font-semibold mb-8">
            {statusCode
              ? `${statusCode} - A Server Error Occurred`
              : "An Error Occurred"}
          </h1>
          <div>
            <Link href="/">
              <a className="px-4 py-2 bg-indigo-900 text-white font-semibold hover:bg-indigo-200 hover:text-indigo-900 transition">
                Go back to the homepage
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
