import "../styles/globals.css";
import { StoreProvider } from "../utils/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Toaster />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
