import React from "react";
import UserUndefined from "../../public/usernameUndefine.png";
import Image from "next/image";
import CardPost from "../home/CardPost";
import ProfileEdit from "./profileConfig";
const userLayout = ({ username, propretier, asPath }: any) => {
  setTimeout(()=>{ if (!propretier) document.location.href = "/"},1000)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-4 w-100">
      {username && (
        <>
          <div className="">
            {username.avatar 
              ?  
              
              <Image
                loader={({src}:any)=> `http://localhost:3002/public/avatar${src}`}
                src={"/" + username.avatar}
                alt=""
                className="rounded-circle"
                width={60}
                height={60}
              />
              :
              <Image
                src={UserUndefined}
                alt=""
                width={60}
                height={60}
              />
            }
          </div>
          <div className="d-flex align-items-center">
            <h3 className="text-dark my-0 pb-2">{username.username}</h3>
            {propretier && <ProfileEdit asPath={asPath} />}
          </div>
          <div className="mx-3">
            {username.Posts && (
              <>
                {username.Posts.map((post: any, i: number) => (
                  <div key={i} className="d-flex justify-content-center  ">
                    <CardPost postInfo={post} author={username.username} avatar={username.avatar} />
                  </div>
                )).reverse()} 
                {username.Posts.length === 0 && (
                  <p className="text-dark my-4">sin publicaciones</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default userLayout;
