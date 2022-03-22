import axios from 'axios'
import {
  ActionFunction,
  HeadersFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useParams,
} from 'remix'
import MoviesPagination from '~/components/movies-pagination'
import MoviesTable from '~/components/movies-table'

interface Movie {
  Title: string
  Year: string
}

interface Movies {
  data: Movie[]
  page: number
  per_page: number
  total: number
  total_pages: number
}

export const loader: LoaderFunction = async ({ params }) => {
  const { data: movies } = await axios.get(
    `https://jsonmock.hackerrank.com/api/movies/search/?Title=${params?.searchTerm}&page=${params?.page}`
  )

  if (movies.data.length === 0) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return json(movies, {
    headers: {
      'Cache-Control': 'private, max-age=600000',
    },
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const { searchTerm } = Object.fromEntries(formData.entries())

  return redirect(`/${searchTerm}/1`)
}

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control') ?? '',
  }
}

export default function SearchTermIndex() {
  const movies = useLoaderData<Movies>()

  return (
    <>
      <MoviesPagination totalPages={movies.total_pages} />
      <MoviesTable movies={movies.data} />
    </>
  )
}

export function CatchBoundary() {
  const params = useParams()

  return <h2>We couldn't find movies for {params?.searchTerm}</h2>
}

export function ErrorBoundry() {
  return <h2>Something went wrong...</h2>
}
