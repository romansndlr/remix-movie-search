import { ActionFunction, json, redirect } from 'remix'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const searchTerm = formData.get('searchTerm') as string

  if (!searchTerm.match(/[A-Za-z ]/)) {
    throw json({ searchTerm }, 404)
  }

  return redirect(encodeURI(`/${searchTerm}/1`))
}

export default function Home() {
  return <h3>Search for any movie you like!</h3>
}
