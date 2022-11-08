import Image from "next/legacy/image";

type HeaderImageProps = {
  url: string;
  title: string;
};

export default function HeaderImage({ url, title }: HeaderImageProps) {
  return (
    <div className="relative block center min-w-full w-64 h-64">
      <Image
        src={url}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="aspect-square"
        priority
      />
    </div>
  );
}
