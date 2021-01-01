import { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getMemo from "app/memos/queries/getMemo"
import updateMemo from "app/memos/mutations/updateMemo"
import MemoForm from "app/memos/components/MemoForm"
import MemoContainer from "../../../components/MemoContainer"

export const EditMemo = () => {
  const router = useRouter()
  const memoId = useParam("memoId", "number")
  const [memo, { setQueryData }] = useQuery(getMemo, { where: { id: memoId } })
  const [updateMemoMutation] = useMutation(updateMemo)
  const [title, setTitle] = useState<string>(memo.title)
  const [body, setBody] = useState<string>(memo.body)

  return (
    <div>
      <h1>Edit Memo {memo.id}</h1>
      <pre>
        title: {memo.title}
        <br />
        body: {memo.body}
      </pre>

      <MemoForm
        initialValues={{ title: title, body: body }}
        onSubmit={async () => {
          try {
            const updated = await updateMemoMutation({
              where: { id: memo.id },
              data: { title: title, body: body },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/memos/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing memo " + JSON.stringify(error, null, 2))
          }
        }}
        setTitle={setTitle}
        setBody={setBody}
      />
    </div>
  )
}

const EditMemoPage: BlitzPage = () => {
  return (
    <MemoContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMemo />
      </Suspense>

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </MemoContainer>
  )
}

EditMemoPage.getLayout = (page) => <Layout title={"Edit Memo"}>{page}</Layout>

export default EditMemoPage
