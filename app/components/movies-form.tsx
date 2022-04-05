import React, { Ref } from 'react'
import { useRef } from 'react'
import { Form, useSearchParams } from 'remix'

export default function MoviesForm() {
  const [params] = useSearchParams()
  const inputRef = useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (inputRef.current && !params.has('term')) {
      inputRef.current.value = ''
    }
  }, [params])

  return (
    <Form>
      <input
        ref={inputRef as Ref<HTMLInputElement>}
        name="term"
        pattern="^[0-9a-zA-Z]+$"
      />
      <input name="page" hidden defaultValue={1} />
      <button style={{ marginLeft: 8 }} type="submit">
        Search
      </button>
    </Form>
  )
}
