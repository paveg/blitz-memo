import * as React from "react"
import { Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create new account</h2>
      <div className="text-center mt-1 text-gray-500">
        <span>Let's add your idea!</span>
      </div>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
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
          <Link href="/login">Log in to your account</Link>
        </u>
      </div>
    </div>
  )
}

export default SignupForm
