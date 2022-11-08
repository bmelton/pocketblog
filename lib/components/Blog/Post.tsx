import { blogPost } from "lib/types";
import HeaderImage from "lib/components/Header/HeaderImage";

type PostProps = {
  post: blogPost;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="mb-4 bg-slate-100 p-4">
      <div className="grid grid-flow-row md:grid-flow-col gap-4">
        {post.headerImageUrl ? (
          <HeaderImage url={post.headerImageUrl} title={post.title} />
        ) : null}
        <div className="flex flex-col mb-1 place-content-center">
          <a
            href={`/posts/${post.slug}`}
            className="text-gray-700 hover:text-blue-500 font-semibold text-2xl"
          >
            {post.title}
          </a>
          <p>{post.content.slice(0, 280)}</p>
        </div>
      </div>
    </div>
  );
}
