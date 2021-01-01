import * as React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import LoginContainer from "../components/LoginContainer"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <LoginContainer>
      <h1 className="text-center text-4xl mt-8 mb-16">Memo Application</h1>
      <LoginForm onSuccess={() => router.push("/memos")} />
    </LoginContainer>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
