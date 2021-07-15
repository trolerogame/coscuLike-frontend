/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getUser,getUserById } from "../../redux/reducers/UserDuck";
import Header from "../../components/header";
import UserLayout from "../../components/user/userLayout";
const User = ({ username, getUser,getUserById }: any) => {
  // if (!username) {
  //   document.location.href = "/";
  // }
  const router = useRouter();
  const { user } = router.query;
  useEffect(()=> {
    getUserById()
    getUser()
  },[ getUser,getUserById])
  return (
    <div>
      {username && (
        <>
          <Header />
          {/* muestra el layout si el usuario concuerca con el usuario logeado*/}
          {user === username.username && (
            <UserLayout
              username={username}
              propretier={true}
              asPath={router.asPath}
            />
          )}
        </>
      )}
    </div>
  );
};
function mapStateToProps(state: any) {
  return {
    username: state.User.user,
  };
}
export default connect(mapStateToProps, { getUser,getUserById })(User);
