import axios from 'axios'
import type { HeadersFunction, LoaderFunction } from 'remix'
import { json, useCatch, useLoaderData } from 'remix'
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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)

  const term = url.searchParams.get('term') || ''

  const page = url.searchParams.get('page') || 1

  if (!term) {
    return json([])
  }

  const { data: movies } = await axios.get(
    `https://jsonmock.hackerrank.com/api/movies/search/?Title=${term}&page=${page}`
  )

  if (movies.data.length === 0) {
    throw json({ term }, 404)
  }

  return json(movies, {
    headers: {
      'Cache-Control': 'public, max-age=600000',
    },
  })
}

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control') ?? '',
  }
}

export default function Home() {
  const movies = useLoaderData<Movies>()

  return movies.data ? (
    <>
      <MoviesTable movies={movies.data} />
      <MoviesPagination totalPages={movies.total_pages} />
    </>
  ) : (
    <h3>Search for any movie you like!</h3>
  )
}

export function CatchBoundary() {
  const { data } = useCatch()

  return <h3>We couldn't find movies for {data?.term}</h3>
}
