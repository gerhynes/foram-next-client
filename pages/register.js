import Head from "next/head";
import Layout from "../components/Layout/Layout";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <>
      <Head>
        <title>Fóram | Create an Account</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto">
          <div className="mt-10 bg-indigo-100 rounded-md py-8 px-4 mx-auto max-w-lg">
            <RegisterForm />
          </div>
        </div>
      </Layout>
    </>
  );
}
