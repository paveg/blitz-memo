import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"
import LoginContainer from "./LoginContainer"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-gray-900">
        Log in to your account
      </h2>

      <Form
        submitText="Login"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <div className="flex justify-evenly">
          <LabeledTextField name="email" label="" placeholder="Email" />
          <LabeledTextField name="password" label="" placeholder="Password" type="password" />
        </div>
      </Form>
      <div className="text-center mt-2 text-gray-500 items-center">
        Or{" "}
        <u>
          <Link href="/signup">Create New Account</Link>
        </u>
      </div>
    </div>
  )
}

export default LoginForm
