import Head from "next/head";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto">
          <div className="mt-10 bg-indigo-100 rounded-md py-8 px-4 mx-auto max-w-lg">
            <LoginForm />
          </div>
        </div>
      </Layout>
    </>
  );
}
