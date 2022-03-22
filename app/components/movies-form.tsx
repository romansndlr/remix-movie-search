import { Form, useParams } from 'remix'

export default function MoviesForm() {
  const params = useParams()

  return (
    <Form method="post" action="/searchTerm/page">
      <input name="searchTerm" defaultValue={params?.searchTerm} />
      <button style={{ marginLeft: 8 }} type="submit">
        Search
      </button>
    </Form>
  )
}
