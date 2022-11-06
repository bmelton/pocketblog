import "styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import PocketBase from "pocketbase";
import { navItem } from "lib/types";

type CustomAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  navItems: navItem[];
};

export const CustomApp = ({
  Component,
  pageProps,
  navItems,
}: CustomAppProps) => {
  return <Component {...pageProps} navItems={navItems} />;
};

CustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const client = new PocketBase(process.env.NEXT_POCKETBASE_URL);
  const tableName = `${process.env.NEXT_POCKETBASE_PREFIX}pages`;
  const { items } = await client.records.getList(tableName, 1, 20, {
    published: true,
  });
  return {
    ...ctx,
    navItems: items,
  };
};

export default CustomApp;
