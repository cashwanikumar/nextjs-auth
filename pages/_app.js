import { AuthProvider } from "../client";
import { getToken } from "../lib/utils";

function MyApp(props) {
  const { Component, pageProps, token } = props;
  console.log("----here---");
  return (
    <AuthProvider token={token}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  return { token: getToken(context) };
};

export default MyApp;
