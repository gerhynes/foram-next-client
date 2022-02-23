import Head from "next/head";
import Layout from "../components/layout";
import Category from "../components/category";
import Topic from "../components/topic";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mt-8 mx-auto sm:flex sm:gap-8">
          <div className="mb-8 sm:flex-1" id="categories">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Subforum</span>
              <span className="text-slate-600">Topics</span>
            </div>
            <Category
              name="JavaScript"
              description="Ask questions and share tips for JavaScript, React, Node - anything that touches the JavaScript ecosystem."
              topics="3"
            />
            <Category
              name="Java"
              description="Ask questions and share tips for Java, Spring - anything that touches the Java ecosystem."
              topics="3"
            />
            <Category
              name="Scala"
              description="Ask questions and share tips for Scala, Akka, Play - anything that touches the Scala ecosystem."
              topics="3"
            />
          </div>
          <div className="sm:flex-1" id="latestTopics">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Latest</span>
            </div>
            <Topic
              title="Can someone help me with this Java problem?"
              category="Java"
              posts="9"
            />
            <Topic
              title="There are no good Scala resources"
              category="Scala"
              posts="2"
            />
            <Topic
              title="Can someone help me with this JavaScript problem?"
              category="JavaScript"
              posts="15"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
