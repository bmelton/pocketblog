import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import PocketBase from "pocketbase";
import { NextPage } from "next";

type CustomAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  navItems: any;
};

export const CustomApp: NextPage = ({
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
