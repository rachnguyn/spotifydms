import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import Image from 'next/image'
import Header from '../../components/header'
import styles from '../../styles/Signin.module.css'
import { Button, Text } from '@nextui-org/react';
import { motion } from "framer-motion"
import styles2 from '../../styles/Home.module.css'

const Signin = ({ csrfToken, providers }) => {
  return (
    <main>
      {/* title
      <div className={styles2.titleforpage} style={{position: 'relative', top: 32, left: 0}}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }} className={styles2.titlewrapper}>
          <Text
            h1
            size={50}
            css={{
              textGradient: "25deg, #28f75c 0%, #ffd000 90%",
            }}
            weight="bold"
          >Spotify DMs
          </Text>
        </motion.button>
      </div> */}

    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={styles.content} style={{position: 'relative', top: -30}}>
        <div className={styles.cardWrapper}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={styles2.buttons}>
          <Image src='/spotify.png' width="196px" height="196px" alt='App Logo' style={{ height: '85px', marginBottom: '20px' }}/>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={styles2.buttons}>
          <div className={styles.cardContent}>
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button style={{
                    backgroundColor:'transparent',
                    color: 'white',
                    border: 'none',
                    fontFamily:'DM Mono',
                    fontSize: 20
                    }} onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/`,
                      })
                    } >
                    Sign in with{' '} {provider.name}
                  </button>
                </div>
              ))}
          </div></motion.button>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
    </div>
    </main>
  )
}

export default Signin

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}