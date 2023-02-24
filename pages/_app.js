import {SessionProvider} from 'next-auth/react';
import '../styles/globals.css'
import styles from '/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Buttons from '../components/login-btn';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from "framer-motion"

import { Button, Text } from '@nextui-org/react';
import { style } from 'dom-helpers';
import {React, useEffect, useState} from 'react';

export default function App({Component, pageProps: {session, ...pageProps}}) {

  return (
      <>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" cross0rigin/>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Didact+Gothic&family=Inter:wght@200;300;400;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;1,100&family=Open+Sans:wght@300&family=Oswald:wght@200;300;400;500;600;700&family=Quicksand:wght@300;400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
        </Head>
        
    <main className={styles.main}>
      {/* title */}
      <div className={styles.titleforpage}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }} className={styles.titlewrapper}>
          <div style={{color:'white', fontFamily:'DM Mono', fontSize: 50,}}
          >Spotify DMs
          </div>
        </motion.button>
      </div>
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