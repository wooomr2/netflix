import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
