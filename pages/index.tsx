import Head from "next/head";
import Header from "lib/components/Header/Header";
import PocketBase from "pocketbase";
import { navItem, blogPost } from "lib/types";
import Footer from "lib/components/Footer/Footer";
import Post from "lib/components/Blog/Post";
import normalizeBlogPost from "lib/utils/normalizeBlogPost";

type HomeProps = {
  posts: blogPost[];
  navItems: navItem[];
};

export default function Home({ posts, navItems }: HomeProps) {
  return (
    <>
      <Header navItems={navItems} />
      <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
        <Head>
          <title>Pocketblog</title>
          <meta
            name="description"
            content="Pocketblog is a SIMPLE, SEO-focused blog system, powered by NextJS and Pocketbase"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>

        <Footer navItems={navItems} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = new PocketBase(process.env.NEXT_POCKETBASE_URL);

  // Set up the table query
  const prefix = process.env.NEXT_POCKETBASE_PREFIX;
  const tableName = `${prefix}posts`;
  const { items } = await client.records.getList(tableName, 1, 20, {});
  // TODO: Update these types (see normalizeBlogPost.ts)
  return {
    props: {
      posts: items.map((item) => normalizeBlogPost(item)),
    },
  };
}
