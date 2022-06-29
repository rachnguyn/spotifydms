import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import Image from 'next/image'
import Header from '../../components/header'
import styles from '../../styles/Signin.module.css'
import { Button, Text } from '@nextui-org/react';

const Signin = ({ csrfToken, providers }) => {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <Image src='/spotify.png' width="196px" height="196px" alt='App Logo' style={{ height: '85px', marginBottom: '20px' }} />
          <div className={styles.cardContent}>
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button style={{
                    backgroundColor:'transparent',
                    color: 'white',
                    border: 'none',
                    fontSize: 27
                    }} onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/`,
                      })
                    } >
                    Sign in with{' '} {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
    </div>
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