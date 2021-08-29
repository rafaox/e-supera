import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

import { CartProvider } from '../hooks/useCart';
import Header from '../components/Header';

import GlobalStyle from '../styles/global';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </CartProvider>
  );
}

export default MyApp;
