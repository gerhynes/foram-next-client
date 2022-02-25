import Head from "next/head";
import Layout from "../components/layout";
import Category from "../components/category";
import Topic from "../components/topic";

export default function Home({ categories, topics }) {
  console.log(categories);
  console.log(topics);
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mt-10 mx-auto sm:flex sm:gap-8">
          <div className="mb-8 sm:flex-1" id="categories">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Subforum</span>
              <span className="text-slate-600">Topics</span>
            </div>
            {categories
              .sort((a, b) => a.id - b.id)
              .map((category) => (
                <Category
                  key={category.id}
                  name={category.name}
                  id={category.id}
                  description={category.description}
                  topics="3"
                />
              ))}
            {/* <Category
              name="JavaScript"
              description="Ask questions and share tips for JavaScript, React, Node - anything to do with the JavaScript ecosystem."
              topics="3"
            />
            <Category
              name="Java"
              description="Ask questions and share tips for Java, Spring, JUnit - anything to do with the Java ecosystem."
              topics="3"
            />
            <Category
              name="Scala"
              description="Ask questions and share tips for Scala, Akka, Play - anything to do with the Scala ecosystem."
              topics="3"
            />
            <Category
              name="Python"
              description="Ask questions and share tips for Django, Pandas, PySpark - anything to do with the Python ecosystem."
              topics="3"
            />
            <Category
              name="Databases"
              description="Ask questions and share tips for SQL, Postgres, MongoDB - anything to do with databases."
              topics="3"
            />
            <Category
              name="DevOps"
              description="Ask questions and share tips for Docker, Kubernetes, Jenkins - anything to do with DevOps."
              topics="3"
            /> */}
          </div>
          <div className="sm:flex-1" id="latestTopics">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Latest</span>
            </div>
            {topics
              .sort((a, b) => a.id - b.id)
              .map((topic) => (
                <Topic
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  category="categoryName"
                  posts="12"
                />
              ))}
            {/* <Topic
              title="Can someone help me with Java multithreading?"
              category="Java"
              posts="9"
            />
            <Topic
              title="There are no good Scala resources"
              category="Scala"
              posts="2"
            />
            <Topic
              title="I don't understand promises in JavaScript. Help!"
              category="JavaScript"
              posts="12"
            />
            <Topic
              title="Can someone help me set up Spring Boot?"
              category="Java"
              posts="3"
            />
            <Topic
              title="Akka Persistence makes no sense, like none at all!"
              category="Scala"
              posts="1"
            />
            <Topic
              title="How does useEffect work?"
              category="JavaScript"
              posts="3"
            /> */}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const categoryRes = await fetch(`http://localhost:8080/api/categories/`);
  const categories = await categoryRes.json();

  const topicRes = await fetch(`http://localhost:8080/api/topics/`);
  const topics = await topicRes.json();

  return { props: { categories, topics } };
}
