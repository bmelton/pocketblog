import Link from "next/link";

const Badge = () => {
  return (
    <div className="text-xxs absolute -top-2 left-28 py-1 px-3 rounded-full z-10 bg-red-600 text-white">
      Superalpha
    </div>
  );
};

export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <div className="relative">
          <h1 className="text-3xl">
            <span className="font-light">Pocket</span>
            <span className="font-bold">blog</span>
            <Badge />
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
