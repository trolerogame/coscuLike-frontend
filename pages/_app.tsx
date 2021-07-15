import React, { FC } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { wrapper } from "../redux/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

//? con esto podemos conectar redux con next
export default wrapper.withRedux(MyApp);
