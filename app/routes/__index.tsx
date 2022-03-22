import { Outlet, useCatch } from 'remix'

export default function Layout() {
  return <Outlet />
}

export function CatchBoundary() {
  const { data } = useCatch()

  return <h3>We couldn't find movies for {data?.searchTerm}</h3>
}
