import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const copyLink = (text: any) => {
  return (
    <CopyToClipboard text={text.text}>
      <button className="btn m-0 p-0 w-100 text-start" onClick={(e: any) => e.preventDefault()}>
        Copiar link
      </button>
    </CopyToClipboard>
  );
};

export default copyLink;
