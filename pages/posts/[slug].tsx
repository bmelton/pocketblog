import { GetServerSideProps } from "next";
import PocketBase from "pocketbase";
import blogPost from "../../lib/types/BlogPost";

type PostPage = {
  post: blogPost;
};

export const PostPage = ({ post }: PostPage) => {
  return (
    <div className="h-16">
      <h1>Post</h1>
    </div>
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
