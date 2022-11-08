import Image from "next/legacy/image";

type HeaderImageProps = {
  url: string;
  title: string;
  className?: string;
};

export default function HeaderImage({
  url,
  title,
  className,
}: HeaderImageProps) {
  return (
    <div className={`relative block center min-w-full w-64 h-64 ${className}`}>
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
