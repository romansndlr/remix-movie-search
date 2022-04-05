import { useSearchParams } from 'remix'

const activeLinkStyles = {
  color: 'var(--accent)',
  borderColor: 'var(--accent)',
}

export default function MoviesPagination({
  totalPages,
}: {
  totalPages: number
}) {
  const [params, setParams] = useSearchParams()

  if (totalPages < 2) return null

  return (
    <nav style={{ margin: '0 -8px' }}>
      {Array.from({ length: totalPages }, (v, i) => i + 1).map((page) => (
        // Doing this to get the styling, don't do it in a real app.
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          href="#"
          key={page}
          style={
            params.get('page') === page.toString()
              ? activeLinkStyles
              : undefined
          }
          onClick={(e) => {
            e.preventDefault()

            params.set('page', page.toString())

            setParams(params)
          }}
        >
          {page}
        </a>
      ))}
    </nav>
  )
}
