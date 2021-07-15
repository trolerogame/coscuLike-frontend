/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
const formSubmitImage = ({
  imagePreview,
  setImagePreview,
  Descripction,
  setDescription,
  setImage,
  setImageError,
  coscunt
}: any) => {
  const File = (e: any) => {
    if(e.target.files[0] && !e.target.files[0].type.match(/image-*/)){
      setImageError(true)
      return
    }
    const fileLoad = new FileReader();
    fileLoad.readAsDataURL(e.target.files[0]);
    fileLoad.onload = () => {
      setImagePreview({
        height: 300,
        width: 300,
        src: fileLoad.result as string,
      });
    };
    const data = new FormData();
    data.append("file", e.target.files[0]);
    setImage(data);
  };
  return (
    <>
      <div className="my-3 text-center">
        {coscunt && <p className="text-danger text-center">tomatela wachin 😡</p>}
        <label htmlFor="file" className="form-control btn btn-primary rounded-0">
          CHOOSE
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={File}
          accept="image/*"
        />
      </div>
      <div className="text-center" >
        {imagePreview.src && (
          <Image src={imagePreview} alt="avatar" width={70} height={70} />
        )}
      </div>
      <div className="my-5">
        <label htmlFor="Descripction">Descripcion</label>
        <textarea
          name="Descripction"
          id="Descripction"
          className="form-control rounded-0"
          value={Descripction}
          onChange={(e: any) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default formSubmitImage;
