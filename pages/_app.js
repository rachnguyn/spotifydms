import {SessionProvider} from 'next-auth/react';
import '../styles/globals.css'
import styles from '/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Buttons from '../components/login-btn';

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <main className={styles.main}>
    <SessionProvider session={session} >
      {<Component {...pageProps} />}
    </SessionProvider>
    </main>
  );
}