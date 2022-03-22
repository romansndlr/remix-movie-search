import { NavLink, useParams } from 'remix'

const baseLinkStyles = {
  marginLeft: '8px',
}

const activeLinkStyles = {
  color: 'var(--accent)',
  borderColor: 'var(--accent)',
}

export default function MoviesPagination({
  totalPages,
}: {
  totalPages: number
}) {
  const params = useParams()

  if (totalPages < 2) return null

  return (
    <nav style={{ margin: '0 -8px' }}>
      {Array.from({ length: totalPages }, (v, i) => i + 1).map((page) => (
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { ...baseLinkStyles, ...activeLinkStyles }
              : baseLinkStyles
          }
          key={page}
          to={`/${params?.searchTerm}/${page}`}
          prefetch="intent"
        >
          {page}
        </NavLink>
      ))}
    </nav>
  )
}
