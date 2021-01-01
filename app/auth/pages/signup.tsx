import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import LoginContainer from "../components/LoginContainer"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <LoginContainer>
      <h1 className="text-center text-4xl mt-8 mb-16">Memo Application</h1>
      <SignupForm onSuccess={() => router.push("/")} />
    </LoginContainer>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
