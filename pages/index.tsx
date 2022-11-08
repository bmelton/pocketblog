import Head from "next/head";
import Header from "lib/components/Header/Header";
import PocketBase from "pocketbase";
import { navItem, blogPost } from "lib/types";
import Footer from "lib/components/Footer/Footer";
import Post from "lib/components/Blog/Post";

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

  function buildImage(item: any) {
    if (!item?.headerImage) return null;
    const host = process.env.NEXT_POCKETBASE_URL;
    const img = `${host}/api/files/${item["@collectionId"]}/${item?.id}/${item?.headerImage}`;
    return img;
  }
  function normalizeItem(item: any) {
    const obj = { ...item };
    obj.headerImageUrl = buildImage(item);
    return obj;
  }

  // Set up the table query
  const prefix = process.env.NEXT_POCKETBASE_PREFIX;
  const tableName = `${prefix}posts`;
  const { items } = await client.records.getList(tableName, 1, 20, {});
  return {
    props: {
      posts: items.map((item) => normalizeItem(item)),
    },
  };
}
