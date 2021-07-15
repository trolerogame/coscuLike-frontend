import React,{ReactNode} from "react";
import Head from "next/head";
interface HeadInterface {
  title:string
  children:ReactNode
}
const head = ({title,children}: HeadInterface) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <html lang={"es"} />
        <meta name="description" content="Author:Daniel Campos"></meta>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        ></meta>
        
      </Head>
      {children}
    </div>
  );
};

export default head;
