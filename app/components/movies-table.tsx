interface Movie {
  Title: string
  Year: string
}

export default function MoviesTable({ movies }: { movies: Array<Movie> }) {
  return (
    <table>
      <thead>
        <tr>
          <th>MOVIE NAME</th>
          <th>YEAR</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, i) => (
          <tr key={i}>
            <td>{movie.Title}</td>
            <td>{movie.Year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
