/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Header from "../components/header";
import { connect } from "react-redux";
import { GetPost } from "../redux/reducers/PostDuck";
import { getUser } from "../redux/reducers/UserDuck";
import Head from "../components/head";
import CardPost from "../components/home/CardPost";
let i =0;
const index = ({ post, GetPost, getUser }: any) => {
  useEffect(() => {
    //? llama a getPost y getUser solo una ves en vez de estar constantemente llamandolas
    if(!i){
      GetPost();
      getUser();
      i++;
    }
  }, [GetPost, getUser, post]);
  return (
    <Head title="Home">
      <Header />
      <main className="container d-flex flex-column align-items-center my-5">
        {post
          .map((postInfo: any) => (
            <div key={postInfo._id} >
              {postInfo.author && <CardPost postInfo={postInfo} author={postInfo.author.username} avatar={postInfo.author.avatar} key={i} />}
            </div>
          ))
          .reverse()
        }
      </main>
    </Head>
  );
};
function mapStateToProps(state: any) {
  return {
    post: state.Post.Posts,
  };
}
export default connect(mapStateToProps, { GetPost, getUser })(index);
