import PocketBase from "pocketbase";
import { blogPost, navItem } from "lib/types";
import Header from "lib/components/Header/Header";
import Footer from "lib/components/Footer/Footer";
import HeaderImage from "lib/components/Header/HeaderImage";
import normalizeBlogPost from "lib/utils/normalizeBlogPost";
import Head from "next/head";

type PostPage = {
  post: blogPost;
  navItems: navItem[];
};

export const PostPage = ({ post, navItems }: PostPage) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 60)} />
      </Head>
      <Header navItems={navItems} />
      <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <HeaderImage
          url={post.headerImageUrl}
          title={post.title}
          className="my-4"
        />
        <p className="">{post.content}</p>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
        <Footer navItems={navItems} />
      </div>
    </>
  );
};

export default PostPage;

interface Params {
  slug: string;
}

interface Context {
  params: Params;
}

export const getServerSideProps = async ({ params }: Context) => {
  const client = new PocketBase(process.env.NEXT_POCKETBASE_URL);

  // Set up the table query
  const prefix = process.env.NEXT_POCKETBASE_PREFIX;
  const tableName = `${prefix}posts`;
  const { items } = await client.records.getList(tableName, 1, 1, {
    expand: "author",
    filter: `slug = "${params.slug}"`,
  });

  return {
    props: {
      post: normalizeBlogPost(items[0]),
    },
  };
};
