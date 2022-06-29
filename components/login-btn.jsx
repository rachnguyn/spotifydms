import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import Signin from "../pages/auth/signin"

export default function Buttons() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <a href={`/api/auth/signin`} onClick={(e) => signIn()}>Sign in</a>
    </>
  )
}