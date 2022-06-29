import {SessionProvider} from 'next-auth/react';
import '../styles/globals.css'
import styles from '/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Buttons from '../components/login-btn';
import Head from 'next/head';
import Link from 'next/link';

import { Button, Text } from '@nextui-org/react';
import { style } from 'dom-helpers';
import {React, useEffect, useState} from 'react';

export default function App({Component, pageProps: {session, ...pageProps}}) {

  return (
      <>
    <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400&display=swap" rel="stylesheet"></link>
        </Head>
        
    <main className={styles.main}>
    <div 
    className={styles.titleforpage}>
          <Text
            h1
            size={50}
            css={{
              textGradient: "45deg, $green600 10%, $yellow600 100%",
            }}
            weight="bold"
          >Spotify DMs
          </Text></div>
        {/* <div className={styles.title}>Check your Spotify DMs</div> */}
    <SessionProvider session={session} >

        <div className={styles.appjs}
        >
      {<Component {...pageProps}></Component>}</div>
    </SessionProvider>
    </main>
    </>
  );
}