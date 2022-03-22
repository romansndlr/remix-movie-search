import axios from 'axios'
import { HeadersFunction, json, LoaderFunction, useLoaderData } from 'remix'
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
    throw json({ searchTerm: params?.searchTerm }, 404)
  }

  return json(movies, {
    headers: {
      'Cache-Control': 'private, max-age=600000',
    },
  })
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
