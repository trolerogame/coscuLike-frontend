import React,{ReactNode} from "react";
import Head from "next/head";
interface HeadInterface {
  title:string
  children:ReactNode
}
const head = ({title,children}: HeadInterface) => {
  return (
    <>
      <Head>
        <meta name="author" content="Daniel Campos"></meta>
        <title>{title}</title>
        <html lang={"es"} />
      </Head>
      {children}
    </>
  );
};

export default head;
