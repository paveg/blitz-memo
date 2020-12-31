import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createMemo from "app/memos/mutations/createMemo"
import MemoForm from "app/memos/components/MemoForm"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { useState } from "react"

const NewMemoPage: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [createMemoMutation] = useMutation(createMemo)
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  return (
    <div>
      <h1>Create New Memo</h1>

      <MemoForm
        initialValues={{ title: title, body: body }}
        onSubmit={async (event) => {
          if (currentUser) {
            try {
              const memo = await createMemoMutation({
                data: {
                  title: title,
                  body: body,
                  user: { connect: { id: currentUser.id } },
                },
              })
              alert("Success!" + JSON.stringify(memo))
              router.push(`/memos/${memo.id}`)
            } catch (error) {
              alert("Error creating memo " + JSON.stringify(error, null, 2))
            }
          }
        }}
        setTitle={setTitle}
        setBody={setBody}
      />

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </div>
  )
}

NewMemoPage.getLayout = (page) => <Layout title={"Create New Memo"}>{page}</Layout>

export default NewMemoPage
