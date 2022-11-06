import Image from "next/legacy/image";
import { navItem } from "lib/types";

type FooterProps = {
  navItems: navItem[];
};

export default function Footer(navItems: FooterProps) {
  return (
    <footer className="mt-12">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
}
