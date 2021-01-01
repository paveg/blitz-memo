import * as React from "react"

type initialValues = {
  title: string
  body: string
}

type MemoFormProps = {
  initialValues: initialValues
  onSubmit: React.FormEventHandler<HTMLFormElement>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setBody: React.Dispatch<React.SetStateAction<string>>
}

const MemoForm = ({ initialValues, onSubmit, setTitle, setBody }: MemoFormProps) => {
  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeBody = (event) => {
    setBody(event.target.value)
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <input
        name="title"
        type="text"
        placeholder="タイトル"
        defaultValue={initialValues.title}
        onChange={onChangeTitle}
      />
      <br />
      <input
        name="body"
        type="text"
        placeholder="本文"
        defaultValue={initialValues.body}
        onChange={onChangeBody}
      />
      <br />

      <button>Submit</button>
    </form>
  )
}

export default MemoForm
