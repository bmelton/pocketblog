import PocketBase from "pocketbase";
import { blogPost, navItem } from "lib/types";
import Header from "lib/components/Header/Header";
import Footer from "lib/components/Footer/Footer";
import HeaderImage from "lib/components/Header/HeaderImage";

type PostPage = {
  post: blogPost;
  navItems: navItem[];
};

export const PostPage = ({ post, navItems }: PostPage) => {
  console.log(post);
  return (
    <>
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
  const { items } = await client.records.getList(tableName, 1, 1, {
    expand: "author",
    filter: `slug = "${params.slug}"`,
  });

  return {
    props: {
      post: normalizeItem(items[0]),
    },
  };
};
